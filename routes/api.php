<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CocktailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/cocktails', [CocktailController::class, 'index']);
Route::delete('/cocktails/{id}', [CocktailController::class, 'destroy']);
Route::put('/cocktails/{id}', [CocktailController::class, 'update']);
Route::post('cocktails', [CocktailController::class, 'store']);
