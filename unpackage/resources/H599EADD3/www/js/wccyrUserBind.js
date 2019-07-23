var ftype;
// 获取设备IMEI
// var imei='',nowImei = '';
// function onReady(){
// 	var readyImei = plus.device.imei;
// 	imei = readyImei;
// }
// document.addEventListener('plusready',onReady,false);
// setTimeout(function(){
// 	nowImei = imei;
// }, 3000 );

$(function(){
	fTelAsImei  = JSON.parse(localStorage.getItem('fTelAsImei'));
	if(fTelAsImei != '' && fTelAsImei != undefined){
		fTrueTelAsImei = fTelAsImei;
	}
	
    if($.request.queryString["pagePype"] && $.request.queryString["pagePype"]=="test"){
        window.localStorage.setItem("fappId","wx3b5f4af079c4c422");
        window.localStorage.setItem("fopenId","15188390711");
    }
    $("#ftype").select({
        title: "选择认证角色",
        items: [
            {
                title: "货主",
                value: "1",
            },
            {
                title: "车主",
                value: "2",
            },
            {
                title: "驾驶员",
                value: "3",
            },
            {
                title: "现场调度",
                value: "4",
            }
        ],
        onClose : () => {
            let _val = $("#ftype").attr("data-values");
            var DOM = $("."+_val);
            if(_val == "5"){
                jumpFunction(__path + "wccyrUserBind.html")
            }else if(DOM.is(":hidden")){
                DOM.addClass("showActive").siblings(".showActive").removeClass("showActive");
            }
        }
    });
    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"绑定",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                if($("#weuiAgree").is(":checked")){
                    var sendObj = {},
                        storage = window.localStorage.getItem('tokenInfo'),
                        mustdata = ["fusername","fpassword"],
                        isOk = true;
                    sendObj['fusername'] = $("#fusername").val();
                    sendObj['fpassword'] = $("#fpassword").val();
                    sendObj['ftype'] = $("#ftype").data("values");
					sendObj['IMEI'] = fTrueTelAsImei;
                    $.each(mustdata,(i,v) => {
                        if(!sendObj[v]){
                            let text = $("#"+v).lenth>0 ? $("#"+v).attr("placeholder") : "获取缓存数据失败";
                            $.toast(text,"error");
                            isOk = false;
                        }
                    });
                    if(isOk){
						console.log(sendObj.fTrueTelAsImei)
                        _callWe("1001000150","/Login/BindWeChat",sendObj,function(res){
                            if(res.msgBody.sta == "ok"){
                                $.toast("绑定成功！",function(){
									ftype = $("#ftype").val();
									if(ftype == '货主') {
										window.location.href = `${_path}hzGrzxIndexNew.html`;
									} 
									if(ftype == '车主') {
										window.location.href = `${_path}czGrzxIndexNew.html`;
									}
									if(ftype == '驾驶员') {
										window.location.href = `${_path}jsyGrzxIndexNew.html`;
									} 
									if(ftype == '现场调度') {
										window.location.href = `${_path}xcddGrzxIndexNew.html`;
									}
									// console.log($("#ftype").val())
                                })
                            }else{
                                $.toast(res.msgBody.staInfo,"cancel")
                            }
                        })
                    }
                }else{
                    $.toptip('请阅读条款并同意！', 'warning');
                }
            }}
        ]
    });
})