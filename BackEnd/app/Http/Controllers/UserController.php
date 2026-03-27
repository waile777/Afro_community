<?php

namespace App\Http\Controllers;

use App\Models\DjProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny' , User::class);
        $users = User::with('djProfile')->get();
        return response()->json([
            'all_users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'profile_picture' => [
                'image',
                'mimes:jpg,png,jpeg,gif,svg',
            ],
            'stage_name' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:1000',
        ]);
        $roleUser = $request->has('is_dj') ? User::ROLE_DJ : User::ROLE_LISTENER;
        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public'); //profile_pictures/profile_picture.png
        } else {
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
        $response = [
            'user' => $user,
            'token' => $token
        ];
        if ($roleUser === 'dj') {
            $djProfile = DjProfile::create([
                'user_id' => $user->id,
                'stage_name' =>  $request->stage_name,
                'bio' => $request->bio,
            ]);
            $response['djProfile'] = $djProfile;
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $this->authorize('update', $user);

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'stage_name' => 'nullable|string|max:100',
            'profile_picture' => [
                'image',
                'mimes:jpg,png,jpeg,gif,svg',
            ]
        ]);

        $path = $user->profile_picture;

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'profile_picture' => $path
        ]);
        $response = [
            'user' => $user
        ];
        if ($user->djProfile) {
            $djProfile = $user->djProfile->update([
                'stage_name' => $request->stage_name ?? $user->djProfile->stage_name,
                'bio' => $request->bio ?? $user->djProfile->bio,
            ]);
            $response['djProfile'] = $djProfile;
        }

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $this->authorize('delete', $user);
        $user->delete();
        return response()->json([
            'message' => 'user deleted',
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
    public function logOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'logged out successfuly'
        ]);
    }
    public function logOutAll(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'logged out from all devices successfuly'
        ]);
    }
}



