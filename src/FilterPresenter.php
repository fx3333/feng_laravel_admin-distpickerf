<?php

namespace Encore\Distpickerf;

use Encore\Admin\Grid\Filter\Presenter\Presenter;

class FilterPresenter extends Presenter
{
    public function view() : string
    {
        return 'laravel-admin-distpickerf::filter';
    }
}