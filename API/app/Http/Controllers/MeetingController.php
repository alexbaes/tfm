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
    public function registerAttendee(Request $request, Meeting $meeting)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'status' => $request->status,
            'attendee' => $request->attendee
        ]);

        $meeting_id = $meeting->id;
        $user_id = $user->id;

        $user->meetings()->attach([$user_id => ['meeting_id' => $meeting_id]]);

        return response()->json([
            "missatge" => 'Usuari registrat correctament',
            $user
        ], 200);
    }

    public function getMeetings()
    {

        $meetings = Meeting::where('user_id', Auth::user()->id)->get();

        return response()->json($meetings, 200);
    }

    public function showMeeting(Meeting $meeting)
    {

        return response()->json($meeting, 200);
    }

    public function storeMeeting(MeetingRequest $request)
    {
        Meeting::create($request->all());

        return response()->json([
            'res' => true,
            'msg' => 'Guardat correctament'
        ], 200);
    }

    public function updateMeeting(MeetingRequest $request, Meeting $meeting)
    {

        $this->authorize('organizer', $meeting);
        $meeting->update($request->except('user_id'));

        return response()->json([
            'res' => true,
            'msg' => 'Actualitzat correctament'
        ], 200);
    }

    public function destroyMeeting(Meeting $meeting)
    {
        $this->authorize('organizer', $meeting);
        $meeting->delete();

        return response()->json([
            'res' => true,
            'msg' => 'Eliminat correctament'
        ], 200);
    }
}
