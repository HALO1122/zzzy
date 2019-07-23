(function ($) {
    $.fn.chooseCity = function (info) {
        var defaultInfo = {
            complate: function (data) {
            },
            beforeChoose: function () {
            },
            afterChoose: function (data) {
            },
            showDiv: "",//弹出层div
            cityPicker: null,
            geocoder: null,
            openIndex: null,
            searchInfput: "",//搜索框
            autocomplete: null,
            appenList: "",
            self: $(this),
            cityInfo: "",
            addressInfo:""
        }
        return this.each(function () {
            var option = $.extend(defaultInfo, info);


            var cityPickerShow = function () {
                option.cityPicker.show();
                $("a[class='closebtn']").bind("click",function(){
                    $("#validation-form").attr("style","display:block");
                });
            }

            var cityPickerHiden = function () {
                option.cityPicker.hide();
            }
            var initMapPicjk = function () {
                if (!option.cityPicker) {
                    AMapUI.setDomLibrary(Zepto);
                    AMapUI.loadUI(['misc/MobiCityPicker'], function (MobiCityPicker) {

                        option.cityPicker = new MobiCityPicker({
                            //topGroups: ..., // 顶部城市列表
                        });

                        //监听城市选中事件
                        option.cityPicker.on('citySelected', function (cityInfo) {
                            //隐藏城市列表
                            cityPickerHiden();
                            //选中的城市信息
                            afterCityChoose(cityInfo);
                        });
                        // option.cityPicker.on('onCancle', function (cityInfo) {
                        //    alert(1111);
                        // });
                        // option.cityPicker.on('cancle', function (cityInfo) {
                        //     alert(1111);
                        // });
                        // option.cityPicker.on('close', function (cityInfo) {
                        //     alert(1111);
                        // });

                        cityPickerShow();

                        //显示城市列表，可以用某个click事件触发
                    });
                }else{
                    cityPickerShow();
                }
            }
            $(this).bind("click", function () {
                option.beforeChoose();
                initMapPicjk();
            })
            //城市选择之后操作
            var afterCityChoose = function (cityInfo) {
                $("#validation-form").attr("style","display:block");
                initNextInfo(cityInfo);
            }

            var showNext = $(option.showDiv).html();
            var initNextInfo = function (cityInfo) {
                $(option.showDiv).empty();
                $(option.showDiv).append(showNext);
                option.openIndex = layer.open({
                    type: 1,
                    area: ['100%', '100%'],
                    title: false,
                    closeBtn: 0,
                    shade: 1,
                    zIndex: 210,
                    case: false,
                    fix: true, //不固定
                    content: $(option.showDiv),
                    success: function (layero) {
                        mapSeachInit(cityInfo);
                        loadingMapPlace(cityInfo);
                        $("#cancelChoose").bind("click", function () {
                            layer.closeAll();
                        })

                    }
                });
            }

            var mapSeachInit = function (cityInfo) {

                AMap.plugin(['AMap.Autocomplete'], function () {
                    var autoOptions = {
                        city: cityInfo.name
                    };
                    option.autocomplete = new AMap.Autocomplete(autoOptions);
                });
                // var mapObj = new AMap.Map('iCenter');
                // mapObj.plugin(["AMap.Geocoder"], function () {
                //     option.geocoder = new Geocoder({
                //         city: "010",
                //         batch: true
                //     });
                //
                //     option.geocoder.setCity(cityInfo.name);
                //     console.info(option.geocoder)
                // });


            }
            var temp = $(option.appenList).html();
            var loadingMapPlace = function (cityInfo) {
                // $(option.searchInfput).val(cityInfo.name);
                /*  $(option.searchInfput).bind("change paste keyup", function () {
                      loadAction();
                  })*/

                $(option.appenList).empty();
                $(option.appenList).show();

                $(option.searchInfput).val(cityInfo.name);
                loadAction(cityInfo);
                $(option.searchInfput).get(0).addEventListener('input', function () {
                    loadAction(cityInfo);
                });
            }

            var loadAction = function (cityInfo) {

                var prvEndValue = $(option.searchInfput).val();
                $(option.appenList).empty();
                if(!option.autocomplete){
                    mapSeachInit(cityInfo);
                }
                if(option.autocomplete){
                    option.autocomplete.search(prvEndValue, function (status, result) {
                        var tips = result.tips;
                        if (tips == undefined) {
                            return;
                        }
                        for (var i = 0; i < tips.length; i++) {

                            if (tips[i].id == "") {
                                continue;
                            }
                            var tip = tips[i];
                            var echNode = temp.format(cityInfo.name, tip.name, tip.district, tip.address);
                            var echNodeback = $(option.appenList).append(echNode);
                            $(echNodeback).find("li:last").bind("click", function () {
                                getCityInfo(this);
                                // /getCityInfo(cityInfo.name, tip.name, tip.district, tip.address);
                            })
                        }

                    });

                }

            }
            var appenValue = function (title, district, address) {

                $(option.self).val(district);
                $(option.addressInfo).val(address + title);

            }
            var getCityInfo = function (node) {
                var valueInput = $(node).find("input:hidden");
                var cityName = $(valueInput).val();
                var tipName = $(valueInput).attr("tipName");
                var district = $(valueInput).attr("district");
                var address = $(valueInput).attr("address");
                var geocoder = new AMap.Geocoder({
                    city: "010", //城市，默认：“全国”
                    batch: true
                });
                geocoder.setCity(cityName);
                geocoder.getLocation(district + address, function (status, geocodeResult, adCode) {
                    if (status === 'complete' && geocodeResult.info === 'OK') {
                        var result = geocodeResult.geocodes[0];
                        var cityInfo = result.addressComponent.province + "-"
                            + result.addressComponent.city + "-"
                            + result.addressComponent.district;
                        appenValue(tipName, cityInfo, address);
                        option.afterChoose(result);
                    } else {
                        layer.msg("获取位置信息失败", {
                            icon: 2,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, function () {
                            layer.closeAll();
                        });
                    }

                });

                layer.closeAll();
            }
        })
    }


})(jQuery);