<?php

namespace App\Providers;

use App\Http\Controllers\FollowController;
use App\Models\DjProfile;
use App\Models\Follow;
use Illuminate\Support\ServiceProvider;
use App\Models\Mix;
use App\Models\User;
use App\Policies\djProfilePolicy;
use App\Policies\FollowPolicy;
use App\Policies\MixPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Mix::class , MixPolicy::class);
        Gate::policy(DjProfile::class , djProfilePolicy::class);
        Gate::policy(User::class , UserPolicy::class);
        Gate::policy(Follow::class  , FollowPolicy::class);

    }
}
