var code="";
var token="";
var area="";
var fid="";
var ftempOrderNo="";
var freceiverCountyCode="";
var fsenderCountyCode="";
var fsenderAddress="";
var fsenderMobile="";
var freceiverAddress="";
var freceiverName="";
var freceiverMobile="";
var floadListAdress="";
var funloadListAdress="";
var fplanLoadListTime="";
var ftruckLong="";
var fremark="";
var fgoodsFee="";
var fcarriage="";
var fgoodsWeight="";
var fgoodsName="";
var ftempOrderGoodsNo="";
$(function () {
    $(".ssq li").eq(0).click(function(){
        $(this).addClass("tabhover").siblings("li").removeClass("tabhover");
        $("#province").show().siblings(".shengfen").hide()
    });
    area =getUrlParams("area");
    token =getUrlParams("token");
    code =getUrlParams("code");
    fid=getUrlParams("fid");
    ftempOrderNo=getUrlParams("ftempOrderNo");
    freceiverCountyCode=getUrlParams("freceiverCountyCode");
    fsenderCountyCode=getUrlParams("fsenderCountyCode");
    fsenderAddress=getUrlString("fsenderAddress");
    fsenderMobile=getUrlParams("fsenderMobile");
    freceiverAddress=getUrlString("freceiverAddress");
    freceiverName=getUrlString("freceiverName");
    freceiverMobile=getUrlParams("freceiverMobile");
    floadListAdress=getUrlString("floadListAdress");
    funloadListAdress=getUrlString("funloadListAdress");
    fplanLoadListTime=getUrlParams("fplanLoadListTime");
    ftruckLong=getUrlParams("ftruckLong");
    fremark=getUrlString("fremark");
    fgoodsFee=getUrlParams("fgoodsFee");
    fcarriage=getUrlParams("fcarriage");
    fgoodsWeight=getUrlParams("fgoodsWeight");
    fgoodsName= getUrlString("fgoodsName");
    ftempOrderGoodsNo=getUrlParams("ftempOrderGoodsNo");
    //area为1时是发货地，为2时是收货地
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

function funone(obj){
    //点击省出现市
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
var fAddress = '';
function funthree(obj){
    var areaCode=$(obj).val();
    var areaName=$(obj).text();
    var provincecode=$("#province .sheng").val();//省级编号
    var citycode=$("#city .shi").val();//市级编号
    var provinceName=$("#province .sheng").text();//省名字
    var cityName=$("#city .shi").text();//市名字
    var address=provinceName+"-"+cityName+"-"+areaName;
    params = new Object();
    params.fid= $("#fid").val(),
        params.ftempOrderNo= ftempOrderNo;
    params.freceiverCountyCode= freceiverCountyCode;
    params.fsenderCountyCode= fsenderCountyCode;
    params.fsenderAddress= fsenderAddress;
    params.fsenderMobile= fsenderMobile;
    params.freceiverAddress= freceiverAddress;
    params.freceiverName= freceiverName;
    params.freceiverMobile=freceiverMobile;
    params.floadListAdress= floadListAdress;
    params.funloadListAdress= funloadListAdress;
    params.fplanLoadListTime= fplanLoadListTime;
    params.ftruckLong=ftruckLong;
    params.fremark= fremark;
    params.fgoodsFee= fgoodsFee;
    params.fcarriage= fcarriage;
    params.fgoodsWeight=fgoodsWeight;
    params.fgoodsName=fgoodsName;
    params.ftempOrderGoodsNo=ftempOrderGoodsNo;
    /* alert(address);*/

    params.area=area;
    params.token=token;
    params.provincecode=provincecode;
    params.citycode=citycode;
    params.areaCode=areaCode;
    params.address=address;
	
	fAddress = JSON.parse(sessionStorage.getItem('fAddress'));
	
	if(fAddress == "fsenderAddress"){
		window.sessionStorage.setItem('fsenderAddress', JSON.stringify(params));
	} else if(fAddress == "freceiverAddress"){
		window.sessionStorage.setItem('freceiverAddress', JSON.stringify(params));
	}
	
	jumpFunction(_path + "tmpOrderAddOrChange.html?v=12",params);

}