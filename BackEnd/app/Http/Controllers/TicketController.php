<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Event;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $alltickets = Ticket::with('event.dj' , 'user')->latest()->get();
        return response()->json([
            "allTickets"=>$alltickets
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request , Event $event)
    {

        $this->authorize('create' , Ticket::class);

        $request->validate([
            "type"=>"required|string|max:255",
            "price"=>"required|numeric",
            "quantity"=>"required|integer"
        ]);

        //laravel inject automatiqument l event id b relations li kinin f model 
        $ticket = $event->tickets()->create([
            "type"=>$request->type,
            "price"=>$request->price,
            "quantity"=>$request->quantity,
        ]);

        return response()->json([
            "message"=>"ticket created",
            "ticket"=>$ticket,
        ], 201);



    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ticket = Ticket::with(['tickets'])->findOrFail($id);
        return response()->json($ticket);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        #patch => /tickets/update/id
        $ticket = Ticket::findOrFail($id);
        $data = $request->validate([
            "type"=>"required|string|max:255",
            "price"=>"required|descimal",
            "quantity"=>"required|integer"
        ]);

        $ticket->update($data);

        return response()->json([
            'message' => 'ticket updated',
            'ticket' => $ticket
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        #DELETE=> /tickets/destroy/id
        $ticket = Ticket::findOrFail($id);
        $this->authorize('delete', $ticket);
        $ticket->delete();

        return response()->json([
            'message' => 'ticket deleted'
        ]);
    }
}
