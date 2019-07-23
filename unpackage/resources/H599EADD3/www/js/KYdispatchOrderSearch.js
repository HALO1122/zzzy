/**
 * Created by Administrator on 2017/8/21.
 */
var parama = new Object();
var fplanLoadListTime;
var iphoneDate;
var code = getUrlParams("code");
var token = getUrlParams("token");
var freceiverProvinceCode = getUrlParams("freceiverProvinceCode");
var freceiverCityCode = getUrlParams("freceiverCityCode");
var freceiverCountyCode = getUrlParams("freceiverCountyCode");
var fsenderProvinceCode = getUrlParams("fsenderProvinceCode");
var fsenderCityCode = getUrlParams("fsenderCityCode");
var fsenderCountyCode = getUrlParams("fsenderCountyCode");
var fdispatchOrderStatus = "1";
var fsenderCityCodeName = getUrlString("fsenderCityCodeName");
var freceiverCityCodeName = getUrlString("freceiverCityCodeName");
var loading = false;  //状态标记
var pageNo = 0;
var pageSize = 7;
$(function () {
    onloadSearch();
    //滚动加载
    $(".js_show").infinite().on("infinite", function() {
        if(loading) return;
        else{
            loading = true;//将状态该为true
            $("#loading").removeClass("hide");
            var time = $("#shijian").val();
            searchByTime(time)
        }
    });
    //底部tobar
    new setTobar();
    $("#container").css("margin-top",$(".topText").height()+"px")
});

function onloadSearch(){
    var date = new Date().Format("yyyy-MM-dd");
    //获取codessss
    fplanLoadListTime = getUrlParams("fplanLoadListTime");
    $("#shijian").calendar({
        dateFormat:"yyyy-mm-dd",
        value:[date],
        "onClose":timeOnClose
    });
    $("#senderSite").cityPicker({
        "onClose":senderOnClose,
        showDistrict:false
    });
    $("#receiverSite").cityPicker({
        "onClose":receiverOnClose,
        showDistrict:false
    });
    $("body").on("click",function(e){
        if($(e.target).hasClass("noTime")){
            $("#shijian").val("时间不限").calendar("close");
        }
    })
    if(fplanLoadListTime && fplanLoadListTime!="时间不限"){
        //当查询时间存在时
        iphoneDate = fplanLoadListTime.replace(/-/g,"/");
        $("#shijian").val(new Date(iphoneDate).Format("yyyy-MM-dd"));
    }else{
        //默认时间不限制
        iphoneDate="";
        $("#shijian").val("时间不限");
    }

    searchByTime(fplanLoadListTime);
    if (fsenderCityCodeName == "") {
        $("#senderSite").val("全部 不限");
    } else {
        $("#senderSite").val(fsenderCityCodeName);
    }
    if (freceiverCityCodeName == "") {
        $("#receiverSite").val("全部 不限");
    } else {
        $("#receiverSite").val(freceiverCityCodeName);
    }
    $("#fplateNo").find("option:selected").attr("emoney");
    $("#dislog_quxiao").on('click', function () {
        $('#Dialog').css({"opacity": "1", "display": "none"});
        $("#shijiyunfei").val("");
    })
}

