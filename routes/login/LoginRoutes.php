<?php
use App\Http\Controllers\LoginController;

Route::post('/login', [LoginController::class,'loginUser']);
Route::post('/logout', 'LoginController@logoutUser');
Route::middleware('auth:api')->get('/infoFromToken', 'LoginController@getUserInfo');

