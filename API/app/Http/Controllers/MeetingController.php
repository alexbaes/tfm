<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\MeetingResource;
use App\Models\Meeting;
use App\Http\Requests\MeetingRequest;


class MeetingController extends Controller
{
    public function getMeetings()
    {

        $meetings = Auth::user()->meetings()->get();

        if ($meetings->isEmpty())
            return response()->json("No hi ha events creates");

        return MeetingResource::collection($meetings);
    }

    public function showMeeting(Meeting $meeting)
    {
        $this->authorize('organizer', $meeting);
        return new MeetingResource($meeting);
    }

    public function storeMeeting(MeetingRequest $request)
    {

        return new MeetingResource(Meeting::create($request->all()));
    }

    public function updateMeeting(MeetingRequest $request, Meeting $meeting)
    {

        $this->authorize('organizer', $meeting);
        $meeting->update($request->except('user_id'));

        return new MeetingResource($meeting);
    }

    public function destroyMeeting(Meeting $meeting)
    {
        $this->authorize('organizer', $meeting);
        $meeting->delete();
        return new MeetingResource($meeting);
    }
}
