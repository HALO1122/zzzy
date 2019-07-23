var parama=new Object();
var code = getUrlParams("code");
var token = getUrlParams("token");
var URL = getUrlParams("lastUrl");
var fplanLoadListTime = getUrlParams("fplanLoadListTime");
var fdispatchOrderStatus = getUrlParams("fdispatchOrderStatus");
// var fdispatchOrderNo = getUrlParams("fdispatchOrderNo");

// 货主/车主,页面运单详情
var DispatchOrderNo = JSON.parse(window.sessionStorage.getItem('DispatchOrderNo'));
var fdispatchOrderNo = DispatchOrderNo.fdispatchOrderNo;


$(function(){
    _callWe_noUrl('1001006011','/Wechat/TempOrder/TempOrderSearchByNo',{"ftempOrderNo":fdispatchOrderNo},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody);
        })
    })

    var temp = $("#dispatchOrderbyNo").html();
    $("#dispatchOrderbyNo").empty();
    var initPageInfo = function (data) {
        if (data) {
            //跳转驾驶员装车单列表的按钮显示与隐藏
            if(data['fisDriver'] && data['fisDriver'] == 1 && document.referrer.indexOf('KYdispatchOrderSearch') == '-1'){
                // $("#loadList").show();
                //底部tobar
                new setTobar({
                    'mainBtn':[
                        {'name':"装车单",'url':'wccyrLoadListSearch.html'}
                    ]
                });
            }else{
                //底部tobar
                new setTobar();
            }
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

            if (data != null) {
                var carriage;
                if(data.orderFee==null){
                    carriage='无';
                }else{
                    if(data.orderFee.fcarriage==null){
                        carriage='无';
                    }else{
                        carriage=filtrationNull(data.orderFee.fcarriage);
                    }
                }
                var time = filtrationNull(data.fplanLoadListTime).replace(/-/g,"/").substring(0,10);
                var createtime = filtrationNull(data.fcreatedTime).replace(/-/g,"/").substring(0,19);
                backHtml = temp.format(
                    filtrationNull(data.ftempOrderNo),
                    filtrationNull(data.ftempOrderStatusName),
                    filtrationNull(data.fsenderAddress),
                    filtrationNull(data.freceiverAddress),
                    time,
                    filtrationNull(fgoodsWeight),
                    filtrationNull(maxLengthWidth),
                    filtrationNull(carriage),
                    filtrationNull(data.fremark),
                    createtime)
            } else {
                layer.alert("您查询的数据不存在");
            }
            $("#dispatchOrderbyNo").append(backHtml);
            $("a[name='tel']").attr("href",config.tel);
        } else {
            $("#dispatchOrderbyNo").append("未查询到数据")
        }
        $("#dispatchOrderbyNo").show();
    }

});
function fanhui(){
    parama.token=token;
    parama.fplanLoadListTime=fplanLoadListTime;
    parama.fdispatchOrderStatus=fdispatchOrderStatus;
    jumpFunction(_path + ""+URL+".html",parama);
}
function toDiver(){
    jumpFunction(_path + "wccyrLoadListSearch.html");
}