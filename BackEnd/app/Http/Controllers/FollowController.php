<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role != 'dj') {
            return response()->json([
                'followers' => []
            ]);
        }
        $yourFollowers = Follow::with('follower')->where('following_id', Auth::id())->get();
        return response()->json([
            'followers' => $yourFollowers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($id)
    {
        $following = User::findOrFail($id);
        $follower_id = Auth::id();
        if ($follower_id == $following->id) {
            return response()->json([
                'error' => 'cannot follow yourself'
            ]);
        }
        if ($following->role !== 'dj') {
            return response()->json([
                'error' => 'you can only follow dj'
            ], 403);
        }
        $follow = Follow::firstOrCreate([
            'follower_id' => $follower_id,
            'following_id' => $following->id
        ]);
        return response()->json([
            'follow' => $follow
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        if ($user->role !== 'dj') {
            return response()->json([
                'error' => 'user must be dj'
            ], 403);
        }
        $is_following = Follow::where('follower_id', Auth::id())->where('following_id', $user->id)->exists();
        return response()->json([
            'is_following' => $is_following
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $follower_id = Auth::id();
        $following_id = $user->id;
        $follow_removed = Follow::where('follower_id', $follower_id)->where('following_id', $following_id)->firstOrFail();
        $follow_removed->delete();
        return response()->json([
            'follower_removed' => $follow_removed
        ]);
    }


    public function stats()
    {
        return response()->json([
            'followers_count' => Follow::where('following_id', Auth::id())->count(),
            'following_count' => Follow::where('follower_id', Auth::id())->count(),
        ]);
    }
}
