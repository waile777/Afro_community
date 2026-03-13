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

        Schema::create('ai_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mix_id')->constrained();
            $table->integer('detected_bpm')->nullable();
            $table->string('detected_genre', 100)->nullable();
            $table->boolean('explicit_content');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_analyses');
    }
};
