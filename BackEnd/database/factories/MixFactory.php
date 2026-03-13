<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MixFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->text(),
            'audio_file' => fake()->regexify('[A-Za-z0-9]{255}'),
            'cover_image' => fake()->regexify('[A-Za-z0-9]{255}'),
            'genre' => fake()->randomElement(["afrohouse","afrotech","afrotribal","amapiano","3step","afroprogressive"]),
            'bpm' => fake()->numberBetween(-10000, 10000),
            'status' => fake()->randomElement(["pending","approved","rejected"]),
            'view_count' => fake()->numberBetween(-10000, 10000),
        ];
    }
}
