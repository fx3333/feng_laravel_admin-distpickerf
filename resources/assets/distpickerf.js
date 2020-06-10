//step01 定义JQuery的作用域
(function ($) {

    //step03-a 插件的默认值属性
    var defaults = {
        province:'',
        city:'',
        district:'',
        url:'',

        //……
    };
    var iNum1=-2;
    var iNum2=-2;

    /**
     * 空值判断
     * 1.字符串类型判断非空且不为空串
     * 2.对象或者undefined类型判断是否为null
     * 3.数值类型判断是否为NaN
     * 4.boolean类型直接返回false
     * 5.未知类型返回true
     */
    var isEmpty =function (param){
        if(typeof param == 'string'){
            //字符串类型判断非空且不为空串
            return param==null
                ||param.trim().length==0;
        }else if(typeof param == 'object'
            || typeof param == undefined){
            //对象或者undefined类型判断是否为null
            return param==null;
        }else if(typeof param == 'number'){
            //数值类型判断是否为NaN
            return isNaN(param);
        }else if(typeof param == 'boolean'){
            //boolean类型直接返回false
            return false ;
        }else{
            //未知类型返回true
            return true;
        }
    }

    var proOnChange = function (parent,obj,pcdData,url) {
        $(parent).find('.selCity').children().remove();
        $(parent).find('.selCountry').children().remove();
        iNum1 = obj.children('option:selected').val();
        if(!isEmpty(iNum1)){
            var aaCity=getPcdData(url,iNum1);
            if(!isEmpty(aaCity)){
                for(let j  in aaCity){
                    //console.log(j+'---	'+aaCity[j]['id'] + '---' + aaCity[j]['name']);
                    if(j==0){
                        $(parent).find(".selCity").append('<option  value="">请选择</option>');
                    }
                    $(parent).find('.selCity').append('<option  value="'+aaCity[j]['id']+'">' + aaCity[j]['name'] + '</option>');
                }
                $(parent).find(".selCountry").append('<option  value="">请选择</option>');
            }else{
                //console.log("bs");
                $(parent).find(".selCity").append('<option  value="">请选择</option>');
                $(parent).find(".selCountry").append('<option  value="">请选择</option>');
            }
        }else{
            $(parent).find(".selCity").append('<option  value="">请选择</option>');
            $(parent).find(".selCountry").append('<option  value="">请选择</option>');
        }

    };

    var cityOnChange = function (parent,obj,pcdData,url) {

        //$(parent).find('#selCountry').children().not(':eq(0)').remove();
        $(parent).find('.selCountry').children().remove();
        iNum2 =obj.children('option:selected').val();
        if(!isEmpty(iNum2)){
            var aaCountry=getPcdData(url,iNum2);
            if(!isEmpty(aaCountry)){
                //console.log("asfd");
                for(let k  in aaCountry){
                    //console.log(k+'---	'+aaCountry[k]['id'] + '---' + aaCountry[k]['name']);
                    if(k==0){
                        $(parent).find(".selCountry").append('<option  value="">请选择</option>');
                    }
                    $(parent).find('.selCountry').append('<option  value="'+aaCountry[k]['id']+'">' + aaCountry[k]['name'] + '</option>');
                }

            }else{
                //console.log("bs");
                $(parent).find(".selCountry").append('<option  value="">请选择</option>');
            }
        }else{
            $(parent).find(".selCountry").append('<option  value="">请选择</option>');
        }

    };



    var getPcdData = function (url,id) {
        var result;
        //console.log(id);
        $.ajax({
            type: 'get',
            url: ''+url+'?id='+id,
            dataType: 'json',
            async:false,
            success: (response) => {
                //if(Array.isArray(response)){
                //console.log("asdf");
                //}
                // console.log(response);
                // var jsonarray = eval('('+response+')');
                result = response;
            }
        });
        return result;


    };

    //step06-a 在插件里定义方法
    var showLink = function (obj,options) {
        //console.log("obj_fff8989");
        $(obj).find(".province_9").val("999");
        var default_province=parseInt(options.province);
        var default_city=parseInt(options.city);
        var default_country=parseInt(options.district);
        var url=options.url;
        console.log("url:"+url);

        var pcdData=[];
        // aProvince=getPcdData(url,0);
        if (isEmpty(default_province)) {
            aProvince=getPcdData(url,0);
            if(!isEmpty(aProvince)){
                //console.log("asfd");
                for(let i  in aProvince){
                    //console.log(i+'---	'+aProvince[i]['id'] + '---' + aProvince[i]['name']);
                    if(i==0){
                        $(obj).find(".selProvince").append('<option  value="">请选择</option>');
                    }
                    $(obj).find(".selProvince").append('<option  value="'+aProvince[i]['id']+'">' + aProvince[i]['name'] + '</option>');
                }
            }else{
                $(obj).find(".selProvince").append('<option  value="">请选择</option>');
            }
        }else{
            aProvince=getPcdData(url,0);
            if(!isEmpty(aProvince)){
                //console.log("asfd");
                for(let i  in aProvince){
                    //console.log(i+'---	'+aProvince[i]['id'] + '---' + aProvince[i]['name']);
                    if(i==0){
                        $(obj).find(".selProvince").append('<option  value="">请选择</option>');
                    }
                    if (aProvince[i]['id'] == default_province) {
                        iNum1 = aProvince[i]['id'];

                        $(obj).find('.selProvince').append('<option  selected="selected" value="'+aProvince[i]['id']+'">' + aProvince[i]['name'] + '</option>');
                    } else {
                        $(obj).find('.selProvince').append('<option  value="'+aProvince[i]['id']+'">' + aProvince[i]['name'] + '</option>');
                    }

                }
            }else{
                $(obj).find(".selProvince").append('<option  value="">请选择</option>');
            }

            var aaCity=getPcdData(url,default_province);
            if(!isEmpty(aaCity)){
                //console.log("asfd");
                for(let j  in aaCity){
                    //console.log(j+'---	'+aaCity[j]['id'] + '---' + aaCity[j]['name']);
                    if(j==0){
                        $(obj).find(".selCity").append('<option  value="">请选择</option>');
                    }
                    if (aaCity[j]['id'] == default_city) {
                        iNum2 = aaCity[j]['id'];

                        $(obj).find('.selCity').append('<option  selected="selected" value="'+aaCity[j]['id']+'">' + aaCity[j]['name'] + '</option>');
                    } else {
                        $(obj).find('.selCity').append('<option  value="'+aaCity[j]['id']+'">' + aaCity[j]['name'] + '</option>');
                    }

                }
            }else{
                $(obj).find(".selCity").append('<option  value="">请选择</option>');
            }

            var aaCountry=getPcdData(url,default_city);
            if(!isEmpty(aaCountry)){
                //console.log("asfd");
                for(let k  in aaCountry){
                    //console.log(k+'---	'+aaCountry[k]['id'] + '---' + aaCountry[k]['name']);
                    if(k==0){
                        $(obj).find(".selCountry").append('<option  value="">请选择</option>');
                    }
                    if (aaCountry[k]['id'] == default_country) {
                        //iNum2 = aaCountry[k]['id'];

                        $(obj).find('.selCountry').append('<option  selected="selected" value="'+aaCountry[k]['id']+'">' + aaCountry[k]['name'] + '</option>');
                    } else {
                        $(obj).find('.selCountry').append('<option  value="'+aaCountry[k]['id']+'">' + aaCountry[k]['name'] + '</option>');
                    }

                }
            }else{
                $(obj).find(".selCountry").append('<option  value="">请选择</option>');
            }
        }

        $(obj).find('.selProvince').change(function () {
            proOnChange(obj,$(this),pcdData,url);

        });
        $(obj).find('.selCity').change(function () {
            cityOnChange(obj,$(this),pcdData,url);

        });

    }

    //step02 插件的扩展方法名称
    $.fn.distpickerfeng = function (options) {
        // alert(options);
        //console.log("fs");

        //step03-b 合并用户自定义属性，默认属性
        var options = $.extend(defaults, options);
        // return showLink(this);
        //step4 支持JQuery选择器
        //step5 支持链式调用
        return this.each(function () {
            //step06-b 在插件里定义方法
            showLink(this,options);
        });
    };
})(jQuery);