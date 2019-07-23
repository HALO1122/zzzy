var parama=new Object();
var code = getUrlParams("code");
var token = getUrlParams("token");
var URL = getUrlParams("lastUrl");
var fplanLoadListTime = getUrlParams("fplanLoadListTime");
var fdispatchOrderStatus = getUrlParams("fdispatchOrderStatus");
var fid = getUrlParams("fid");
$(function(){
    var data = {
        "msgId":"1001004002",
        "serId":0,
        "type":1,
        "key":0,
        "source":1,
        "msgBody":{
            "fid":fid,
        }
    }
    _callWe("1001004002",'/Basic/WlwlMessageSearchByNo',data.msgBody,data=>{
        initPageInfo(data);
    })
    var temp = $("#dispatchOrderbyNo").html();
    $("#dispatchOrderbyNo").empty();
    var initPageInfo = function (data) {
        if (data) {
            data = data.msgBody;
            var goodFree = data.ffee?data.ffee:"未填写运费";
            var fhrName = data.ffhrName?data.ffhrName:"未填写发货人姓名";
            var createtime = filtrationNull(data.fcreatedTime).replace(/-/g,"/").substring(0,19);
            var fsendtime = filtrationNull(data.fplanLoadListTime).replace(/-/g,"/").substring(0,10);
            var backHtml = temp.format(
                filtrationNull(data.forderNo),
                filtrationNull("正常"),
                filtrationNull(data.ffhrSite),
                filtrationNull(data.fshrSite),
                createtime,
                filtrationNull(fhrName),
                filtrationNull(data.ffhrTel),
                filtrationNull(data.fname),
                filtrationNull(data.fweight),
                filtrationNull(goodFree),
                filtrationNull(data.fremark),
                fsendtime)
            $("#dispatchOrderbyNo").append(backHtml);
            $("a.kefu").attr("href",kefu());
            $("a.huozhu").attr("href","tel:"+data.ffhrTel);
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
function kefu() {
    var curServerPath=window.document.location.href;
    if(curServerPath.indexOf('zzzy.56ps.cn') > -1 ){
        return "tel:0374-7388888";
    }if(curServerPath.indexOf('lhzx.56ps.cn') > -1 ){
        return "tel:0395-2136941";
    }
}