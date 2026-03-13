<?php

namespace App\Http\Controllers;

use App\Models\Mix;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MixController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
        if (Auth::user()->role !== 'dj'){
            return response()->json([
                'error' => 'only Djs can upload mix'
            ],404);
        }
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'audio_file' => 'required|mimes:mp3,wav|max:102400',
            'bpm' => 'required',
            'genre' => 'required|string',
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
        return response()->json($mix);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mix $mix)
    {
        // get  => api/mix/2
        return Mix::with(['user', 'comments'])->findOrFail($mix->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mix $mix)
    {
        if ($mix->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
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
    public function destroy(Mix $mix)
    {
        if ($mix->user_id != Auth::id() || Auth::user()->role != 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
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
}
