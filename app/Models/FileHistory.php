<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class FileHistory extends Model
{
    use HasFactory;

    const BEGIN_PROCESSING = "BEGIN_PROCESSING";
    const IMPORTING_FILE = "IMPORTING_FILE";
    const CALCULATING_FILE = "CALCULATING_FILE";
    const SAVE_DATA = "SAVE_DATA";
    const FAILED = "FAILED";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'file_id',
        'status',
    ];

    /**
     * Get the file that owned by the history
     */
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
