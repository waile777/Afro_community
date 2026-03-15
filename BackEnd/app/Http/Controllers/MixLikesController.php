<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Mix;
use App\Models\MixLike;

class MixLikesController extends Controller
{
    public function addLike($id)
    {
        if (MixLike::where('mix_id', $id)->where('user_id', Auth::id())->exists()) {
            return response()->json(['error' => 'Already liked'], 409);
        }
        MixLike::create([
            'user_id' => Auth::id(),
            'mix_id' => $id,
        ]);
        return response()->json(['success' => 'Like added']);
    }
    public function removeLike($id)
    {
        $mixLike = MixLike::where('user_id', Auth::id())->where('mix_id', $id)->firstOrFail();
        $mixLike->delete();
        return response()->json(['success' => 'Like removed']);
    }
}
