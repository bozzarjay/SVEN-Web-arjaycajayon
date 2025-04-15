<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedule_visit', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->tinyInteger('freq')->nullable()->default(null);
            $table->date('start_from')->nullable()->default(null);
            $table->text('notes')->nullable()->default(null);
            $table->timestampTz('created_at')->useCurrent();
            $table->timestampTz('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_visit');
    }
};