let nowDate,line,year,month,day,miao,fendTime ='';
function qurenbtn(obj) {
    $('#Dialog').css({"opacity": "1", "display": "block"});
    $('#Dialog').fadeIn(200);
    $("#fplateNo").empty();
    var aa = $(obj).parent().prev().attr("ftempOrderNo");
    //该运费取值有问题
    // var yunfei = $(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:last-child").children(".weui-form-preview__value").text();
    // $("#zhidaoyunfei").text(yunfei);
    $("#tijiao_fdispatchOrderNo").text(aa);
    // $.ajax({
    //     url: "/Wechat/Basic/TruckSearch",
    //     type: "post",
    //     dataType: "json",
    //     data: {"code": code, "type": 2, "token": token},
    //     success: function (data) {
    //         initNoInfo(data);
    //     }
    // });
    _callWe_noUrl("1001006024","/Wechat/Basic/TruckSearch",{},data=>{
        searchInfo(data,()=>{
            initNoInfo(data.msgBody.pageOutBody.pageObjBody);
        },true);
    })
    var initNoInfo = function (data) {
        if (data) {
            var backHtml = "";
            $.each(data, function (index, node) {
                backHtml = "<option value='" + node.ftruckNo + "' emoney='" + node.fdepartmentNo + "'>" + node.fplateNo + "</option>";
                $("#fplateNo").append(backHtml)
            })
        }
    };
	
	nowDate = new Date();
	line = '-'; year = nowDate.getFullYear(); month = nowDate.getMonth()+1; day = nowDate.getDate(); miao = '23:59:59';
	if(month >= 1 && month < 10){
		month = "0"+month
	}
	if(day >= 1 && day < 10){
		day = "0"+day
	}
	fendTime = year+line+month+line+day+' '+miao;
	let sendObj = {
		"fcompanyId": 3,
		"fjobNo": "",
		"frealName": "",
		"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
	};
    _callWe_noUrl("1001001308","/Basic/StaffInfoSelectSearch",sendObj,data=>{
        searchInfo(data,()=>{
        initNoInfo2(data.msgBody.pageOutBody.pageObjBody);
        _callWe_noUrl('1001006068','/WeChart/CzIsDriver',{},_data=>{
            if(_data.msgBody && !_data.msgBody.sta){
            if(_data.msgBody['isDriver'] != "0"){
                $("#fstaffNo").val(_data.msgBody['staff'].fstaffNo);
            }
        }
    });
    },true);
})
    var initNoInfo2 = function (data) {
        if (data) {
            var backHtml = "";
            $.each(data, function (index, node) {
				// console.log(node)
                backHtml = "<option value='" + node.fstaffNo + "'>" + node.frealName + "</option>";
                $("#fstaffNo").append(backHtml)
            })
        }
    };
}

function tijiao_submit() {
    var ftempOrderNo = $("#tijiao_fdispatchOrderNo").text();//运单编号
    var fdepartmentNo = $("#fplateNo").find("option:selected").attr("emoney");//车主编号
    var ftruckNo = $("#fplateNo").val();//所属车辆编号
    var fstaffNo = $("#fstaffNo").val();//驾驶员编号
    var fsjyf = $("#shijiyunfei").val();
    $(this).attr("disabled","disabled");
    if (fdepartmentNo == null) {
        layer.alert("请选择车辆");
    }else if (fsjyf == "") {
        layer.alert("运费报价不能为空");
    }
    else {
  
        var sendObj = {
            "ftempOrderNo": ftempOrderNo,
            "fdepartmentNo": fdepartmentNo,
            "ftruckNo": ftruckNo,
            "fsjyf": fsjyf,
            "fstaffNo":fstaffNo
        };
        _callWe_noUrl('1001006026','/Wechat/Dispatch/DispatchCenter',sendObj,data=>{
            searchInfo(data,()=>{
                data = data.msgBody;
                if (data.staInfoCode == 0) {
                    $.toast('抢单成功！',function(){
                        jumpFunction(_path + "DispatchOrderSearchByCz.html", parama);
                        //跳转页面有车主运单页面改为 驾驶员 运单页面
                        // jumpFunction(_path + "wccyrLoadListSearch.html", parama);
                    })
                } else {
                    $(this).attr("disabled","false");
                    layer.alert(data.staInfo);
					$.toast(data.staInfo)
                    $('#Dialog').css({"opacity": "1", "display": "none"});
                }
            })
        })
    }
}

