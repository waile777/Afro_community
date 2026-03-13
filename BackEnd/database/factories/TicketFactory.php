<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            'type' => fake()->regexify('[A-Za-z0-9]{100}'),
            'price' => fake()->randomFloat(2, 0, 99999999.99),
            'quantity' => fake()->numberBetween(-10000, 10000),
        ];
    }
}
