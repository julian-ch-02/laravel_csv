<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use App\Events\NotifyProgressUploadEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    const PENDING = "PENDING";
    const PROCESSING = "PROCESSING";
    const DONE = "DONE";
    const FAILED = "FAILED";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'status',
        'user_id'
    ];

    /**
     * Get the history that owned by the file
     */
    public function file_history(): HasMany
    {
        return $this->hasMany(FileHistory::class);
    }

    /**
     * Get the user that own the file
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Bootstrap the model and its traits.
     *
     * @return void
     */
    protected static function boot(): void
    {
        parent::boot();

        static::updated(function ($model) {
            event(new NotifyProgressUploadEvent($model->status, $model->id, $model->user));
        });
    }
}
