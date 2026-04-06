<?php

namespace App\Http\Controllers;

use App\Models\Mix;
use App\Models\RecentlyPlayed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class RecentlyPlayedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function store(Request $request)
    {
        RecentlyPlayed::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'mix_id' => $request->mix_id
            ],
            [
                'played_at' => now()
            ]
        );

        return response()->json(['message' => 'saved']);
    }

    // get recently played
    public function index()
    {
        // Get recently played mixes for the authenticated user
        $recentlyPlayed = RecentlyPlayed::with('mix.user.djProfile')
            ->where('user_id', Auth::id())
            ->latest('played_at')
            ->take(10)
            ->get();

        // Extract the mixes
        $mixes = $recentlyPlayed->map(fn($rp) => $rp->mix);

        // // If no recently played mixes, fallback to pending mixes
        // if ($mixes->isEmpty()) {
        //     $mixes = Mix::with(['user.djProfile'])
        //         ->where('status', 'pending')
        //         ->latest()
        //         ->take(10)
        //         ->get();
        // }

        return response()->json($mixes);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
