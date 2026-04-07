<?php

namespace App\Http\Controllers;

use App\Models\Mix;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\VerificationRequiredNotification;

class MixController extends Controller
{
    // Update Notif Type Verification After Each Uploaded Mix
    public function updateVerificationNotification($user)
    {
        $mixCount = $user->mixes()->count();

        if ($mixCount > 2) {
            $user->notifications()
                ->where('type', VerificationRequiredNotification::class)
                ->delete();
            return;
        }

        $remaining = 2 - $mixCount;

        $data = [

            "type" => "verification_required",

            "title" => "Account verification required",

            "message" =>
            "$remaining more track required to activate your DJ account",

            "tracks_uploaded" => $mixCount,

            "tracks_required" => 2,

            "link" => "/upload"
        ];


        $existingNotification =
            $user->notifications()
            ->where(
                'type',
                VerificationRequiredNotification::class
            )
            ->first();

        if ($existingNotification) {

            $existingNotification->update([
                "data" => $data
            ]);
        } else {

            $user->notify(
                new VerificationRequiredNotification($data)
            );
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Mix::class);
        $collectionMixes = Mix::with('user')->latest()->get();
        return response()->json([
            'mixes_with_users' => $collectionMixes
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Mix::class);  //Authorize the user to create Mixes should be a dj

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'audio_file' => 'required|mimes:mp3,wav|max:102400',
            'bpm' => 'required|integer|min:40|max:250',
            'genre' => 'required|string|max:100',
            'cover_image' => 'image|mimes:jpg,png,jpeg|max:2048',
        ]);
        $pathAudioFile = $request->file('audio_file')->store('mixes', 'public');
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('covers', 'public');
        } else {
            $coverPath = 'covers/default_cover.png';
        }
        $mix = Mix::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'audio_file' => $pathAudioFile,
            'cover_image' => $coverPath,
            'genre' => $request->genre,
            'bpm' => $request->bpm
        ]);
        $this->updateVerificationNotification(Auth::user());
        return response()->json($mix);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // get  => api/mix/2
        return Mix::with(['user', 'comments'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mix = Mix::findOrFail($id);
        $this->authorize('update', $mix);
        $mixUpdated = $mix->update($request->only([
            'title',
            'description',
            'audio_file',
            'cover_image',
            'genre',
            'bpm',
        ]));

        return response()->json([
            'MixUpdated' => $mixUpdated
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mix = Mix::findOrFail($id);
        $this->authorize('delete', $mix);
        $mix->delete();
        return response()->json(['message' => 'mix deleted successfuly']);
    }

    public function incrementPlays($id)
    {
        $mix = Mix::findOrFail($id);
        $mix->increment('view_count');
        return response()->json([
            'plays' => $mix->view_count
        ]);
    }

    public  function getGenres()
    {
        return  response()->json([
            'genres' => Mix::genres()
        ]);
    }
}
