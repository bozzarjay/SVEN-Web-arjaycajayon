<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedDayVisit extends Model
{
    use HasFactory;

    protected $table = "selected_day_visit";
    protected $fillable = [
        "numerical_day",
        "sched_visit_id"
    ];
}
