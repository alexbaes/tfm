<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MeetingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Auth
Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

// //Users
// Route::controller(UserController::class)->group(function () {
//     Route::get('users', 'getUsers');
//     Route::get('users/{user}', 'showUser');
// });


//Auth & Users Middleware
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::put('users/{user}', [UserController::class, 'updateUser']);
    Route::delete('users/{user}', [UserController::class, 'destroyUser']);
    Route::get('users', [UserController::class, 'getUsers']);
    Route::get('users/{user}', [UserController::class, 'showUser']);
});


//Meetings middleware
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('meetings', [MeetingController::class, 'storeMeeting']);
    Route::put('meetings/{meeting}', [MeetingController::class, 'updateMeeting']);
    Route::delete('meetings/{meeting}', [MeetingController::class, 'destroyMeeting']);
    Route::get('meetings',  [MeetingController::class, 'getMeetings']);
    Route::get('meetings/{meeting}', [MeetingController::class, 'showMeeting']);
});
