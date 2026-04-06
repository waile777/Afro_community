<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
                'first_name' => 'required|string|min:2|max:255',
                'last_name' => 'required|string|min:2|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'profile_picture' => 'image|mimes:jpg,png,jpeg,gif,svg',
                'stage_name' => 'required_if:is_dj,1|unique:dj_profiles,stage_name|max:30|min:2|regex:/^[a-zA-Z0-9_-]+$/', // letters, numbers, underscore, dash only
                'bio' => 'nullable|string|min:10|max:200',
                
            ]
        ;
    }

    public function messages(): array
{
    return [
        'email.unique' => 'This email is already in use',
        'stage_name.unique' => 'This stage name is already taken by another DJ',
    ];
}
}
