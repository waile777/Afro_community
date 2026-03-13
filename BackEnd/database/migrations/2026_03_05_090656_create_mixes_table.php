<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('mixes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('audio_file', 255);
            $table->string('cover_image', 255)->nullable();
            $table->enum('genre', ["afrohouse","afrotech","afrotribal","amapiano","3step","afroprogressive"]);
            $table->integer('bpm')->nullable();
            $table->enum('status', ["pending","approved","rejected"]);
            $table->integer('view_count');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mixes');
    }
};
