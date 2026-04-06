<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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

    public function moreOfWhatYouLike()
    {
        $user_id = Auth::id();
        $likedGenres = DB::table('mixes')
            ->join('mix_likes', 'mixes.id', '=', 'mix_likes.mix_id')
            ->where('mix_likes.user_id', $user_id)
            ->pluck('mixes.genre')
            ->unique();


        $mixesBygenre = DB::table('mixes')
            ->whereIn('genre', $likedGenres)
            ->whereNotIn('id', function ($query) use ($user_id) {
                $query->select('mix_id')
                    ->from('mix_likes')
                    ->where('user_id', $user_id);
            })
            ->get();
        if ($mixesBygenre->isEmpty()) {
            $mixesBygenre = Mix::with(['user.djProfile'])
                ->where('status', 'pending')
                ->latest()
                ->take(10)
                ->get();
                
        }
        return response()->json($mixesBygenre);
    }
}
