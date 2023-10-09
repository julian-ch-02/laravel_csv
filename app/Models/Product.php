<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
      "UNIQUE_KEY",
      "PRODUCT_TITLE",
      "PRODUCT_DESCRIPTION",
      "STYLE",
      "SANMAR_MAINFRAME_COLOR",
      "SIZE",
      "COLOR_NAME",
      "PIECE_PRICE",
    ];
}
