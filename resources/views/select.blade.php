<div class="{{$viewClass['form-group']}} {!! !$errors->hasAny($errorKey) ? '' : 'has-error' !!}">

    <label for="{{$id}}" class="{{$viewClass['label']}} control-label">{{$label}}</label>

    <div class="{{$viewClass['field']}} form-inline">

        @foreach($errorKey as $key => $col)
            @if($errors->has($col))
                @foreach($errors->get($col) as $message)
                    <label class="control-label" for="inputError"><i class="fa fa-times-circle-o"></i> {{$message}}</label><br/>
                @endforeach
            @endif
        @endforeach

        <div id="{{ $id }}" {!! $attributes !!}>&nbsp;
            <select class="form-control selProvince" name="{{$name['province']}}" ></select>&nbsp;
            <select class="form-control selCity" name="{{$name['city']}}" ></select>&nbsp;
            <select class="form-control selCountry" name="{{$name['district']}}" ></select>&nbsp;
            <input type="hidden"  class="form-control province_9" name="{{$name['province']}}"  value="{{ old($column['province'], $value['province']) }}">
        </div>
        @include('admin::form.help-block')

    </div>
</div>