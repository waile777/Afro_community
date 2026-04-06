<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\DjProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;

class djProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', DjProfile::class);

        $profilesInfos = User::with('djProfile')->get();
        return response()->json([
            'profile_infos' => $profilesInfos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', DjProfile::class);
        $request->validate([
            'stage_name' => 'required|string|max:100',
            'bio' => 'nullable|string|max:1000',
        ]);
        $djProfile = DjProfile::create([
            'user_id' => Auth::id(),
            'stage_name' => $request->stage_name,
            'bio' => $request->bio
        ]);
        return response()->json([
            'dj_profile' => $djProfile
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', DjProfile::class);
        $profileInfos = User::with('djProfile')->findOrFail($id);
        return response()->json([
            'profile_info' => $profileInfos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->authorize('update', DjProfile::class);
        $djProfile = DjProfile::findOrFail($id);
        $djProfile->update($request->only([
            'stage_name' => $request->stage_name,
            'bio' => $request->bio
        ]));
        return response()->json([
            'profile state' => 'profile updated successfuly'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete', DjProfile::class);
        $djProfile = DjProfile::findOrFail($id);
        $djProfile->delete();
        return response()->json([
            'profile state' => 'profile deleted successfuly'
        ]);
    }


    public function djsYouShouldFollow(Request $request)
    {

        $user = Auth::user();

        // 1️⃣ Jib liked genres safely
        $likedGenres = $user
            ->mixLikes()
            ->with('mix:id,genre')
            ->get()
            ->pluck('mix.genre')
            ->filter()
            ->unique()
            ->values();

        $djsQuery = User::with('djProfile')
            ->where('role', 'dj')
            ->where('id', '!=', $user->id) // exclude logged-in user
            ->whereDoesntHave('followers', function ($q) use ($user) {
                $q->where('follower_id', $user->id);
            })
            ->withCount('mixes')
            ->withCount('followers');

        // 3️⃣ Apply likedGenres filter ila kayn
        if ($likedGenres->isNotEmpty()) {
            $djsQuery->whereHas('mixes', function ($q) use ($likedGenres) {
                $q->whereIn('genre', $likedGenres);
            });
        }

        // 4️⃣ Limit results
        $djs = $djsQuery->limit(3)->get();

        // 5️⃣ Fallback ila ma kaynch DJs match
        if ($djs->isEmpty()) {
            $djs = User::with('djProfile')
                ->where('role', 'dj')
                ->where('id', '!=', $user->id)
                ->whereDoesntHave('followers', function ($q) use ($user) {
                    $q->where('follower_id', $user->id);
                })
                ->inRandomOrder()
                ->limit(3)
                ->withCount('mixes')
                ->withCount('followers')
                ->get();
        }

        return response()->json($djs);
    }
}
