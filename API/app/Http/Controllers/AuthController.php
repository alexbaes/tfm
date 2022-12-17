<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'status' => $request->status,
            'attendee' => $request->attendee
        ]);

        return response()->json([
            "missatge" => 'Usuari registrat correctament',
            $user
        ], 200);
    }

    public function login(Request $request)
    {

        $user = User::where('email', $request['email'])->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'missatge' => 'Les credencials no són correctes'
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            "email" =>  $user->email,
            "password" =>  $user->password,
            "accessToken" => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json('Sessió tancada amb éxit');
    }
}
