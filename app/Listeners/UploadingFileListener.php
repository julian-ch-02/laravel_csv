<?php

namespace App\Listeners;

use App\Events\FileUploadedEvent;
use App\Jobs\ProcessingUploadedFile;
use Illuminate\Contracts\Queue\ShouldQueue;

class UploadingFileListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FileUploadedEvent $event): void
    {
      ProcessingUploadedFile::dispatch($event->file);
    }
}
