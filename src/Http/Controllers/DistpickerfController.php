<?php

namespace Encore\Distpickerf\Http\Controllers;

use Encore\Admin\Layout\Content;
use Illuminate\Routing\Controller;

class DistpickerfController extends Controller
{
    public function index(Content $content)
    {
        return $content
            ->title('Title')
            ->description('Description')
            ->body(view('distpickerf::index'));
    }
}