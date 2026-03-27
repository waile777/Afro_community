<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dj_id',
        'title',
        'description',
        'event_date',
        'location',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'dj_id' => 'integer',
            'event_date' => 'datetime',
        ];
    }

    // Event.php
    public function dj():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reservations():HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
