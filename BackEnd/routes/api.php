<?php

use App\Http\Controllers\ReservetionController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MixController;
use App\Http\Controllers\MixLikesController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistMixController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\EventController;


Route::post('/login', [UserController::class, 'loginUser']);
Route::post('/register', [UserController::class, 'store']);


// ROUTES NOT SECURE :
Route::get('discover', [MixController::class, 'index']);
Route::get('mix/{id}', [MixController::class, 'show']);
Route::get('users', [UserController::class, 'index']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
// GROUP ROUTES PROTECTED BY MIDDLEWARE :    

Route::middleware('auth:sanctum')->group(function () {

    // Admin Panel
    Route::delete('users/{id}', [UserController::class, 'destroy']);


    // User profile
    Route::get('profile', function (Request $request) {
        return response()->json(['success', $request->user()]);
    });
    Route::patch('profile', [UserController::class, 'update']);

    // Mixes
    Route::post('mix/upload', [MixController::class, 'store']);
    Route::patch('mix/{id}/play', [MixController::class, 'incrementPlays']);
    Route::patch('mix/{id}', [MixController::class, 'update']);
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
    Route::get('Followers', [FollowController::class, 'index']);
    Route::post('Dj/{id}/follow', [FollowController::class, 'store']);
    Route::get('Dj/{id}/is_following', [FollowController::class, 'show']);
    Route::delete('Dj/{id}/unfollow', [FollowController::class, 'destroy']);
    Route::get('profile/stats', [FollowController::class, 'stats']);


    // Playlists
    Route::get('your_playlists', [PlaylistController::class, 'index']);
    Route::post('playlist/create', [PlaylistController::class, 'store']);
    Route::patch('your_playlists/playlist/{id}', [PlaylistController::class, 'update']);
    Route::delete('your_playlists/playlist/{id}', [PlaylistController::class, 'destroy']);


    // PlaylistMix
    Route::get('your_playlists/playlist/{id}/mixes', [PlaylistMixController::class, 'index']);
    Route::post('your_playlists/playlist/{playlist}/mix/{mix}/added', [PlaylistMixController::class, 'store']);
    Route::delete('your_playlists/playlist/{playlist}/mix/{mix}', [PlaylistMixController::class, 'destroy']);


    // Events
    Route::post('/events', [EventController::class, 'store']);
    Route::patch('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);


    //tickets
    Route::post('/events/{event}/tickets' , [TicketController::class , 'store']);
    Route::delete('/tickets/{id}' , [TicketController::class , 'destroy']);
    Route::patch('/tickets/{id}' , [TicketController::class , 'update']);

    //Reservation
    Route::post('/reservation/{ticketid}' , [ReservetionController::class , 'store']);
    Route::get('/reservations' , [ReservetionController::class , 'index']);
    Route::delete('/reservations/{id}' , [ReservetionController::class , 'destroy']);





});
