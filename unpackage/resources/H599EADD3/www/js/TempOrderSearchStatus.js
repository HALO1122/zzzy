var param=new Object();
$(function() {
     code = getUrlParams("code");
     token = getUrlParams("token");
    ftempOrderNo = getUrlParams("ftempOrderNo");
    $("#tel").attr("href",config.tel);
    $(".page").css("margin-bottom",$(".fixed-bottom").height())
    //$.ajax({
    //    url: "/Wechat/DispatchOrder/DispatchOrderSearchByHz",
    //    type: "post",
    //    dataType: "json",
    //    data: {"code": code, "type": 1, "token": token},
    //    success: function (data) {
    //        initPageInfo(data);
    //    }
    //});
    _callWe_noUrl("1001006009",'/Wechat/TempOrder/TempOrderSearch',{},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody.pageOutBody.pageObjBody);
        },true)
    })
    var temp = $("#tempOrder").html();
    $("#tempOrder").empty();
    var initPageInfo = function (data) {
        if (data){
            $.each(data, function (index, node) {
                var backHtml = "";
                //遍历货物,计算总重
                var fgoodsWeight = 0;
                for (var i = 0; i < node.goods.length; i++) {
                    fgoodsWeight += node.goods[i].fgoodsWeight;
                }
                //超长超宽
                var maxLengthWidth = '';
                if(node.fgoodsMaxLength != null || node.fgoodsMaxWidth != null || node.fgoodsMaxHeight){
                    if(node.fgoodsMaxLength == null){
                        maxLengthWidth += '无'
                    }else {
                        maxLengthWidth += node.fgoodsMaxLength;
                    }
                    if(node.fgoodsMaxWidth == null){
                        maxLengthWidth += ',无,'
                    }else {
                        maxLengthWidth += ','+ node.fgoodsMaxWidth + ',';
                    }
                    if(node.fgoodsMaxHeight == null){
                        maxLengthWidth += '无'
                    }else {
                        maxLengthWidth += node.fgoodsMaxHeight;
                    }
                }else {
                    maxLengthWidth ='无';
                }
                var fcarriage='';

                if(node.orderFee==null){
                    fcarriage='无';
                }else{
                    if(node.orderFee.fcarriage==null){
                        fcarriage='无';
                    }else{
                        fcarriage=node.orderFee.fcarriage;
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
                backHtml = temp.format(filtrationNull(node.ftempOrderNo), filtrationNull(node.ftempOrderStatusName),
                    filtrationNull(node.fsenderAddress), filtrationNull(node.freceiverAddress),filtrationNull(node.fplanLoadListTime).replace(/-/g,"/").substring(0,19),
                    filtrationNull(fgoodsWeight+'t'), filtrationNull(maxLengthWidth), filtrationNull(fcarriage),filtrationNull(fcarriage),filtrationNull(data.fplateNo),
                    filtrationNull(data.floadDate),filtrationNull(data.funloadDate)
                );
                $("#tempOrder").append(backHtml)
                $(".weui-form-preview__bd").eq(index).attr("fdispatchOrderNo",node.ftempOrderNo);
            })
            //点击跳转到详情页面
            $(".weui-form-preview__bd").click(function(){
                var aa=$(this).attr("fdispatchOrderNo"),paramb={};
                paramb.fdispatchOrderNo=aa;
				paramb.name = 'hzDispathorder';
				window.sessionStorage.setItem('DispatchOrderNo',JSON.stringify(paramb));
                jumpFunction(_path + "DispatchOrderSearchByNo.html",paramb)
            })
            $(".dispathOrderStatus").each(function(i,v){
                if($(v).text()=="正常"){
                    $(v).css("color","green");
                    $(v).parent().parent().next().children(".repeat,.delete").addClass("order dispathOrderStatus")
                    $(v).parent().parent().next().children(".carLocation").hide();
                }else{
                    // if($(v).text()=="已完成"){
                    //     $(v).css("color","blue");
                    // }
                    $(v).parent().parent().next().children(".repeat,.delete").addClass("orderNo")
                }
            })
        } else {
            $("#tempOrder").append("未查询到数据")
        }
        $("#tempOrder").show();
    };
    //点击临时订单
    $("#linshi").on('click',function(){
        param.token=token;
        jumpFunction(_path + "TempOrderSearch.html",param);
    });
    //底部tobar
    new setTobar();
});


//运单新增
function xinzeng(){
    param.token=token;
    jumpFunction(_path + "tmpOrderAddOrChange.html",param);
}
//运单追踪
function  track(obj){
    var ftempOrderNo = $(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children(".weui-form-preview__value").text();
    param.token =token;
    param.ftempOrderNo = ftempOrderNo;
    jumpFunction(_path + "dispatchTrack.html",param);
}
//车辆追踪
function  cartrack(obj){
    var fplateNo = $(obj).attr("fplateNo"),
        floadDate = $(obj).attr("floadDate"),
        funloadDate = $(obj).attr("funloadDate");
    param.token =token;
    param.fplateNo = fplateNo;
    param.floadDate = floadDate;
    param.funloadDate = funloadDate;
    jumpFunction(_path + "carLocation.html", param);
}
//重发运单
function repeatOrder(obj){
    if($(obj).hasClass("dispathOrderStatus")){
        var fdispatchOrderNo = $(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children(".weui-form-preview__value").text();
        param.fdispatchOrderNo = fdispatchOrderNo;
        _callWe_noUrl("1001006059",'/Wechat/TempOrder/RepublishOrder',{'ftempOrderNo':fdispatchOrderNo},data=>{
            if(data.msgBody.sta == "ok"){
                $.toast(data.msgBody.staInfo,()=>{
                    jumpFunction(_path + "TempOrderSearchStatus.html",param);
                });
            }else{
                $.toast('错误'+data.msgBody.staInfo,'cancel');
            }
        })
    }else{
        $.toast("该运单状态不能重发！",'cancel')
    }
}
function dianjiquxiao(obj){
    if($(obj).hasClass("dispathOrderStatus")){
        var aa=$(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children(".weui-form-preview__value").text();
        var params = {};
        params.token=token;
        params.ftempOrderNo=aa;
        jumpFunction(_path + "wechatTempOrderCancel.html",params);
    }else{
        $.toast("该运单不能作废！",'cancel')
    }
}
function dianjixiugai(obj){
    var aa=$(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children(".weui-form-preview__value").text();
    var params = {};
    params.ftempOrderNo=aa;
    params.token=token;
    jumpFunction(_path + "tmpOrderAddOrChange.html",params)
}