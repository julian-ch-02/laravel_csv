<?php

namespace App\Jobs;

use App\Models\File;
use App\Models\FileHistory;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Psr\Log\LoggerInterface;

class ProcessingUploadedFile implements ShouldQueue
{
    public $timeout = 3600;

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public File $file;

    /**
     * @var LoggerInterface
     */
    protected $logger;


    /**
     * Create a new job instance.
     */
    public function __construct($file)
    {
        $this->file = $file;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->logger = Log::channel("product");
        $this->logger->info("Execute Insert Product");

        $this->file->status = File::PROCESSING;
        $this->file->save();
        $this->file->file_history()->create([
            "status" => FileHistory::BEGIN_PROCESSING
        ]);


        $this->file->file_history()->create([
            "status" => FileHistory::CALCULATING_FILE
        ]);

        $file_path = Storage::disk("public")->path("file/" . $this->file->name);

        try {
            $csv = fopen($file_path, 'r');

            $this->file->file_history()->create([
                "status" => FileHistory::IMPORTING_FILE
            ]);
            $i = 0;

            while (($data = fgetcsv($csv, 0, ",")) !== false) {
                $utf8Data = mb_convert_encoding($data, 'UTF-8', 'UTF-8');
                $this->logger->info("Insert Product - " . $utf8Data[0] . "| Increment : " . $i);
                if ($i == 0) {
                    $i++;
                    continue;
                } else {
                    try {
                        DB::beginTransaction();
                        $product = Product::where('UNIQUE_KEY', $utf8Data[0])->lockForUpdate()->first();

                        if (!$product) {
                            Product::create([
                                "UNIQUE_KEY" => $utf8Data[0],
                                "PRODUCT_TITLE" => $utf8Data[1],
                                "PRODUCT_DESCRIPTION" => $utf8Data[2],
                                "STYLE" => $utf8Data[3],
                                "SANMAR_MAINFRAME_COLOR" => $utf8Data[28],
                                "SIZE" => $utf8Data[17],
                                "COLOR_NAME" => $utf8Data[13],
                                "PIECE_PRICE" => $utf8Data[21],
                            ]);
                        } else {
                            $product->update([
                                "PRODUCT_TITLE" => $utf8Data[1],
                                "PRODUCT_DESCRIPTION" => $utf8Data[2],
                                "STYLE" => $utf8Data[3],
                                "SANMAR_MAINFRAME_COLOR" => $utf8Data[28],
                                "SIZE" => $utf8Data[17],
                                "COLOR_NAME" => $utf8Data[13],
                                "PIECE_PRICE" => $utf8Data[21],
                            ]);
                        }
                        DB::commit();
                        $this->logger->info("Success Product - " . $utf8Data[0] . "| Increment : " . $i);
                    } catch (\Throwable $th) {
                        DB::rollBack();
                        $this->logger->info("Failed Product - " . $utf8Data[0] . "| Increment : " . $i);
                    }
                }
                $i++;
            }

            $this->file->status = File::DONE;
            $this->file->save();
            $this->file->file_history()->create([
                "status" => FileHistory::SAVE_DATA
            ]);
            fclose($csv);
            $this->logger->info("Success Import File");
        } catch (\Throwable $th) {
            $this->file->status = File::FAILED;
            $this->file->save();
            $this->file->file_history()->create([
                "status" => FileHistory::FAILED
            ]);
        }
    }
}
