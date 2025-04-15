<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ScheduleVisit;
use App\Models\SelectedDayVisit;
use App\Models\TimeSlotVisit;
use Illuminate\Http\Request;

class ScheduleVisitController extends Controller
{
    public function insertScheduleVisit(Request $request)
    {
        try {
            $data = [
                "freq" => $request->input('frequency') == "recurring" ? 0 : 1,
                "start_from" => $request->input('dateStartFrom'),
                "notes" => $request->input('note'),
            ];

            $id = ScheduleVisit::insertGetId($data);

            if ($daySelect = $request->input('daySelect')) {
                foreach ($daySelect as $numericalDay) {
                    SelectedDayVisit::create([
                        'sched_visit_id' => $id,
                        'numerical_day' => $numericalDay
                    ]);
                }
            }

            if ($timeSlot = $request->input('timeSlot')) {
                foreach ($timeSlot as $slot) {
                    $valSlot = null;

                    switch ($slot) {
                        case 'evening':
                            $valSlot = 3;
                            break;
                        case 'afternoon':
                            $valSlot = 2;
                            break;
                        case 'morning':
                            $valSlot = 1;
                            break;
                        default:
                            $valSlot = null;
                            break;
                    }

                    TimeSlotVisit::create([
                        'sched_visit_id' => $id,
                        'timeslot_val' => $valSlot
                    ]);
                }
            }
            return response()->json("SUCCESS");
        } catch (\Exception $e) {
            return response()->json("FAIL: " . $e->getMessage(), 500);
        }

    }
}
