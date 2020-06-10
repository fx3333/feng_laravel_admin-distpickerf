<?php

namespace Encore\Distpickerf;

use Illuminate\Support\ServiceProvider;
use Encore\Admin\Admin;
use Encore\Admin\Form;
use Encore\Admin\Grid\Filter;

class DistpickerfServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function boot(Distpickerf $extension)
    {
        if (! Distpickerf::boot()) {
            return ;
        }

//        if ($views = $extension->views()) {
//            $this->loadViewsFrom($views, 'distpickerf');
//        }
//
//        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
//            $this->publishes(
//                [$assets => public_path('vendor/laravel-admin-ext/distpickerf')],
//                'distpickerf'
//            );
//        }
//
//        $this->app->booted(function () {
//            Distpickerf::routes(__DIR__.'/../routes/web.php');
//        });

        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'laravel-admin-distpickerf');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/laravel-admin-ext/distpickerf')],
                'laravel-admin-distpickerf'
            );
        }

        Admin::booting(function () {
            Form::extend('distpickerfeng', DemoCheck::class);
            Filter::extend('distpickerfeng', DemoFilter::class);
        });
    }
}