function searchByTime(fplanLoadListTime) {
    if(fplanLoadListTime=="时间不限" || fplanLoadListTime.indexOf("N")>-1){
        fplanLoadListTime="2016-12-01";
    }else if(fplanLoadListTime == ""){
        //当用户选择时间不限时  查询全部运单 时间设置为比较远的时间
        fplanLoadListTime = "2016-12-01"
    }
    // $.ajax({
    //     url: "/Wechat/DispatchOrder/DispatchOrderSearch",
    //     type: "post",
    //     dataType: "json",
    //     data: {
    //         "code": code,
    //         "type": 2,
    //         "token": token,
    //         "fplanLoadListTime": fplanLoadListTime,
    //         "freceiverProvinceCode": freceiverProvinceCode,
    //         "freceiverCityCode": freceiverCityCode,
    //         "freceiverCountyCode": freceiverCountyCode,
    //         "fdispatchOrderStatus": fdispatchOrderStatus,
    //         "fsenderProvinceCode": fsenderProvinceCode,
    //         "fsenderCityCode": fsenderCityCode,
    //         "fsenderCountyCode": fsenderCountyCode,
    //         "pageSize":pageSize,
    //         "pageNo":pageNo
    //     },
    //     success: function (data) {
    //         initPageInfo(data);
    //     }
    // });
    var sendObj = {
        "fplanLoadListTime": fplanLoadListTime,
        "freceiverProvinceCode": freceiverProvinceCode,
        "freceiverCityCode": freceiverCityCode,
        "freceiverCountyCode": freceiverCountyCode,
        "ftempOrderStatus": fdispatchOrderStatus,
        "fsenderProvinceCode": fsenderProvinceCode,
        "fsenderCityCode": fsenderCityCode,
        "fsenderCountyCode": fsenderCountyCode,
        "pageSetBody" : {
            "pageSize":pageSize,
            "pageNo":pageNo
        }
    }
    _callWe_noUrl("1001006061","/Wechat/TempOrder/tempOrderSearchByCz",sendObj,data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody.pageOutBody.pageObjBody);
        },true)
    })
    // $("#dispatchorder").empty();
    var initPageInfo = function (data) {
        loading = false;
        if (data!="") {
            pageNo++;
            $.each(data, function (index, node) {

                var backHtml = "",fsenderAddress="",freceiverAddress="";
                //遍历货物,计算总重
                var fgoodsWeight = 0;
                for (var i = 0; i < node.goods.length; i++) {
                    fgoodsWeight += node.goods[i].fgoodsWeight;
                }
                fgoodsWeight+="t";
                //超长超宽
                var maxLengthWidth = '';
                if (node.fgoodsMaxLength != null || node.fgoodsMaxWidth != null || node.fgoodsMaxHeight) {
                    if (node.fgoodsMaxLength == null) {
                        maxLengthWidth += '无'
                    } else {
                        maxLengthWidth += node.fgoodsMaxLength;
                    }
                    if (node.fgoodsMaxWidth == null) {
                        maxLengthWidth += ',无,'
                    } else {
                        maxLengthWidth += ',' + node.fgoodsMaxWidth + ',';
                    }
                    if (node.fgoodsMaxHeight == null) {
                        maxLengthWidth += '无'
                    } else {
                        maxLengthWidth += node.fgoodsMaxHeight;
                    }
                } else {
                    maxLengthWidth = '无';
                }
                var carriage;
                if(node.orderFee==null){
                    carriage='无';
                }else{
                    if(node.orderFee.fcarriage==null){
                        carriage='无';
                    }else{
                        carriage=filtrationNull(node.orderFee.fcarriage);
                    }
                }
                var fgoodsFee='';
                if(node.orderFee==null){
                    fgoodsFee='无';
                }else{
                    if(node.orderFee.fgoodsFee==null){
                        fgoodsFee='无';
                    }else{
                        fgoodsFee=node.orderFee.fgoodsFee;
                    }
                }
                if(node.fsenderAddress){
                    fsenderAddress=node.fsenderAddress.split("-");
                    fsenderAddress = fsenderAddress[1]+"-"+fsenderAddress[2]
                }
                if(node.freceiverAddress){
                    freceiverAddress=node.freceiverAddress.split("-");
                    freceiverAddress = freceiverAddress[1]+"-"+freceiverAddress[2]
                }
                var time = filtrationNull(node.fplanLoadListTime).replace(/-/g, "/").substring(0, 19);
                backHtml+="<div class=\"weui-form-preview__bd\" ftempOrderNo="+node.ftempOrderNo+">";
                backHtml+="<div class=\"weui-form-preview__item\" style=\"display: flex;justify-content: space-between\"><span class=\"weui-form-preview__value\">" + fsenderAddress + "=>" + freceiverAddress + "</span><span>" + fgoodsWeight + "</span></div>";

                backHtml+=" <div class=\"weui-form-preview__item timeLine\">";
                backHtml+="<div><p class=\"weui-form-preview__value\">"+node.ftruckLong + 'm'+"</p></div>";
                backHtml+="<div><span class=\"weui-form-preview__value\">"+time+"</span></div>";
                backHtml+="</div>";

                backHtml+="</div> <div class=\"weui-form-preview__ft\">";
                backHtml+="<a type=\"submit\" class=\"weui-form-preview__btn weui-form-preview__btn_primary\" href=\"javascript:\" onclick=\"qurenbtn(this)\" style=\"border-bottom:1px solid #888;\">确认抢单</a>";
                backHtml+="<a class=\"weui-form-preview__btn weui-form-preview__btn_default\" name=\"tel\" href=\"javascript:\" style=\"border-bottom:1px solid #888;\">联系客服</a> </div>";


                $("#dispatchorder").append(backHtml);
                $("a[name='tel']").attr("href", config.tel);
                $(".weui-form-preview__bd").click(function(){
                    searchbyno(this)
                })
            })
        } else {
            $("#loading").addClass("hide");
            if(!$("#dispatchorder").children(".noOrder").length>0){
                $(".js_show").destroyInfinite();
                var backHtml = `<div class="noOrder">没有更多运单了</div>`
                $("#dispatchorder").append(backHtml);
            }
        }
        $("#dispatchorder").show();
    }
}

