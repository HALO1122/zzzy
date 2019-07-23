//
var paramb=new Object();
var code ,token ;
$(function(){
    code = getUrlParams("code");
    token = getUrlParams("token");
    $(".weui_tel").attr("href",config.tel);
    $("#dispatchOrder").css('marginBottom',$(".KYbutton").height());
    _callWe_noUrl('1001006027','/Wechat/TempOrder/TempOrderSearchByCzdd',{},_data=>{
        searchInfo(_data,()=>{
            initPageInfo(_data.msgBody.pageOutBody.pageObjBody);
        },true)
    })
    var initPageInfo = function (data) {
        var temp = $("#dispatchOrder .list").html();
        $("#dispatchOrder").empty();
        if (data!="") {
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
                var time = filtrationNull(node.fplanLoadListTime).replace(/-/g,"/").substring(0,10);
                // backHtml = temp.format(filtrationNull(node.fdispatchOrderNo), filtrationNull(node.dispatchOrderStatusName),
                //     filtrationNull(node.fsenderAddress), filtrationNull(node.freceiverAddress),time,
                //     filtrationNull(fgoodsWeight+'t'),filtrationNull(maxLengthWidth), filtrationNull(carriage)
                // );
                //修改运单显示的东西
                backHtml = temp.format(filtrationNull(node.ftempOrderStatusName=="正常"?"等待调度":node.ftempOrderStatusName),
                    filtrationNull(node.fsenderAddress), filtrationNull(node.freceiverAddress),time,
                    filtrationNull(fgoodsWeight+'t'),filtrationNull(maxLengthWidth), filtrationNull(carriage)
                );
                $("#dispatchOrder").append(backHtml);
                $("a[name='tel']").attr("href",config.tel);
                $(".weui-form-preview__bd").eq(index).attr("fdispatchOrderNo",node.ftempOrderNo);
            })

            $(".weui-form-preview__bd").click(function(){
                searchbyno(this)
            })
            $(".dispathStatus").each(function(i,v){
                if($(v).text()=="等待调度") $(v).addClass("dispathStatusWait")
                if($(v).text()=="已完成") $(v).addClass("dispathStatusOver")
            })
        }else{
            var _html = "<div class='text-center'>暂未查询到历史运单</div>"
            $("#dispatchOrder").append(_html);
        }
        $("#dispatchOrder").show();

    };


    $("#keyongchaxun").on('click',function(){
        var fdispatchOrderStatus=10;
        paramb.token=token;
        // paramb.fplanLoadListTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        paramb.fplanLoadListTime="时间不限";
        paramb.fdispatchOrderStatus=fdispatchOrderStatus;
        jumpFunction(_path + "KYdispatchOrderSearch.html",paramb)
    });
    $("#grzx").on('click',function(){
        jumpFunction(_path + "czGrzxIndexNew.html?user=2")
    });

    //向后台请求数据 返回后便利到前台
    function searchbyno(obj){
        var aa=$(obj).attr("fdispatchOrderNo");
        paramb.token=token;
        paramb.fdispatchOrderNo=aa;
		paramb.name = 'czDispathorder';
		window.sessionStorage.setItem('DispatchOrderNo',JSON.stringify(paramb));
        jumpFunction1(_path + "DispatchOrderSearchByNo.html?lastUrl=DispatchOrderSearchByCz",paramb)
    }
    // })
    new setTobar({
        'mainBtn':[
            {'name':'可用订单','url':'KYdispatchOrderSearch.html'},
        ]
    });
});