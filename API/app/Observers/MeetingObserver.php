<?php

namespace App\Observers;

use App\Models\Meeting;
use App\Models\User;

class MeetingObserver
{
    public function creating(Meeting $meeting)
    {
        return $meeting->user_id = auth()->user()->id;
    }
}
