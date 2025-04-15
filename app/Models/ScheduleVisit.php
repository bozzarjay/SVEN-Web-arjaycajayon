<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleVisit extends Model
{
    use HasFactory;

    protected $table = "schedule_visit";
    protected $fillable = [
        "freq",
        "start_from",
        "notes"
    ];
    
}
