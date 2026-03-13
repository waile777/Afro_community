<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $playlists = Playlist::where('user_id', Auth::id());
        return response()->json([
            'playlists' => $playlists
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100'
        ]);
        $playlist = Playlist::create([
            'user_id' => Auth::id(),
            'name' => $request->name
        ]);
        return response()->json([
            'playlist_created' => $playlist
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Playlist $playlist)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Playlist $playlist)
    {
        if (Auth::id() !== $playlist->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $playlistUpdated = $playlist->update($request->only(['name']));
        return response()->json([
            'playlist_updated' => $playlistUpdated
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Playlist $playlist)
    {
        if ($playlist->user_id != Auth::id() && Auth::user()->role != 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $playlist->delete();
        return response()->json([
            'message' => 'playlist deleted successfuly',
            'playlist' => $playlist
        ]);
    }
}
