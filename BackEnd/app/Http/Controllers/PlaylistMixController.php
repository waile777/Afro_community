<?php

namespace App\Http\Controllers;

use App\Models\Mix;
use App\Models\Playlist;
use App\Models\PlaylistMix;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaylistMixController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Playlist $playlist)
    {
        $playlist->load('mixes');
        return response()->json([
            'playlist' => $playlist
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Playlist $playlist, Mix $mix)
    {
        if ($playlist->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        PlaylistMix::firstOrCreate([
            'playlist_id' => $playlist->id,
            'mix_id' => $mix->id
        ]);

        return response()->json(['success' => 'mix added to playlist']);
    }

    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Playlist $playlist, Mix $mix)
    {
        $playlistMix = PlaylistMix::where('playlist_id', $playlist->id)
            ->where('mix_id', $mix->id)
            ->firstOrFail();

        $playlistMix->delete();

        return response()->json([
            'message' => 'Mix removed from playlist'
        ]);
    }
}
