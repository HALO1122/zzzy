var code="";
var token="";
var area="";
var fid="";
var fsenderSite="";
var freceiverSite="";
var fgoodsName="";
var fgoodsWeight="";
var ftruckLong="";
var fplanLoadListTime="";
var fsenderTel="";
var ffhrName="";
var ffee="";
var fremark="";
$(function () {
    $(".ssq li").eq(0).click(function(){
        $(this).addClass("tabhover").siblings("li").removeClass("tabhover");
        $("#province").show().siblings(".shengfen").hide()
    });
    area =getUrlParams("area");
    token =getUrlParams("token");
    code =getUrlParams("code");
    fid=getUrlParams("fid");
    fsenderSite=getUrlParams("fsenderSite");
    freceiverSite=getUrlParams("freceiverSite");
    fgoodsName=getUrlParams("fgoodsName");
    fgoodsWeight=getUrlParams("fgoodsWeight");
    fplanLoadListTime=getUrlParams("fplanLoadListTime");
    ftruckLong=getUrlParams("ftruckLong");
    fsenderTel=getUrlParams("fsenderTel");
    ffhrName=getUrlParams("ffhrName");
    ffee=getUrlParams("ffee");
    fremark=getUrlParams("fremark");

    //area为1时是发货地，为2时是收货地
    _callWe('1001006020','/Wechat/Basic/AreaSearch',{"fparentAreaCode":"0"},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody.pageOutBody.pageObjBody);
        },true)
    })
    var initPageInfo = function (data) {
        if (data) {
            var backHtml = "";
            $.each(data, function (index, node) {
                backHtml ="<li value='"+node.fareaCode+"' onclick='funone(this)'>"+node.fareaName+"</li>";
                $("#province").append(backHtml)
            })
        }
    };
});

function funone(obj){//点击省出现市
    $(".ssq li").eq(1).addClass("tabhover").siblings('li').removeClass("tabhover");
    $("#city").show().siblings(".shengfen").hide();
    $('#province li').removeClass("sheng");
    /*alert("选择省");*/
    $(obj).addClass("sheng");
    var provinceCode=$(obj).val();
    var provinceName=$(obj).text();
    _callWe('1001006020','/Wechat/Basic/AreaSearch',{"fparentAreaCode":provinceCode},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody.pageOutBody.pageObjBody);
        },true)
    })
    var initPageInfo = function (data) {
        if (data) {
            var backHtml = "";
            $("#city").empty();
            $.each(data, function (index, node) {
                backHtml ="<li value='"+node.fareaCode+"' onclick='funtwo(this)'>"+node.fareaName+"</li>";
                $("#city").append(backHtml)
            })
        }
    };
}

function funtwo(obj){
    $(".ssq li").eq(2).addClass("tabhover").siblings('li').removeClass("tabhover");
    $("#area").show().siblings(".shengfen").hide();
    $("#city li").removeClass("shi");
    $(obj).addClass("shi");
    var cityCode=$(obj).val();
    var cityName=$(obj).text();
    _callWe('1001006020','/Wechat/Basic/AreaSearch',{"fparentAreaCode":cityCode},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody.pageOutBody.pageObjBody);
        },true)
    })
    var initPageInfo = function (data) {
        if (data) {
            var backHtml = "";
            $.each(data, function (index, node) {
                backHtml ="<li value='"+node.fareaCode+"' onclick='funthree(this)'>"+node.fareaName+"</li>";
                $("#area").append(backHtml)
            })
        }
    };
}

function funthree(obj){
    var areaCode=$(obj).val();
    var areaName=$(obj).text();
    var provincecode=$("#province .sheng").val();//省级编号
    var citycode=$("#city .shi").val();//市级编号
    var provinceName=$("#province .sheng").text();//省名字
    var cityName=$("#city .shi").text();//市名字
    var address=provinceName+" "+cityName+" "+areaName;
    params = new Object();

    params.area=area;
    params.token=token;
    params.fgoodsName=fgoodsName;
    params.fgoodsWeight=fgoodsWeight;
    params.ftruckLong=ftruckLong;
    params.fsenderTel=fsenderTel;
    params.ffhrName=ffhrName;
    params.ffee=ffee;
    params.fremark=fremark;
    params.fplanLoadListTime=fplanLoadListTime;
    params.address=address;
    params.fsenderSite=fsenderSite;
    params.freceiverSite=freceiverSite;
    jumpFunction(_path + "infoLobbyAddOrder.html",params);
}