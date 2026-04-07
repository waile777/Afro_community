<?php

namespace App\Models;

use Dom\Comment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'profile_picture'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'password'=>'hashed'
        ];
    }
    // ROLE_CONSTANT:
    const ROLE_ADMIN =  'admin';
    const ROLE_LISTENER =  'listener';
    const ROLE_DJ = 'dj';


    public function mixes() {
        return $this->hasMany(Mix::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }
    public function djProfile() 
    {
        return $this->hasOne(DjProfile::class);
    }

    public function reservation(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

}
