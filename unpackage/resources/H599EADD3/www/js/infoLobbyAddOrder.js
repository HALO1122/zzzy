$(function () {
    var params = {};

    $("#ftruckLong").select({
        title: "选择车长",
        multi: true,
        items: [
            {
                title: "零担",
                value: 0.0
            },
            {
                title: "4.2",
                value: 4.2
            },
            {
                title: "6.8",
                value: 6.8
            },
            {
                title: "9.6",
                value: 9.6
            },
            {
                title: "13",
                value: 13
            },
            {
                title: "16",
                value: 16
            },
            {
                title: "17.5",
                value: 17.5
            },
        ]
    })
    var myDate = new Date();
    $("#fplanLoadListTime").datetimePicker({
        title: '装车时间',
        min: myDate.Format("YYYY-MM-DD hh:mm"),
    });
    initPage();
    function initPage(){
        var area = getUrlParams("area");
        var address = getUrlParams("address");
        $("#fgoodsName").val(getUrlParams("fgoodsName"));
        $("#fgoodsWeight").val(getUrlParams("fgoodsWeight"));
        $("#ftruckLong").val(getUrlParams("ftruckLong"));
        $("#fsenderTel").val(getUrlParams("fsenderTel"));
        $("#ffhrName").val(getUrlParams("ffhrName"));
        $("#ffee").val(getUrlParams("ffee"));
        $("#fremark").val(getUrlParams("fremark"));
        $("#fsenderSite").val(getUrlParams("fsenderSite"));
        $("#freceiverSite").val(getUrlParams("freceiverSite"));
        //判断时间是否有值
        if(getUrlParams("fplanLoadListTime")){
            $("#fplanLoadListTime").val(getUrlParams("fplanLoadListTime"));
        }else{
            $("#fplanLoadListTime").val(myDate.Format("yyyy-MM-dd hh:mm"));
        }
        if(area == "1"){
            $("#fsenderSite").val(getUrlParams("address"));
        }else if(area == "2"){
            $("#freceiverSite").val(getUrlParams("address"));
        }
        /*alert(area);*/

        $("#fsenderSite,#freceiverSite").click(function(){
            params = {};
            params.fsenderSite = $("#fsenderSite").val();
            params.freceiverSite = $("#freceiverSite").val();
            params.fgoodsName = $("#fgoodsName").val();
            params.fgoodsWeight = $("#fgoodsWeight").val();
            params.ftruckLong = $("#ftruckLong").val();
            params.fplanLoadListTime = $("#fplanLoadListTime").val();
            params.fsenderTel = $("#fsenderTel").val();
            params.ffhrName = $("#ffhrName").val();
            params.ffee = $("#ffee").val();
            params.fremark = $("#fremark").val();
            if($(this).attr("id") == "fsenderSite"){
                params.area = "1";
            }else{
                params.area = "2";
            }
            jumpFunction(_path + "infoLobbyAreaTemp.html?v=123",params);
        })

        //提交事件处理方法
        $("#submit-btn").on('click',function(){
            submintHandlerDone()
        });
        function submintHandlerDone() {
            var isNull = true;
            $(".must").each(function(i,v){
                if(!$(v).parents(".weui-cell__hd").next().children().val()){
                    layer.alert("请填写"+$(v).parent().children(".inputName").text())
                    isNull = false;
                    return false;
                }
            })
            if(isNull){
                $("#submit-btn").attr("disabled","disabled");
                //表单参数封装后传递至controller
                postDone();
            }
        }

        function checkNm(value) {
            if (!value) {
                return false;
            }
            try {
                return parseInt(value) > 0;
            } catch (e) {
                return false;
            }
        }

        //数据提交到后台
        function postDone() {
            var data = {
                "msgId":"1001004000",
                "serId":0,
                "type":1,
                "key":0,
                "source":1,
                "msgBody":{
                    "fshrName":"",
                    "fshrTel":"",
                    "ffee":$("#ffee").val()?$("#ffee").val():"0",
                    "farriveTime":new Date().Format("yyyy-MM-dd"),
                    "ffhrSite": $("#fsenderSite").val(),
                    "fshrSite": $("#freceiverSite").val(),
                    "fname": $("#fgoodsName").val(),
                    "fplanLoadListTime": $("#fplanLoadListTime").val(),
                    "fweight": $("#fgoodsWeight").val(),
                    "fsize": $("#ftruckLong").val(),
                    "ffhrName": $("#ffhrName").val(),
                    "ffhrTel": $("#fsenderTel").val(),
                    "fremark": $("#fremark").val(),
                }
            }
            _callWe("1001004000","/Basic/WlwlMessageAdd",data['msgBody'],data=>{
                if (data.msgBody.sta == "ok") {
                    layer.msg(data.msgBody.staInfo, {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        jumpFunction(_path + "infoLobby.html",params);
                        $("#submit-btn").attr("disabled","disabled");
                    });
                }else if(data.msgBody.sta == "bzz"){
                    $.confirm("尚未注册货主，点击确认前去注册。", "尚未注册！", function() {
                       window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8982157bedbc8324&redirect_uri=http://zzzy.56ps.cn/WeChart/MenuPersonalCenter/wx8982157bedbc8324&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                    });
                } else{
                    layer.alert("网络异常，请重试！")
                    $("#submit-btn").removeAttrs("disabled");
                }
            })
        }
        $("#cancel").click(function(){
            var params = new Object();
            params.type = 1;
            jumpFunction(_path + "infoLobby.html",params)
        });
    }
});