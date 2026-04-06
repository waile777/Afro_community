<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RecentlyPlayed extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'recently_played';

    protected $fillable = [
        'user_id',
        'mix_id',
        'played_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mix(): BelongsTo
    {
        return $this->belongsTo(Mix::class);
    }

    public function djProfile(): HasOne
    {
        return $this->hasOne(DjProfile::class);
    }
}
