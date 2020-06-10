<?php

namespace Encore\Distpickerf;

use Encore\Admin\Extension;

class Distpickerf extends Extension
{
    public $name = 'distpickerf';

    public $views = __DIR__.'/../resources/views';

    public $assets = __DIR__.'/../resources/assets';

    public $menu = [
        'title' => 'Distpickerf',
        'path'  => 'distpickerf',
        'icon'  => 'fa-gears',
    ];
}