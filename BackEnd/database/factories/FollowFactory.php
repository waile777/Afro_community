<?php

namespace Database\Factories;

use App\Models\Follower;
use App\Models\Following;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'follower_id' => Follower::factory(),
            'following_id' => Following::factory(),
        ];
    }
}
