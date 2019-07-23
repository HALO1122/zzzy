//原本写的数据
var params=new Object();
$(function() {
    $("#tel").attr("href",config.tel);
    //获取code
     code = getUrlParams("code");
     token = getUrlParams("token");

    $("#dingdan").on('click',function(){
        params.token=token;
        jumpFunction(_path + "TempOrderSearchStatus.html?t="+Date.parse(new Date()),params);
    });
    // $.ajax({
    //     url: "/Wechat/TempOrder/TempOrderSearch",
    //     type: "post",
    //     dataType: "json",
    //     data: {"code": code, "type": 1, "token": token,"ftempOrderStatus":"1"},
    //     success: function (data) {
    //             initPageInfo(data);
    //     }
    // });
    _callWe_noUrl('1001006061','/Wechat/TempOrder/TempOrderSearch',{"ftempOrderStatus":"1"},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody);
        })
    })
    var temp = $("#tempOrder").html();
    $("#tempOrder").empty();
    var initPageInfo = function (data) {
        if (data) {
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
                backHtml = temp.format(filtrationNull(node.ftempOrderNo), filtrationNull(node.ftempOrderStatusName),
                    filtrationNull(node.fsenderAddress), filtrationNull(node.freceiverAddress),filtrationNull(node.fplanLoadListTime).replace(/-/g,"/").substring(0,19),
                     filtrationNull(fgoodsWeight+'t'), filtrationNull(maxLengthWidth), filtrationNull(fcarriage)
                );
                $("#tempOrder").append(backHtml)
            })
        } else {
            $("#tempOrder").append("未查询到数据")
        }
        $("#tempOrder").show();
   };
    //点击我的运单

});
    function dianjiquxiao(obj){
        var aa=$(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children(".weui-form-preview__value").text();
        params.token=token;
        params.ftempOrderNo=aa;
        jumpFunction(_path + "wechatTempOrderCancel.html",params);

    }


    function dianjixiugai(obj){
        var aa=$(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children(".weui-form-preview__value").text();
        params.ftempOrderNo=aa;
        params.token=token;
        jumpFunction(_path + "tmpOrderAddOrChange.html",params)

    }
    //运单新增
    function xinzeng(){
        params.token=token;
        jumpFunction(_path + "tmpOrderAddOrChange.html",params);

    }




