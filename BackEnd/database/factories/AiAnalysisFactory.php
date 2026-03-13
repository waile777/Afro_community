<?php

namespace Database\Factories;

use App\Models\Mix;
use Illuminate\Database\Eloquent\Factories\Factory;

class AiAnalysisFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'mix_id' => Mix::factory(),
            'detected_bpm' => fake()->numberBetween(-10000, 10000),
            'detected_genre' => fake()->regexify('[A-Za-z0-9]{100}'),
            'explicit_content' => fake()->boolean(),
        ];
    }
}
