<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Meeting;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;


class MeetingPolicy
{
    use HandlesAuthorization;

    public function organizer(User $user, Meeting $meeting)
    {
        if ($user->id == $meeting->user_id) {
            return true;
        } else {
            return false;
        }
    }
}
