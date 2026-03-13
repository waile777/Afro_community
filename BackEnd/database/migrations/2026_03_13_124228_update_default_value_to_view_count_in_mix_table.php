<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::table('mixes', function (Blueprint $table) {
        $table->integer('view_count')->default(0)->change();
    });
}

public function down()
{
    Schema::table('mixes', function (Blueprint $table) {
        $table->integer('view_count')->default(null)->change();
    });
}
};
