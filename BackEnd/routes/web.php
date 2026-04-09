<?php

use Illuminate\Support\Facades\Route;

Route::get('/mix-audio/{file}', function ($file) {

    $path = storage_path('app/public/mixes/' . $file);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Access-Control-Allow-Origin' => '*'
    ]);
});

Route::get('/cover-image/{file}', function ($file) {

    $path = storage_path('app/public/covers/' . $file);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET',
        'Access-Control-Allow-Headers' => '*'
    ]);
});
