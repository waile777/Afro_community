<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MixController;
use App\Http\Controllers\MixLikesController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistMixController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;



Route::post('/login', [AuthController::class, 'loginUser']);
Route::post('/register', [AuthController::class, 'registerUser']);


// ROUTES NOT SECURE :
Route::get('discover', [MixController::class, 'index']);
Route::get('mix/{id}', [MixController::class, 'show']);

// GROUP ROUTES PROTECTED BY MIDDLEWARE :    

Route::middleware('auth:sanctum')->group(function () {


    // profile Route hahaha Auth Success
    Route::get('profile', function (Request $request) {
        return response()->json(['success', Auth::user()]);
    });


    // Mixes
    Route::post('mix/upload', [MixController::class, 'store']);
    Route::patch('mix/{id}/play', [MixController::class, 'incrementPlays']);
    Route::patch('mix/{id}/update', [MixController::class, 'update']);
    Route::delete('mix/{id}', [MixController::class, 'destroy']);

    // Likes
    Route::post('mix/{id}/like', [MixLikesController::class, 'addLike']);
    Route::delete('mix/{id}/like', [MixLikesController::class, 'removeLike']);

    // comments
    Route::get('mix/{id}/comments', [CommentController::class, 'index']);
    Route::post('mix/{id}/comment', [CommentController::class, 'store']);
    Route::get('mix/comment/{id}', [CommentController::class, 'show']);
    Route::patch('mix/comment/{id}', [CommentController::class, 'update']);
    Route::delete('mix/comment/{id}', [CommentController::class, 'destroy']);

    // Followers
    Route::get('Followers' , [FollowController::class , 'index']);
    Route::post('Dj/{id}/follow' , [FollowController::class , 'store']);
    Route::get('Dj/{id}/is_following' , [FollowController::class , 'show']);
    Route::delete('Dj/{id}/unfollow' , [FollowController::class , 'destroy']);
    Route::get('profile/stats' , [FollowController::class , 'stats']);


    // Playlists
    Route::get('your_playlists' , [PlaylistController::class , 'index']);
    Route::post('playlist/create' , [PlaylistController::class , 'store']);
    Route::patch('your_playlists/playlist/{id}' , [PlaylistController::class , 'update']);
    Route::delete('your_playlists/playlist/{id}' , [PlaylistController::class , 'destroy']);
    
    
    // PlaylistMix
    Route::get('your_playlists/playlist/{id}/mixes' , [PlaylistMixController::class , 'index']);
    Route::post('your_playlists/playlist/{playlist}/mix/{mix}/added' , [PlaylistMixController::class , 'store']);
    Route::delete('your_playlists/playlist/{playlist}/mix/{mix}' , [PlaylistMixController::class , 'destroy']);



    });
    