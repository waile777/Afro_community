<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Mix;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($mixId)
    {
        $commentsForMix = Comment::with(['user'])->where('mix_id', $mixId)->latest()->get();
        return response()->json([
            'commentForMix' => $commentsForMix
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|min:1|string|max:255'
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'mix_id' => $id,
            'content' =>$request->content,
        ]);
        return response()->json($comment);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return  $comment->load('user');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $comment->update($request->only([
            'content'
        ]));
        return response()->json([
            'message' => 'Comment updated',
            'comment' => $comment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idComment)
    {
        $comment = Comment::findOrFail($idComment);
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $comment->delete();
        return response()->json([
            'message' => 'Comment deleted'
        ]);
    }
}
