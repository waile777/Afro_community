<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('playlist_mixes', function (Blueprint $table) {

            if (!Schema::hasColumn('playlist_mixes', 'mix_id')) {
                $table->foreignId('mix_id')
                      ->constrained('mixes')
                      ->cascadeOnDelete();
            }

            if (!Schema::hasColumn('playlist_mixes', 'playlist_id')) {
                $table->foreignId('playlist_id')
                      ->constrained('playlists')
                      ->cascadeOnDelete();
            }

            // unique constraint
            $table->unique(['mix_id','playlist_id']);
        });
    }

    public function down(): void
    {
        Schema::table('playlist_mixes', function (Blueprint $table) {
            $table->dropUnique(['mix_id','playlist_id']);
        });
    }
};