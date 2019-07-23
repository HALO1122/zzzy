$(function () {
	var fsendMsg = JSON.parse(sessionStorage.getItem('fsendMsg'));
	
    $("#fplanLoadListTime").datetimePicker({
        title: '装车时间',
        min: new Date().Format("YYYY-MM-DD hh:mm"),
    });
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
    var code = getUrlParams("code");
    var token = getUrlParams("token");
    // var area=getUrlParams("area");
    var provincecode=getUrlParams("provincecode");
    var citycode=getUrlParams("citycode");
    var areaCode=getUrlParams("areaCode");
    var address=getUrlString("address");
    $("#fid").val(getUrlParams("fid"));
    $("#ftempOrderNo").val(getUrlParams("ftempOrderNo"));
    $("#freceiverCountyCode").val(getUrlParams("freceiverCountyCode"));
    $("#fsenderCountyCode").val(getUrlParams("fsenderCountyCode"));
    $("#fsenderAddress").val(getUrlString("fsenderAddress")).trigger("change");
    $("#fsenderMobile").val(getUrlParams("fsenderMobile"));
    $("#freceiverAddress").val(getUrlString("freceiverAddress"));
    $("#freceiverName").val(getUrlString("freceiverName"));
    $("#freceiverMobile").val(getUrlParams("freceiverMobile"));
    $("#floadListAdress").val(getUrlString("floadListAdress"));
    $("#funloadListAdress").val(getUrlString("funloadListAdress"));
    $("#ftruckLong").val(getUrlParams("ftruckLong"));
    /* $("#fplanLoadListTime").val(filtrationNull(data.fplanLoadListTime).replace(/-/g,"/").Format("yyyy-MM-dd"));*/
    $("#fplanLoadListTime").val(getUrlParams("fplanLoadListTime"));
    $("#fremark").val(getUrlString("fremark"));
    $("#fgoodsFee").val(getUrlParams("fgoodsFee"));
    $("#fcarriage").val(getUrlParams("fcarriage"));
    $("#fgoodsWeight").val(getUrlParams("fgoodsWeight"));
    $("#fgoodsName").val(getUrlString("fgoodsName"));
    $("#ftempOrderGoodsNo").val(getUrlParams("ftempOrderGoodsNo"));
    /*alert(area);*/
	// $("#fsenderAddress").on('click',function(){
	//     var params = new Object();
	//     params.type= 1;
	//     params.fid= $("#fid").val();
	//     params.ftempOrderNo= $("#ftempOrderNo").val();
	//     params.freceiverCountyCode= $("#freceiverCountyCode").val();
	//     params.fsenderCountyCode= $("#fsenderCountyCode").val();
	//     params.fsenderAddress= $("#fsenderAddress").val();
	//     params.fsenderMobile= $("#fsenderMobile").val();
	//     params.freceiverAddress= $("#freceiverAddress").val();
	//     params.freceiverName= $("#freceiverName").val();
	//     params.freceiverMobile=$("#freceiverMobile").val();
	//     params.floadListAdress= $("#floadListAdress").val();
	//     params.funloadListAdress= $("#funloadListAdress").val();
	//     params.fplanLoadListTime= $("#fplanLoadListTime").val();
	//     params.ftruckLong=$("#ftruckLong").val();
	//     params.fremark= $("#fremark").val();
	//     params.fgoodsFee= $("#fgoodsFee").val();
	//     params.fcarriage= $("#fcarriage").val();
	//     params.fgoodsWeight=$("#fgoodsWeight").val();
	//     params.fgoodsName=$("#fgoodsName").val();
	//     params.ftempOrderGoodsNo=$("#ftempOrderGoodsNo").val();
	//     params.area=1;
	//     params.token = token;
	//     jumpFunction(_path + "AreaTemp.html?v=1231",params);
	// });
	
	$("#freceiverAddress").on('click',function(){
	    var params = new Object();
	    params.type= 1;
	    params.fid= $("#fid").val();
	    params.ftempOrderNo= $("#ftempOrderNo").val();
	    params.freceiverCountyCode= $("#freceiverCountyCode").val();
	    params.fsenderCountyCode= $("#fsenderCountyCode").val();
	    params.fsenderAddress= $("#fsenderAddress").val();
	    params.fsenderMobile= $("#fsenderMobile").val();
	    params.freceiverAddress= $("#freceiverAddress").val();
	    params.freceiverName= $("#freceiverName").val();
	    params.freceiverMobile=$("#freceiverMobile").val();
	    params.floadListAdress= $("#floadListAdress").val();
	    params.funloadListAdress= $("#funloadListAdress").val();
	    params.fplanLoadListTime= $("#fplanLoadListTime").val();
	    params.ftruckLong=$("#ftruckLong").val();
	    params.fremark= $("#fremark").val();
	    params.fgoodsFee= $("#fgoodsFee").val();
	    params.fcarriage= $("#fcarriage").val();
	    params.fgoodsWeight=$("#fgoodsWeight").val();
	    params.fgoodsName=$("#fgoodsName").val();
	    params.ftempOrderGoodsNo=$("#ftempOrderGoodsNo").val();
	    params.area=2;
	    params.token = token;
	    jumpFunction(_path + "AreaTemp.html?v=1231",params);
		window.sessionStorage.setItem('fAddress', JSON.stringify('freceiverAddress'));
	});
	
	var area =  JSON.parse(sessionStorage.getItem('./AreaTemp.html'));
	var freceiverAddress = JSON.parse(sessionStorage.getItem('freceiverAddress'));
	// var fsenderAddress = JSON.parse(sessionStorage.getItem('fsenderAddress'));
	// if(fsenderAddress != '' && fsenderAddress != null){
	// 	$("#fsenderCountyCode").val(fsenderAddress.areaCode);
	// 	$("#fsenderAddress").val(fsenderAddress.address).change();
	// }
	if(area != '' && area != null){
		if(area.area==2){
			$("#freceiverCountyCode").val(freceiverAddress.areaCode);
			$("#freceiverAddress").val(freceiverAddress.address);
		}
    }
	
    var ftempOrderNo = getUrlParams("ftempOrderNo");
    //当发货地定位到位置的时候
    var postUrl = "/Wechat/TempOrder/TempOrderCreate";

    var myDate = new Date();
    $("#fplanLoadListTime").val(myDate.Format("yyyy-MM-dd hh:mm"));

    var initPage = function () {
        if (ftempOrderNo) {
            $("#submit-btn").attr("disabled", true);
            $("#title").text("运单修改");

            //获取信息并遍历
            postUrl = "/Wechat/TempOrder/TempOrderChange";
            var loadDate = {
                ftempOrderNo: ftempOrderNo,
                token: token,
                code: code,
                type: 1
            };
            _callWe_noUrl("1001006011",'/Wechat/TempOrder/TempOrderSearchByNo',loadDate,data=>{
				console.log(data)
                data = data.msgBody;
                if (data.staInfoCode) {
                    layer.msg(data.staInfo, {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        if (data.redirectUrl) {
                            var reUrl = data.redirectUrl;
                            if (data.token) {
                                var params = {
                                    "token": data.token
                                };
                                var param = JSON.stringify(params);
                                reUrl = reUrl + "?param=" + param
                            }
                            window.location.href = getConfig(reUrl);
                        }
                    });
                }
                else {
                    var da =filtrationNull(data.fplanLoadListTime).replace(/-/g,"/").substring(0,10);
                    $("#fid").val(filtrationNull(data.fid));
                    $("#ftempOrderNo").val(filtrationNull(data.ftempOrderNo));
                    $("#freceiverCountyCode").val(filtrationNull(data.freceiverCountyCode));
                    $("#fsenderCountyCode").val(filtrationNull(data.fsenderCountyCode));
                    $("#fsenderAddress").val(filtrationNull(data.fsenderAddress)).trigger("change");
                    $("#fsenderMobile").val(filtrationNull(data.fsenderMobile));
                    $("#freceiverAddress").val(filtrationNull(data.freceiverAddress));
                    $("#freceiverName").val(filtrationNull(data.freceiverName));
                    $("#freceiverMobile").val(filtrationNull(data.freceiverMobile));
                    $("#floadListAdress").val(filtrationNull(data.floadListAdress));
                    $("#funloadListAdress").val(filtrationNull(data.funloadListAdress));
                    $("#ftruckLong").val(filtrationNull(data.ftruckLong));
                    /* $("#fplanLoadListTime").val(filtrationNull(data.fplanLoadListTime).replace(/-/g,"/").Format("yyyy-MM-dd"));*/
                    $("#fplanLoadListTime").val(da);
                    $("#fremark").val(filtrationNull(data.fremark));
                    if(area==1){
                        $("#freceiverCountyCode").val(getUrlParams("freceiverCountyCode"));
                        $("#freceiverAddress").val(getUrlString("freceiverAddress"));
                        $("#fsenderCountyCode").val(areaCode);
                        $("#fsenderAddress").val(address).trigger("change");
                    }else if(area==2){
                        $("#fsenderCountyCode").val(getUrlParams("fsenderCountyCode"));
                        $("#fsenderAddress").val(getUrlString("fsenderAddress")).trigger("change");
                        $("#freceiverCountyCode").val(areaCode);
                        $("#freceiverAddress").val(address);
                    }else{

                    }
                    if (data.goods) {
                        var good = data.goods[0];
                        if (good) {
                            $("#fgoodsName").val(filtrationNull(good.fgoodsName));
                            $("#fgoodsFid").val(filtrationNull(good.fid));
                            $("#ftempOrderGoodsNo").val(filtrationNull(good.ftempOrderGoodsNo));
                            $("#fgoodsWeight").val(filtrationNull(good.fgoodsWeight));
                        }
                    }
                    if (data.orderFee) {

                        $("#forderFeeNo").val(filtrationNull(data.orderFee.ftempOrderNo));
                        $("#orderFeeFid").val(filtrationNull(data.orderFee.fid));
                        $("#fcarriage").val(filtrationNull(data.orderFee.fcarriage));
                        $("#fgoodsFee").val(filtrationNull(data.orderFee.fgoodsFee));
                    }
                    $("#submit-btn").attr("disabled", false);
                }
            })
        }
    }
    initPage();
    jQuery.extend(jQuery.validator.messages, {
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("最多 {0}个字符"),
        minlength: jQuery.validator.format("最少是 {0} 的字符"),
        rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为{0} 的值"),
        min: jQuery.validator.format("请输入一个最小为{0} 的值"),
        required: "此项必填"
    });


    $('#validation-form').validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        //title versionNo url natureNo  contents
        rules: {
            fsenderAddress: {required: true},
            fsenderMobile: {required: true, maxlength: 15},
            freceiverAddress: {required: true},
            freceiverMobile: { maxlength: 15},
            floadListAdress: {required: true},
            funloadListAdress: {required: true},
            fplanLoadListTime: {required: true},
            fgoodsName: {required: true},
            fgoodsWeight: {required: true},
            orderFee: {number: true, required: true},
            fgoodsFee: {number: true},
            ftruckLong:{required: true},
            fcarriage: { number: true}
        },
        messages: {
            maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串")
        },
        highlight: function (e) {
            $(e).closest('.weui_cells').removeClass('has-info').addClass('has-error');
        },
        success: function (e) {
            $(e).closest('.weui_cells').removeClass('has-error');
            $(e).remove();
        },
        errorPlacement: function (error, element) {
            erroPlacementDone(error, element);
        },
        //按钮提交事件处理
        submitHandler: function (form) {
            submintHandlerDone(form);
            return false;
        },
        invalidHandler: function (form) {
        }
    });

    function erroPlacementDone(error, element) {
        if (element.is(':checkbox') || element.is(':radio')) {
            var controls = element.closest('div[class*="col-"]');
            if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
            else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
        }
        else if (element.is('.select2')) {
            error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
        }
        else if (element.is('.chosen-select')) {
            error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
        }
        else error.insertAfter(element.parent());
    }

    //提交事件处理方法
    /*$("#submit-btn").on('click',function(){
        $("#submit-btn").attr("disabled","disabled");
    });*/
    function submintHandlerDone(form) {
        var $form = $("#validation-form");
        var $btn = $("#submit-btn");
        //手机号码、身份证号码/驾驶证号验证
        //身份证号码 和 驾驶证号 一般情况下是一样的。但有一种情况,就是15位和18位的问题：
        //比如身份证可能是18位的(刚换新的),但驾驶证可能是15位的,原来办的,还没到期换证，就可能不一样。
        var freceiverMobile = $("#freceiverMobile").val();
        var fsenderMobile = $("#fsenderMobile").val();


        var mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;

        if($("#fplanLoadListTime").val() ==""){
            layer.alert('日期时间不能为空！');
            return false;
        }
        if($("#fgoodsName").val() ==0){
            layer.alert('货物名称不能为0！');
            return false;
        }
        if($("#fgoodsWeight").val() ==0){
            layer.alert('货物重量不能为0！');
            return false;
        }

        var fplanLoadListTime = $("#fplanLoadListTime").val();
        var loadListTime = new Date(fplanLoadListTime);
        if (loadListTime.getTime() <= (new Date().getTime()- 1 * 24 * 60 * 60 * 1000)){
            layer.alert('时间不能早于当前时间！');
            return false;
        }
        //校验金额不能小于0 时间不能在当前时间之前 fgoodsWeight fcarriage fgoodsFee
        var fgoodsWeight = $("#fgoodsWeight").val();
        if (!checkNm(fgoodsWeight)) {
            layer.alert('重量必须大于0！');
            return false;
        }
        var ftruckLong=$("#ftruckLong").val();
        if(ftruckLong==""){
            layer.alert('请选择车辆长度');
            return false;
        }
        $("#submit-btn").attr("disabled","disabled");
        postDone();
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
        var goodsInfo = new Object();
        goodsInfo.fgoodsName = $("#fgoodsName").val();
        if ($("#fgoodsFid").val()) {
            goodsInfo.fid = $("#fgoodsFid").val();
        }
        if ($("#ftempOrderGoodsNo").val()) {
            goodsInfo.ftempOrderGoodsNo = $("#ftempOrderGoodsNo").val();
        }
        goodsInfo.fgoodsWeight = $("#fgoodsWeight").val();
        var goodsInfos = new Array();
        goodsInfos.push(goodsInfo);
        var orderFeeInfo = new Object();
        if ($("#forderFeeNo").val()) {
            orderFeeInfo.ftempOrderNo = $("#forderFeeNo").val();
        }
        if ($("#orderFeeFid").val()) {
            orderFeeInfo.fid = $("#orderFeeFid").val();
        }
        orderFeeInfo.fcarriage = isNull($("#fcarriage").val());
        orderFeeInfo.fgoodsFee = isNull($("#fgoodsFee").val());
		
        var submitData = {
            token: token,
            type: 1,
            code: code,
            fid: isNull($("#fid").val()),
            ftempOrderNo: isNull($("#ftempOrderNo").val()),
            freceiverCountyCode: isNull($("#freceiverCountyCode").val()),
            fsenderCountyCode: fsendMsg.fsenderCountyCode,
            fsenderAddress: fsendMsg.fsenderAddress,
            fsenderMobile: isNull($("#fsenderMobile").val()),
            freceiverAddress: isNull($("#freceiverAddress").val()),
            freceiverName: isNull($("#freceiverName").val()),
            freceiverMobile: isNull($("#freceiverMobile").val()),
            floadListAdress: isNull($("#floadListAdress").val()),
            funloadListAdress: isNull($("#funloadListAdress").val()),
            fplanLoadListTime: isNull($("#fplanLoadListTime").val()),
            ftruckLong : isNull($("#ftruckLong").val()),
            ftempOrderGoodsNo : isNull($("#ftempOrderGoodsNo").val()),
            fremark : isNull($("#fremark").val()),
            orderFee: orderFeeInfo,
            goods: goodsInfos
        };
        //POST提交处理
        _callWe_noUrl('1001006014','/Wechat/TempOrder/TempOrderCreate',submitData,data=>{
            if (data.msgBody.sta == 'ok') {
                $.toast('发布成功',()=>{
                    jumpFunction(_path + "TempOrderSearchStatus.html");
                })
            }else {
                $.toast('data.msgBody.staInfo',()=>{
                    jumpFunction(_path + "TempOrderSearchStatus.html");
                })
            }
        })
    }
    
    $("#cancel").click(function(){
        var params = new Object();
        params.type = 1;
        jumpFunction(_path + "TempOrderSearchStatus.html?v=12",params)
    });

    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"发布",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                submintHandlerDone();
            }}
        ]
    });
    // $("#fplanLoadListTime").on('click',function(){
    //     $("#fplanLoadListTime").attr("type","date");
    //     $("#fplanLoadListTime").val(myDate.Format("yyyy-MM-dd"));
    // })
});
$("#fsenderAddress").on("change",function(){
    if($(this).val()){
        $(this).attr("type","text");
        $("#loading").remove();
    }
})
function isNull(value){
    if(value) return value;
    return 0;
}


