<?php

namespace App\Policies;

use App\Models\Mix;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MixPolicy
{

    public function before(User $user, $ability)
    {
        if ($user->role === 'admin') {
            return true;
        }
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Mix $mix): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if (!$user->djProfile) {
            return false;
        }
        if ($user->djProfile->verification_status === 'approved') {
            return true;
        }

        return $user->mixes()->count() < 2;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Mix $mix): bool
    {
        return $user->id === $mix->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Mix $mix): bool
    {
        return $user->id === $mix->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Mix $mix): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Mix $mix): bool
    {
        return false;
    }
}
