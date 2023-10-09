<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
  "middleware" => ["auth", "access.check"]
], function () {
    Route::get('/', function () {
        return to_route('dashboard');
    });

    Route::match(["get", "post"], '/dashboard', [DashboardController::class, "index"])->name('dashboard');
});
require __DIR__.'/auth.php';
