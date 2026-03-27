<?php

namespace App\Http\Controllers;

use App\Models\DjProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class djProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', DjProfile::class);

        $profilesInfos = User::with('djProfile')->get();
        return response()->json([
            'profile_infos' => $profilesInfos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', DjProfile::class);
        $request->validate([
            'stage_name' => 'required|string|max:100',
            'bio' => 'nullable|string|max:1000',
        ]);
        $djProfile = DjProfile::create([
            'user_id' => Auth::id(),
            'stage_name' => $request->stage_name,
            'bio' => $request->bio
        ]);
        return response()->json([
            'dj_profile' => $djProfile 
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', DjProfile::class);
        $profileInfos = User::with('djProfile')->findOrFail($id);
        return response()->json([
            'profile_info' => $profileInfos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->authorize('update' , DjProfile::class);
        $djProfile = DjProfile::findOrFail($id);
        $djProfile->update($request->only([
            'stage_name' => $request->stage_name,
            'bio' => $request->bio
        ]));
        return response()->json([
            'profile state' => 'profile updated successfuly'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete' , DjProfile::class);
        $djProfile = DjProfile::findOrFail($id);
        $djProfile->delete();
        return response()->json([
            'profile state' => 'profile deleted successfuly'
        ]);
    }
}
