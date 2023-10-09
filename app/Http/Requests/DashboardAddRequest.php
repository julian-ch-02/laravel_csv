<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DashboardAddRequest extends FormRequest
{
    public function rules(): array
    {
        if($this->isMethod("get")) return [];
        return [
          'files' => 'required|mimes:csv,txt',
        ];
    }
}
