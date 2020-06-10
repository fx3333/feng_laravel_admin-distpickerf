<?php

use Encore\Distpickerf\Http\Controllers\DistpickerfController;

Route::get('distpickerf', DistpickerfController::class.'@index');