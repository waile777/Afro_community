<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservetionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $allreservations = Reservation::with('user','ticket')->latest()->get();
        return response()->json([
            "allTickets"=>$allreservations
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
    public function store(Request $request , $ticketid)
    {
        //post=>/reservations/ticketid 
        $this->authorize('create' , Reservation::class);
        $request->validate([
            "reserved_at"=>"date"
        ]);

        $user = auth()->user();
        $reservation = $user->reservation()->create([
            "ticket_id"=>$ticketid,
            "reserved_at"=>now()
        ]);

        return response()->json([
            "message"=>"reservation added",
            "reservation"=>$reservation
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();
        return response()->json(["message"=>"reservation deleted"]);
    }
}
