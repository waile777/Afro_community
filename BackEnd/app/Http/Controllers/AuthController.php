<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{




    public function registerUser(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'profile_picture' => [
                'image',
                'mimes:jpg,png,jpeg,gif,svg',
            ]
        ]);
        $roleUser = $request->has('role') ? User::ROLE_DJ : User::ROLE_LISTENER;
        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public'); //profile_pictures/profile_picture.png
        }else {
            $path = 'profile_pictures/default_profile.png';
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => HASH::make($request->password),
            'role' => $roleUser,
            'profile_picture' => $path
        ]);

        $token = $user->createToken('AUTH_TOKEN')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function loginUser(Request $request)
    {
        if (!Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            return response()->json(['error' => 'invalide cridentials'], 401);
        }
        $user = User::where('email', $request->email)->first(); // {'id' : 1 , email : $request->email...} | null 
        $token = $user->createToken('AUTH_TOKEN')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }
}
