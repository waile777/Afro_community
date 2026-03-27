<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Termwind\Components\Hr;

class Mix extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'audio_file',
        'cover_image',
        'genre',
        'bpm',
        'view_count',
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
            'user_id' => 'integer',
        ];
    }
    // get Path cover Image to the frontend whtih Accessoire get + fieldName + Attribute
    public function getCoverImageAttribute($value)
    {
        return asset('storage/' . $value);
    }
    // get Path Audio File to the frontend whtih Accessoire get + fieldName + Attribute
    public function getAudioFileAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function playlists(): BelongsToMany
    {
        return $this->belongsToMany(Playlist::class , 'playlist_mixes');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(MixLike::class);
    }

    public function analysis()
    {
        return $this->hasOne(AiAnalysis::class);
    }
}