function fanhui() {
    parama.token = token;
    jumpFunction(_path + "DispatchOrderSearchByCz.html", parama);
}

function searchbyno(obj){
    var aa=$(obj).attr("ftempOrderNo");
    var paramb = {};
    paramb.token=token;
    paramb.fdispatchOrderNo=aa;
    paramb.fplanLoadListTime=fplanLoadListTime;
    paramb.fdispatchOrderStatus=fdispatchOrderStatus;
	paramb.name='KYdispathorderSearch';
	window.sessionStorage.setItem('DispatchOrderNo',JSON.stringify(paramb));
    jumpFunction1(_path + "DispatchOrderSearchByNo.html?lastUrl=KYdispatchOrderSearch",paramb)


}
function timeOnClose(){
    var _time = $("#shijian").val();
    $("#dispatchorder").empty();
    $(".js_show").infinite()
    pageNo=0;
    // if(_time == "时间不限"){
    //     _time = "";
    // }else{
        _time = new Date(_time).Format("yyyy-MM-dd")
    // }
    fplanLoadListTime = _time;
    iphoneDate = _time;
    searchByTime(_time);
}
function senderOnClose(e){
    var codeArr = e.value,
        time = $("#shijian").val();
    $("#dispatchorder").empty();
    $(".js_show").infinite()
    pageNo=0;
    fsenderProvinceCode = codeArr[0]?codeArr[0]:"";
    fsenderCityCode = codeArr[1]?codeArr[1]:"";
    fsenderCountyCode = codeArr[2]?codeArr[2]:"";
    searchByTime(time)
}
function receiverOnClose(e){
    var codeArr = e.value,
        time = $("#shijian").val();
    $("#dispatchorder").empty();
    $(".js_show").infinite()
    pageNo=0;
    freceiverProvinceCode = codeArr[0]?codeArr[0]:"";
    freceiverCityCode = codeArr[1]?codeArr[1]:"";
    freceiverCountyCode = codeArr[2]?codeArr[2]:"";
    searchByTime(time)
}