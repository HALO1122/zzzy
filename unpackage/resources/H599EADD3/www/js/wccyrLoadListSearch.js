var token;
$(function () {

   code = getUrlParams("code");

    // tokenByCode(code,"3",function(res){
        // $.ajax({
        //     url: "/Wechat/WccyrLoadList/WccyrLoadListSearch",
        //     type: "post",
        //     dataType: "json",
        //     data: {"code": code, "type": 3, "token": token},
        //     success: function (da) {
        //         initPageInfo(da);
        //     }
        // });
        _callWe_noUrl('1001006033','/Wechat/WccyrLoadList/WccyrLoadListSearch',{},res => {
            searchInfo(res,()=>{
                initPageInfo(res.msgBody.pageOutBody.pageObjBody);
            },true)
        })
        var temp = $("#loadList").html();
        $("#loadList").empty();
        $("#loadList").append("<div class='weui-form-preview__bd' >"+"没有可用装车单/或者正在等待调度"+"</div>");
        function initPageInfo(data) {
            if(data.length > 0){
                $("#loadList").empty();
                $.each(data, function (index, node){
                    var backHtml = "";
                    var fgoodsWeight = 0;
                    for (var i = 0; i < node.dispatchOrder.goods.length; i++) {
                        fgoodsWeight += node.dispatchOrder.goods[i].fgoodsWeight;
                    }
                    var status =null;
                    if(node.dispatchOrder.fdispatchOrderStatus == 11 ){
                        status = "开始装车";
                    }else if(node.dispatchOrder.fdispatchOrderStatus == 12){
                        status = "完成装车";
                    }else if(node.dispatchOrder.fdispatchOrderStatus == 13){
                        status = "开始卸车";
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
                    backHtml += temp.format(filtrationNull(node.fdispatchOrderNo), filtrationNull(node.dispatchOrder.fsenderAddress),
                        filtrationNull(node.dispatchOrder.freceiverAddress),time,filtrationNull(node.dispatchOrder.floadListAdress),
                        filtrationNull(node.dispatchOrder.funloadListAdress),filtrationNull(fgoodsWeight),filtrationNull(maxLengthWidth),filtrationNull(node.fplateNo),
                        filtrationNull(status),filtrationNull(node.floadListNo)
                    ) + "</br>";
                    $("#loadList").append(backHtml);
                    $("a[name='tel']").attr("href",config.tel);
                });
            }
            $("#loadList").show();
        }
    // })
    $(".refresh").click(function(){
        var parse={};
        jumpFunction(_path + "wccyrLoadListSearch.html",parse);
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
function load(obj) {
    var floadListNo =$(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children("span").eq(0).text();
    var fdispatchOrderNo =$(obj).parent(".weui-form-preview__ft").prev(".weui-form-preview__bd").children(".weui-form-preview__item:first-child").children("span").eq(1).text();
    var pas = new Object();
      pas.fdispatchOrderNo = fdispatchOrderNo;
      pas.floadListNo = floadListNo;
      var parama=new Object();
      parama.fdispatchOrderNo=fdispatchOrderNo;
      parama.floadListNo = floadListNo;
	  window.sessionStorage.setItem('LoadListDispatchorder',JSON.stringify(parama));
    var text = $(obj).text();
    if(text == "开始装车"){	
        jumpFunction(_path + "wccyrLoadListStart.html",parama);
    }else if(text == "完成装车"){
        jumpFunction(_path + "wccyrLoadListEnd.html",pas);
    }else  if(text == "开始卸车"){
        jumpFunction(_path + "wccyrLoadListUnload.html",pas);
    }
}
function history() {
    var pas = new Object();
    pas.fdispatchOrderStatus = "14";
    jumpFunction(_path + "wccyrLoadSearchHistory.html",pas);

}
