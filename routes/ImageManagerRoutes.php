<?php
use App\Http\Controllers\ImageManagerController;

Route::middleware('auth:sanctum')->get('/', [ImageManagerController::class,'listImages']);
Route::middleware('auth:sanctum')->post('/upload', [ImageManagerController::class,'uploadImages']);
Route::middleware('auth:sanctum')->delete('/:imgId', [ImageManagerController::class,'deleteImage']);

