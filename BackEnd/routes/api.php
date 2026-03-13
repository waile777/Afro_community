<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MixController;
use App\Http\Controllers\PlaylistController;
use App\Models\MixLike;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;



Route::post('/login', [AuthController::class, 'loginUser']);
Route::post('/register', [AuthController::class, 'registerUser']);






// GROUP MIDDLEWARE:    

Route::middleware('auth:sanctum')->group(function () {


    // profile Route hahaha Auth Success
    Route::get('profile', function (Request $request) {
        return response()->json(['success', Auth::user()]);
    });


    // Mixes
    Route::get('discover', [MixController::class, 'index']);
    Route::post('mix/upload', [MixController::class, 'store']);
    Route::get('mix/{id}', [MixController::class, 'show']);
    Route::patch('mix/{id}/play', [MixController::class, 'play']);
    Route::put('mix/{id}/update', [MixController::class, 'update']);
    Route::delete('mix/{id}', [MixController::class, 'destroy']);

    // Likes
    Route::post('mix/{id}/like', [MixLike::class, 'addLike']);
    Route::delete('mix/{id}/like', [MixLike::class, 'removeLike']);

    // comments
    Route::get('mix/{id}/comments', [CommentController::class, 'index']);
    Route::post('mix/{id}/comment', [CommentController::class, 'store']);
    Route::get('mix/{mix}/comment/{comment}', [CommentController::class, 'show']);
    Route::patch('mix/{mix}/comment/{comment}', [CommentController::class, 'update']);
    Route::delete('mix/{mix}/comment/{comment}', [CommentController::class, 'destroy']);

    // Followers
    Route::get('followers' , [FollowController::class , 'index']);
    Route::get('users/{user}/is_following' , [FollowController::class , 'show']);
    Route::delete('users/{user}/unfollow' , [FollowController::class , 'destory']);
    Route::post('users/{user}/follow' , [FollowController::class , 'store']);


    // Playlists
    Route::get('your_playlists' , [PlaylistController::class , 'index']);
    Route::patch('your_playlists/playlist/{id}' , [PlaylistController::class , 'update']);
    Route::delete('your_playlists/playlist/{id}' , [PlaylistController::class , 'destory']);
    Route::post('playlist/create' , [PlaylistController::class , 'store']);
    
    
    // PlaylistMix
    Route::get('your_playlists/playlist/{playlist}/mixes' , [PlaylistController::class , 'index']);
    Route::post('your_playlists/playlist/{playlist}/mix/{mix}/added' , [PlaylistController::class , 'store']);
    Route::delete('your_playlists/playlist/{playlist}/mix/{mix}' , [PlaylistController::class , 'destroy']);



    });
    