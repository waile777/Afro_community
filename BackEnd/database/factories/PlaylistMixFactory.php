<?php

namespace Database\Factories;

use App\Models\Mix;
use App\Models\Playlist;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlaylistMixFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'playlist_id' => Playlist::factory(),
            'mix_id' => Mix::factory(),
            'primary' => fake()->word(),
        ];
    }
}
