<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:55',
            'email' => 'string|email|unique:users,email',
            'password' => 'string|min:6',
            'status' => '',
            'attendee' => ''

        ];
    }
}
