var parama = new Object(),
    iphoneDate,
    loading = false,  //状态标记
    pageNo = 0,
    pageSize = 10,
    token,
    appid,
    code;
$(function () {
    //appid = $.trim($.request.queryString["fuserAppid"]);
    var curServerPath=window.document.location.href;
    if(curServerPath.indexOf('zzzy.56ps.cn') > -1 ){
        appid='wx8982157bedbc8324'
    }else if(curServerPath.indexOf('lhzx.56ps.cn') > -1 ){
        appid='wx0e96149828559cf0'
    }
    else if(curServerPath.indexOf('nw10cyespu.shhttp.cn') > -1 ){
        appid='wxb0d0f8e89e8384d4'
    }
    code = $.trim($.request.queryString["code"]);
    $("#dataParent").css("margin-bottom",$(".issue").height());
    //滚动加载
    $(".box").infinite().on("infinite", function() {
        if(loading) return;
        else{
            loading = true;//将状态该为true
            $("#loading").removeClass("hide");
            searchOrder()
        }
    });
    var date = new Date().Format("yyyy-MM-dd");
    $("#shijian").calendar({
        dateFormat:"yyyy-mm-dd",
        value:[date],
        "onClose":timeOnClose
    });
    $("#senderSite").cityPicker({
        "onClose":senderOnClose,
        showDistrict:false
    });
    $("#receiverSite").cityPicker({
        "onClose":receiverOnClose,
        showDistrict:false
    });
    $("body").on("click",function(e){
        if($(e.target).hasClass("noTime")){
            $("#shijian").val("时间不限").calendar("close");
        }else if($(e.target).attr("id")=="issue"){
            jumpGetToken();
        }else if($(e.target).attr("id")=="dingwei"){
            jumpFunction(_path + "carLocation.html", parama);
        }
    })
    searchOrder();
});
function jumpGetToken() {
    _callWe('1001006150','/WeChart/GetTokenByCode',{'fcode':code,'fuserAppid':appid},res=>{
        if(res.msgBody && res.msgBody.sta == 'ok'){
            window.location.href = _path+"infoLobbyAddOrder.html";
    }else{
        $.toast(res.msgBody.staInfo,'success',()=>{
            window.location.href = _path+"userAuthentic.html";
    });
        }
})
}
function cahngeTime(time){
    if(new Date().getTime() - time*1 > 60*30*1000){
        return false;
    }
    return true;
}

function searchOrder() {
    var senderSiteName = $("#senderSite").val()=="全部 不限"?"":$("#senderSite").val().split(" ")[1];
    var receiverSiteName = $("#receiverSite").val()=="全部 不限"?"":$("#receiverSite").val().split(" ")[1];
    var data = {
        "ffhrSite":senderSiteName,
        "fshrSite":receiverSiteName,
        "fsize":'-1',
        "fstartTime":"2000-01-01",
        "fendTime":$("#shijian").val()=="时间不限"?new Date().Format("yyyy-MM-dd"):$("#shijian").val(),
        "pageSetBody":{
            "pageSize":pageSize,
            "pageNo":pageNo
        }
    }
    _callWe('1001004004','/Basic/WlwlMessageSearch',data,data=>{
        initPageInfo(data);
    })
    var initPageInfo = function (data) {
        loading = false;
        if (data.msgBody) {
            pageNo++;
            if(data.msgBody.pageOutBody.pageObjBody.length<7){
                $("#loading").addClass("hide");
            }else{
                $("#loading").removeClass("hide");
            }
            $.each(data.msgBody.pageOutBody.pageObjBody, function (index, node) {
                var backHtml = "",fsenderAddress="",freceiverAddress="";
                //遍历货物,计算总重
                var fgoodsWeight = node.fweight+"t";
                if(node.ffhrSite){
                    fsenderAddress=node.ffhrSite.split(" ");
                    if(fsenderAddress[2]){
                        fsenderAddress = fsenderAddress[1]+"-"+fsenderAddress[2]
                    }else{
                        fsenderAddress = fsenderAddress[0]+"-"+fsenderAddress[1]
                    }
                }
                if(node.fshrSite){
                    freceiverAddress=node.fshrSite.split(" ");
                    if(freceiverAddress[2]){
                        freceiverAddress = freceiverAddress[1]+"-"+freceiverAddress[2]
                    }else{
                        freceiverAddress = freceiverAddress[0]+"-"+freceiverAddress[1]
                    }
                }
                var time = filtrationNull(node.fplanLoadListTime).replace(/-/g, "/").substring(0, 10);
                backHtml+="<div class='weui-flex'>"

                backHtml+="<div class='weui-flex__item' style='width: 90%'>";

                backHtml+="<div class=\"weui-form-preview__bd\" fid="+node.fid+">";
                backHtml+="<div class=\"weui-form-preview__item\" style=\"display: flex;justify-content: space-between\"><span class=\"weui-form-preview__value dizhi\" >" + fsenderAddress + "=>" + freceiverAddress + "</span><span>" + fgoodsWeight + "</span></div>";
                backHtml+=" <div class=\"weui-form-preview__item timeLine\">";
                backHtml+="<div><p class=\"weui-form-preview__value\">"+node.fsize + 'm'+"</p></div>";
                backHtml+="<div><span class=\"weui-form-preview__value\">"+time+"</span></div>";
                backHtml+="</div>";

                backHtml+="</div>";
                backHtml+="</div>";

                backHtml+="<div style='text-align: center;width: 10%' class='phone'>";
                backHtml+="<a style='width: 100%' href='tel:"+node.ffhrTel+"'><img src='/assets/images/phone.png' style='height: 2rem;width: 100%'/></a>";
                backHtml+="</div>";

                backHtml+="</div>";
                $("#dispatchorder").append(backHtml);
                $(".weui-form-preview__bd").click(function(){
                    searchbyno(this)
                })
            })
        } else {
            $("#loading").addClass("hide");
            if(!$("#dispatchorder").children(".noOrder").length>0){
                $(".box").destroyInfinite();
                var backHtml = `<div class="noOrder">没有更多运单了</div>`
                $("#dispatchorder").append(backHtml);
            }
        }
        $("#dispatchorder").show();
    }
}
//时间被选择
function timeOnClose(){
    $("#dispatchorder").empty();
    $(".js_show").infinite()
    pageNo=0;
    searchOrder();
}
//发货地被选择
function senderOnClose(e){
    var codeArr = e.value,
        time = $("#shijian").val();
    $("#dispatchorder").empty();
    $(".js_show").infinite()
    pageNo=0;
    searchOrder()
}
//到货地被选择
function receiverOnClose(e){
    var codeArr = e.value,
        time = $("#shijian").val();
    $("#dispatchorder").empty();
    $(".js_show").infinite()
    pageNo=0;
    searchOrder()
}

function searchbyno(obj){
    var aa=$(obj).attr("fid");
    var paramb = {};
    paramb.fid=aa;
    jumpFunction1(_path + "infoLobbySearchByNo.html?lastUrl=infoLobby",paramb)
}

