var params=new Object();
$(function(){
    $("#tel").attr("href",config.tel);
    //获取url里的参数
	
	var urlParams =  JSON.parse(sessionStorage.getItem('./dispatchTrack.html'));
	var ftempOrderNo = urlParams.ftempOrderNo;
	
    code = getUrlParams("code");
    token = getUrlParams("token");
    // ftempOrderNo = getUrlParams("ftempOrderNo");
    var temp = $("#chaxunbyNo").html();
    $("#chaxunbyNo").empty();
    // $.ajax({
    //     url: "/Wechat/DispatchOrder/DispatchOrderSearchByNo",
    //     type: "post",
    //     dataType: "json",
    //     data: {"code": code, "type": 2, "token": token, "fdispatchOrderNo": fdispatchOrderNo},
    //     success: function (data) {
    //             initPageInfo(data);
    //         }
    //
    // });
    _callWe_noUrl('1001006011','/Wechat/TempOrder/TempOrderSearchByNo',{"ftempOrderNo":ftempOrderNo},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody);
        })
    })
    var initPageInfo = function (data) {
        if (data) {
            var backHtml = "";
            var fgoodsWeight = 0;
            for (var i = 0; i < data.goods.length; i++) {
                fgoodsWeight += data.goods[i].fgoodsWeight;
            }
            //超长超宽
            var maxLengthWidth = '';
            if(data.fgoodsMaxLength != null || data.fgoodsMaxWidth != null || data.fgoodsMaxHeight){
                if(data.fgoodsMaxLength == null){
                    maxLengthWidth += '无'
                }else {
                    maxLengthWidth += data.fgoodsMaxLength;
                }
                if(data.fgoodsMaxWidth == null){
                    maxLengthWidth += ',无,'
                }else {
                    maxLengthWidth += ','+ data.fgoodsMaxWidth + ',';
                }
                if(data.fgoodsMaxHeight == null){
                    maxLengthWidth += '无'
                }else {
                    maxLengthWidth += data.fgoodsMaxHeight;
                }
            }else {
                maxLengthWidth ='无';
            }
            var fgoodsFee='';
            if(data.orderFee==null){
                fgoodsFee='无';
            }else{
                if(data.orderFee.fgoodsFee==null){
                    fgoodsFee='无';
                }else{
                    fgoodsFee=data.orderFee.fgoodsFee;
                }
            }
            if (data != null) {
                backHtml = temp.format(filtrationNull(data.ftempOrderNo),
                    filtrationNull(data.ftempOrderStatusName), filtrationNull(data.fsenderAddress),
                    filtrationNull(data.freceiverAddress), filtrationNull(data.fplanLoadListTime).replace(/-/g,"/").substring(0,19),
                    filtrationNull(fgoodsWeight),filtrationNull(maxLengthWidth),filtrationNull(fgoodsFee))
            } else {
                alert("您查询的数据不存在");
            }
            $("#chaxunbyNo").append(backHtml)
        } else {
            $("#chaxunbyNo").append("未查询到数据")
        }
        $("#chaxunbyNo").show();
    }
    $(".weui-form-preview__btn_primary").on('click', function(){
        if(!$("#beizhu").val()){
            $.toptip($("#beizhu").attr("placeholder"),'warning')
        }else{
            _callWe_noUrl("1001006015",'/Wechat/TempOrder/TempOrderCancel',{"ftempOrderNo":ftempOrderNo,"fremark":$("#beizhu").val()},data=>{
                data = data.msgBody;
                if(data.staInfoCode==0){
                    params.token=token;
                    $.toast("运单作废成功！",function(){
                        jumpFunction(_path + "TempOrderSearchStatus.html",params)
                    })
                }else{
                    layer.alert(data.staInfo)
                }
            })
        }
    });
    $(".quxiao").click(function(){
        params.token=token;
        params.type=1;
        jumpFunction(_path + "TempOrderSearchStatus.html",params)
    })
    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"作废订单",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                if(!$("#beizhu").val()){
                    $.toptip($("#beizhu").attr("placeholder"),'warning')
                }else{
                    _callWe_noUrl("1001006015",'/Wechat/TempOrder/TempOrderCancel',{"ftempOrderNo":ftempOrderNo,"fremark":$("#beizhu").val()},data=>{
                        data = data.msgBody;
                        if(data.staInfoCode==0){
                            params.token=token;
                            $.toast("运单作废成功！",function(){
                                jumpFunction(_path + "TempOrderSearchStatus.html",params)
                            })
                        }else{
                            layer.alert(data.staInfo)
                        }
                    })
                }
            }}
        ]
    });
});
//运单新增
function xinzeng(){
    params.token=token;
    jumpFunction(_path + "tmpOrderAddOrChange.html",params);
}
