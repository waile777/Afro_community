<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiAnalysis extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'mix_id',
        'detected_bpm',
        'detected_genre',
        'explicit_content',
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
            'mix_id' => 'integer',
            'explicit_content' => 'boolean',
        ];
    }

    public function mix(): BelongsTo
    {
        return $this->belongsTo(Mix::class);
    }
}
