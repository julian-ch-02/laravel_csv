<?php

namespace App\Services;

use App\Events\FileUploadedEvent;
use App\Http\Requests\DashboardAddRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\File;

class DashboardService
{
    /**
     * @return Collection
     */
    public function getAll() {
        return File::with(["file_history"])->orderBy('created_at', "DESC")->get();
    }

  public function save(DashboardAddRequest $request)
  {
    try {
      DB::beginTransaction();
      $file = new File([
        "name" => $request->file("files")->getClientOriginalName(),
        "user_id" => Auth::id()
      ]);

      $file->save();

      Storage::putFileAs("file", $request->file("files"), $request->file("files")->getClientOriginalName());

      event(new FileUploadedEvent($file, Auth::user()));

      DB::commit();
      return $file;
    } catch (\Throwable $th) {
      DB::rollBack();
      throw $th;
    }
  }
}
