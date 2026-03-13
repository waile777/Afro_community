<?php

namespace Database\Factories;

use App\Models\Mix;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'mix_id' => Mix::factory(),
            'content' => fake()->paragraphs(3, true),
        ];
    }
}
