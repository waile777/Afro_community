<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DjProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'stage_name' => fake()->regexify('[A-Za-z0-9]{150}'),
            'bio' => fake()->text(),
            'verification_status' => fake()->randomElement(["pending","approved","rejected"]),
        ];
    }
}
