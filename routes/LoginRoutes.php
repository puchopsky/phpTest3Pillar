<?php
use App\Http\Controllers\LoginController;

Route::post('/login', [LoginController::class,'loginUser']);
Route::middleware('auth:sanctum')->delete('/logout', [LoginController::class,'logoutUser']);
Route::middleware('auth:sanctum')->get('/userInfo', [LoginController::class,'getUserInfo']);

