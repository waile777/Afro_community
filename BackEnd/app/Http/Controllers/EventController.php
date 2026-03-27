<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    //  GET /events
    public function index(Request $request)
    {
        $query = Event::with('dj');

        //  Search (title / description)
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        //  Filter by location
        if ($request->location) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        //  Filter by date
        if ($request->date) {
            $query->whereDate('date', $request->date);
        }

        //  Upcoming events only
        if ($request->upcoming) {
            $query->where('date', '>=', now());
        }

        //  Order (latest first)
        $query->latest();

        //  Pagination
        $events = $query->paginate(10); // 10 events per page

        return response()->json($events);
    }

    // GET /events/{id}
    public function show($id)
    {
        $event = Event::with(['dj', 'reservations'])->findOrFail($id);

        return response()->json($event);
    }

    //  POST /events
    public function store(Request $request)
    {
        $user = Auth::user();
        $this->authorize('create', $user);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'required|date',
            'location' => 'required|string|max:255'
        ]);

        // user li create event (DJ)
        $data['dj_id'] = $user->id;

        $event = Event::create($data);

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event
        ], 201);
    }

    //  PATCH /events/{id}
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $this->authorize('update', $event);
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'sometimes|date',
            'location' => 'sometimes|string|max:255',
        ]);

        $event->update($data);

        return response()->json([
            'message' => 'Event updated',
            'event' => $event
        ]);
    }

    //  DELETE /events/{id}
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $this->authorize('delete', $event);
        $event->delete();

        return response()->json([
            'message' => 'Event deleted'
        ]);
    }
}
