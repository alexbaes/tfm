<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function getUsers()
    {

        $users = User::all();

        // return UserResource::collection($users);
        return response()->json($users, 200);
    }

    public function showUser(User $user)
    {
        return new UserResource($user);
    }

    public function updateUser(UpdateUserRequest $request, User $user)
    {
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return new UserResource($user);
    }

    public function destroyUser(User $user)
    {
        $user->delete();
        return new UserResource($user);
    }
}
