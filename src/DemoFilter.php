<?php

namespace Encore\Distpickerf;

use Encore\Admin\Admin;
use Encore\Admin\Grid\Filter\AbstractFilter;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class DemoFilter extends AbstractFilter
{
    /**
     * @var array
     */
    protected $column = [];

    /**
     * @var array
     */
    protected $value = [];

    /**
     * @var array
     */
    protected $defaultValue = [];

    /**
     * request url for this resource .
     *
     * @var string
     */
    protected $url;

    /**
     * DistpickerFilter constructor.
     *
     * @param string $province
     * @param string $city
     * @param string $district
     * @param string $label
     */
    public function __construct($province, $city, $district, $label = '',$url='')
    {
        $this->column = compact('province', 'city', 'district');
        $this->label  = $label;
        $this->url  = $url;

        $this->setPresenter(new FilterPresenter());
    }

    /**
     * {@inheritdoc}
     */
    public function getColumn()
    {
        $columns = [];

        $parentName = $this->parent->getName();

        foreach ($this->column as $column) {
            $columns[] = $parentName ? "{$parentName}_{$column}" : $column;
        }

        return $columns;
    }

    /**
     * {@inheritdoc}
     */
    public function condition($inputs)
    {
        $value = array_filter([
            $this->column['province'] => Arr::get($inputs, $this->column['province']),
            $this->column['city']     => Arr::get($inputs, $this->column['city']),
            $this->column['district'] => Arr::get($inputs, $this->column['district']),
        ]);

        if (!isset($value)) {
            return;
        }

        $this->value = $value;

        if (Str::contains(key($value), '.')) {
            return $this->buildRelationQuery($value);
        }

        return [$this->query => [$value]];
    }

    /**
     * {@inheritdoc}
     */
    protected function buildRelationQuery($columns = [])
    {
        $data = [];

        foreach ($columns as $column => $value) {
            Arr::set($data, $column, $value);
        }

        $relation = key($data);

        $args = $data[$relation];

        return ['whereHas' => [$relation, function ($relation) use ($args) {
            call_user_func_array([$relation, $this->query], [$args]);
        }]];
    }

    /**
     * {@inheritdoc}
     */
    public function formatName($column)
    {
        $columns = [];

        foreach ($column as $col => $name) {
            $columns[$col] = parent::formatName($name);
        }

        return $columns;
    }

    /**
     * Setup js scripts.
     */
    protected function setupScript()
    {
        $province = old($this->column['province'], Arr::get($this->value, $this->column['province']));
        $city     = old($this->column['city'], Arr::get($this->value, $this->column['city']));
        $district = old($this->column['district'], Arr::get($this->value, $this->column['district']));

        $script = <<<EOT
$("#{$this->id}").distpickerfeng({
  province: '$province',
  city: '$city',
  district: '$district',
  url: '$this->url',
});
EOT;
        Admin::script($script);
    }

    /**
     * {@inheritdoc}
     */
    protected function variables()
    {
        $this->id = 'distpicker-filter-' . uniqid();

        $this->setupScript();

        return array_merge([
            'id'        => $this->id,
            'name'      => $this->formatName($this->column),
            'label'     => $this->label,
            'value'     => $this->value ?: $this->defaultValue,
            'presenter' => $this->presenter(),
        ], $this->presenter()->variables());
    }
}
