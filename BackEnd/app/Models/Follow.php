<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Follow extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'follower_id',
        'following_id',
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
            'follower_id' => 'integer',
            'following_id' => 'integer',
        ];
    }

    public function follower(): BelongsTo
    {
        return $this->belongsTo(User::class , 'follower_id');
    }

    public function following(): BelongsTo
    {
        return $this->belongsTo(User::class , 'following_id');
    }
}
