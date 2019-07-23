$(function () {
    // $.ajax({
    //     url: "/Wechat/WccyrLoadList/WccyrLoadListSearchByHistory",
    //     type: "post",
    //     dataType: "json",
    //     data: {"code": code, "type": 3, "token": token,"fdispatchOrderStatus":14},
    //     success: function (da) {
    //         initPageInfo(da);
    //     }
    // });
    _callWe_noUrl('',"/Wechat/WccyrLoadList/WccyrLoadListSearchByHistory",{"fdispatchOrderStatus":14},res=>{
        searchInfo(res,()=>{
            initPageInfo(res.msgBody.pageOutBody.pageObjBody);
        },true);
    })
    var fdispatchOrderStatus =  getUrlParams("fdispatchOrderStatus");
    var temp = $("#loadList").html();
    $("#loadList").empty();
    $("#loadList").append("<div class='weui-form-preview__bd' >"+"没有可用历史装车单"+"</div>")
    function initPageInfo(data) {
        if(data.length > 0){
            $("#loadList").empty();
            $.each(data, function (index, node){
                var backHtml = "";
                var fgoodsWeight = 0;
                for (var i = 0; i < node.dispatchOrder.goods.length; i++) {
                    fgoodsWeight += node.dispatchOrder.goods[i].fgoodsWeight;
                }
                var fDate=null;
                if(node.floadDate==null){
                    fDate="未装车"
                }else{
                    fDate =filtrationNull(node.floadDate).replace(/-/g,"/").substring(0,19);
                }
                //超长超宽
                var maxLengthWidth = '';
                if(node.dispatchOrder.fgoodsMaxLength != null || node.dispatchOrder.fgoodsMaxWidth != null || node.dispatchOrder.fgoodsMaxHeight){
                    if(node.dispatchOrder.fgoodsMaxLength == null){
                        maxLengthWidth += '无'
                    }else {
                        maxLengthWidth += node.dispatchOrder.fgoodsMaxLength;
                    }
                    if(node.dispatchOrder.fgoodsMaxWidth == null){
                        maxLengthWidth += ',无,'
                    }else {
                        maxLengthWidth += ','+ node.dispatchOrder.fgoodsMaxWidth + ',';
                    }
                    if(node.dispatchOrder.fgoodsMaxHeight == null){
                        maxLengthWidth += '无'
                    }else {
                        maxLengthWidth += node.dispatchOrder.fgoodsMaxHeight;
                    }
                }else {
                    maxLengthWidth ='无';
                }
                var time =filtrationNull(node.dispatchOrder.fplanLoadListTime).replace(/-/g,"/").substring(0,10);
                backHtml += temp.format(filtrationNull(node.floadListNo), filtrationNull(node.dispatchOrder.fsenderAddress),
                        filtrationNull(node.dispatchOrder.freceiverAddress),fDate,filtrationNull(node.dispatchOrder.floadListAdress),
                        filtrationNull(node.dispatchOrder.funloadListAdress),filtrationNull(fgoodsWeight),filtrationNull(maxLengthWidth),filtrationNull(node.fplateNo),
                        filtrationNull(status),filtrationNull(node.floadListNo)
                    ) + "</br>";
                $("#loadList").append(backHtml);
                $("a[name='tel']").attr("href",config.tel);
            });
        }
        $("#loadList").show();
    }
    $(".refresh").click(function(){
        var parse={};
        jumpFunction(_path + "wccyrLoadSearchHistory.html",parse);
    })
    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"刷新",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                window.location.href = window.location.href;
            }}
        ]
    });

});
function recent() {
    var pas = new Object();
    jumpFunction(_path + "wccyrLoadListSearch.html",pas);
}