<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->safeEmail(),
            'password' => fake()->password(),
            'role' => fake()->randomElement(["listener","dj","admin"]),
            'account_status' => fake()->randomElement(["active","pending","suspended"]),
        ];
    }
}
