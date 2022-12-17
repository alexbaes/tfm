<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\MeetingResource;
use App\Models\Meeting;
use App\Http\Requests\MeetingRequest;
use App\Models\User;

class MeetingController extends Controller
{
    public function getMeetings()
    {

        $meetings = Meeting::where('user_id', Auth::user()->id)->get();

        // return MeetingResource::collection($meetings);
        return response()->json($meetings, 200);
    }

    public function showMeeting(Meeting $meeting)
    {
        // $this->authorize('organizer', $meeting);

        return response()->json($meeting, 200);
        // return new MeetingResource($meeting);
    }

    public function storeMeeting(MeetingRequest $request)
    {
        Meeting::create($request->all());

        return response()->json([
            'res' => true,
            'msg' => 'Guardat correctament'
        ], 200);

        // return new MeetingResource(Meeting::create($request->all()));
    }

    public function updateMeeting(MeetingRequest $request, Meeting $meeting)
    {

        $this->authorize('organizer', $meeting);
        $meeting->update($request->except('user_id'));

        return response()->json([
            'res' => true,
            'msg' => 'Actualitzat correctament'
        ], 200);

        // return new MeetingResource($meeting);
    }

    public function destroyMeeting(Meeting $meeting)
    {
        $this->authorize('organizer', $meeting);
        $meeting->delete();

        return response()->json([
            'res' => true,
            'msg' => 'Eliminat correctament'
        ], 200);
        // return new MeetingResource($meeting);
    }
}
