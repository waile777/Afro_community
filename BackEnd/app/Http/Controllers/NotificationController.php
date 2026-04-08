<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{

    public function index()
    {
        $notifications = Auth::user()
            ->notifications()
            ->latest()
            ->get();

        return response()->json($notifications);
    }

    // غير unread
    public function unread()
    {
        $notifications = Auth::user()
            ->unreadNotifications()
            ->latest()
            ->get();

        return response()->json($notifications);
    }

    public function unreadCount()
    {
        $count = Auth::user()
            ->unreadNotifications()
            ->count();

        return response()->json([
            'count' => $count
        ]);
    }

    public function markAsRead($id)
    {
        $notification = Auth::user()
            ->notifications()
            ->findOrFail($id);

        $notification->markAsRead();

        return response()->json([
            'message' => 'notification marked as read'
        ]);
    }

    // mark all as read
    public function markAllAsRead()
    {
        Auth::user()
            ->unreadNotifications
            ->markAsRead();

        return response()->json([
            'message' => 'all notifications marked as read'
        ]);
    }

    // delete notification
    public function destroy($id)
    {
        $notification = Auth::user()
            ->notifications()
            ->findOrFail($id);

        $notification->delete();

        return response()->json([
            'message' => 'notification deleted'
        ]);
    }
    public function markNormalAsRead()
    {
        Auth::user()
            ->unreadNotifications()
            ->where('type', '!=', 'App\Notifications\VerificationRequiredNotification')
            ->update(['read_at' => now()]);

        return response()->json();
    }
}
