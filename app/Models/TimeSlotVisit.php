<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlotVisit extends Model
{
    use HasFactory;
    protected $table = "time_slot_visit";
    protected $fillable = [
        "sched_visit_id",
        "timeslot_val"
    ];
}
