(function ($) {
    $.fn.ajaxData2HtmlHandler = function (option) {
        option = $.extend({
            success: function (data) {
                handleInfoDispatcher(data);
            },
            beforRequest: function () {
                return true;
            },
            async: true,
            url: "",
            data: "",
            type: "post",
            dataType: "json",
            timeout: 5000, //超时时间设置，单位毫秒
            handleInfoType: 0,
            handSelf: false,
            timeoutFct: function () {
                timeOutFunction();
            },
            afterRequest: function (data) {
            }
        }, option);

        var requestHandler = function () {
            if (option.beforRequest()) {
                $.ajax({
                    url: option.url,
                    async: option.async,
                    type: option.type,
                    timeout: option.timeout,
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            option.timeoutFct();
                        }
                    },
                    dataType: option.dataType,
                    data: option.data,
                    success: function (data) {
                        console.info(data);
                        if (option.handSelf) {
                            option.afterRequest(data);
                        } else {
                            option.success(data);
                        }


                    }
                })
            }

        }
        //根据类型选择操作类型
        var handleInfoDispatcher = function (data) {
            switch (option.handleInfoType) {
                case 1:
                    handleInfo2Form(data);
                    break;
                case 2:
                    handleInfo(data);
                    break;
                default:
                    defaultInfoHandle(data);
            }
        }
        //处理form中的参数赋值
        var handleInfo2Form = function (data) {
            if (data) {
                setValueByName(data)
            }
        }
        var setValueByName = function (data) {

        }
        var handleInfo = function (data) {
            var temp = $(this).html();
            $(this).empty();
            if (data) {
                if (data.staInfoCode == "0") {
                    if (data.dataInfo) {
                        var infos = data.dataInfo;
                        if (infos instanceof Array && infos.length > 0) {
                            initInfoByArray(infos);
                        } else {
                            initInfoBySingle(infos);
                        }
                    }
                } else {

                }
            } else {
                layer.msg("服务器繁忙，请稍后重试", {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //history.back();
                });
            }

        }
        var initInfoByArray = function (data) {
            $.each(data, function (index, node) {

                initValueByTemp(node);
                //temp.format(node)
            })
            $(this).show();
        }

        var initInfoBySingle = function (data) {

        }

        var timeOutFunction = function () {
            layer.msg("服务器繁忙，请稍后重试", {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                //history.back();
            });
        }

        var initValueByTemp = function (singleData) {
            // $(temp).children().each(function (index, node) {
            //     console.info(node);
            // })
            // $(this).append(temp.format(node));
        }
        var defaultInfoHandle = function (data) {
            if (data.staInfoCode == 0) {
                if (data.redirectUrl) {
                    var params = {
                        "token": data.token
                    }
                    var param = JSON.stringify(params);
                    window.location.href = getConfig(data.redirectUrl + "?param=" + param);
                }
            } else {
                layer.msg(data.staInfo, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    if (data.redirectUrl) {
                        var params = {
                            "token": data.token
                        }
                        var param = JSON.stringify(params);
                        window.location.href = getConfig(data.redirectUrl + "?param=" + param);
                    }
                });
            }
        }
        requestHandler();
        return this;
    }
})(jQuery);