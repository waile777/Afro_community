<?php

namespace Database\Factories;

use App\Models\Dj;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'dj_id' => Dj::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->text(),
            'event_date' => fake()->dateTime(),
            'location' => fake()->regexify('[A-Za-z0-9]{255}'),
        ];
    }
}
