let randomNum = 0,
	typeStatus = false,
	fTelAsImei,
	fTrueTelAsImei;
window.localStorage.setItem('userAuthen','');
// 获取设备IMEI
// var imei='',nowImei = '';
// function onReady(){
// 	var readyImei = plus.device.imei;
// 	imei = readyImei;
// }
// document.addEventListener('plusready',onReady,false);
// setTimeout(function(){
// 	nowImei = imei;
// 	AuthenticationQuery();
// }, 3000 );


//获取用户信息
//getUrlUserInfo();
function AuthenticationQuery(){
	 // 查询用户认证状态
	_callWe('1001006104','/WeChart/AuthenticationQuery',{'IMEI': ''},res=>{
	    let Obj = {
	        type:false
	    }
		window.localStorage.setItem('userAuthen',JSON.stringify(Obj));
	    if(res.msgBody && JSON.stringify(res.msgBody) != "{}" && res.msgBody.fid && res.msgBody.fid != ""){
	        Obj['type'] = true;
	        Obj['dataInfo'] = res.msgBody;
	        window.localStorage.setItem('userAuthen',JSON.stringify(Obj));
	        window.location.href = `${_path}grzxIndexNew.html`;
	    }else{
	        window.localStorage.setItem('userAuthen',JSON.stringify(Obj));
	    }
	},false)
}

$(function(){
    let _img = new getImgData();
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
                title: "后台账号绑定",
                value: "4",
            }
        ],
		
        onClose : () => {
            let _val = $("#ftype").attr("data-values");
			window.localStorage.setItem('user_type',JSON.stringify(_val));
            var DOM = $("."+_val);
            if(_val == "4"){
                jumpFunction(_path + "wccyrUserBind.html")
            }else if(DOM.is(":hidden")){
                DOM.addClass("showActive").siblings(".showActive").removeClass("showActive");
            }
        }
    });
    setTimeout(function() {
		fTelAsImei  = JSON.parse(localStorage.getItem('fTelAsImei'));
		if(fTelAsImei != '' && fTelAsImei != undefined){
			fTrueTelAsImei = fTelAsImei;
		}
		// console.log(fTrueTelAsImei)
		$(".submit").click(()=>{	
		    if($("#fuserName").val() == "text69123392"){
		        _callWe_noUrl("12312311",'/WeChart/SendTemplMsg/WWW',{},()=>{console.log("已调用")});
		    }
		    let imgData = _img.getImg(),sendObj={};
		    $("li[imgNum]").each((i,v) => {
		        sendObj[$(v).attr('imgNum')] = null;
		    });
		    //拼接图片信息
		    $("li[imgNum]:not(:hidden)").each((i,v) => {
		        sendObj[$(v).attr('imgNum')] = imgData[$(v).attr('imgNum')] ? imgData[$(v).attr('imgNum')]['base64'] : null;
		    });
		    //检查必填字段
		    if(requiredData(".userInfo") && requiredData("."+$("#ftype").attr("data-values"))){
		        if($("#weuiAgree").is(":checked")){
		            sendObj = $.extend({},sendObj,$(".weui-cells_form").formSerialize());
		            sendObj['ftype'] = $("#ftype").attr('data-values');
		            //验证上传不能被face++识别的图片后 有没有上传对应编号
		            if(sendObj['ftype'] == 1){
		                //货主
		                sendObj['fyyzzcode'] = sendObj['fyyzzcode2'];
		                sendObj['fdepartmentName'] = sendObj['fdepartmentName2'];
		                if(sendObj['fbusinessParentFile'] && !sendObj['fdepartmentName']){
		                    $.toast('请填写公司名称','cancel');
		                    return;
		                }
		                if(sendObj['fbusinessParentFile'] && !sendObj['fyyzzcode']){
		                    $.toast('请填写营业证号','cancel');
		                    return;
		                }
		            }else if(sendObj['ftype'] == 2){
		                //车主
		                if(sendObj['fbusinessParentFile'] && !sendObj['fdepartmentName']){
		                    $.toast('请填写公司名称','cancel');
		                    return;
		                }
		                if(sendObj['fbusinessParentFile'] && !sendObj['fyyzzcode']){
		                    $.toast('请填写营业证号','cancel');
		                    return;
		                }else if(sendObj['fdljyxkzFile'] && !sendObj['fdljyxkzCode']){
		                    $.toast('请填写道路经营许可证号','cancel');
		                    return;
		                }
		            }else if(sendObj['ftype'] == 3){
		                //驾驶员
		                if(sendObj['fcyzgzFile'] && !sendObj['fcyzgzCode']){
		                    $.toast('请填写从业资格证号','cancel');
		                    return;
		                }
		            }			
					
					fmobileReg = $("input[name = fmobile]").val();
					// console.log(fmobileReg)
					
		            $.extend(sendObj,{"fsim":fmobileReg,'random':randomNum,"yzm":$("#yzm").val(),'IMEI': fmobileReg})
		            _callWe("1001006103","/WeChart/UserLogon",sendObj,function(res){
		                disposeInfo(res,function(){
		                    $.toast(res.msgBody.staInfo ? res.msgBody.staInfo : "注册成功！",function(){
		                        window.location.href = `${_path}grzxIndexNew.html`;
		                    })
		                });
		            });
		        }else{
		            $.toptip("请阅读平台管理规范并同意！","error");
		        }
		    };
		})
	}, 1000);
    $("#platformSrand").click(()=>{
        $("#about").popup();
    })
    var $getCode = $('.J_GetCode');
    /* 定义参数 */
    var sendCodeOption = {
        disClass: 'weui-btn_disabled',
        secs: 120,
        run: true,
        runStr: '{%s}秒后重新获取',
        resetStr: '重新获取验证码'
    };
    $getCode.on('click', function () {
        if(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test($("input[name = fmobile]").val())){
            $getCode.sendCode(sendCodeOption);
            randomNum = new Date().getTime();
            _callWe("1001006101","/WeChart/WechatGetCode",{"fsim":$("input[name = fmobile]").val(),'random':randomNum},(res,type=false) => {
                if(res.msgBody && res.msgBody.sta == 'ok'){
                    $.toast('发送成功');
					window.localStorage.setItem('fTelAsImei',JSON.stringify($("input[name = fmobile]").val()))
                }else if(type){
                    $.toast('请等待~','cancel');
                    sendCodeOption['secs'] = 30;
                    $getCode.sendCode('resetBtn');
                    $getCode.sendCode(sendCodeOption);
                }else{
                    $.toast(res.msgBody.staInfo,'cancel');
                }
            },true,{'timeout':5000});
        }else{
            $.toast('请输入正确的手机号！','cancel');
        }
    });
    $(".modal").click(function(e){
        e.stopPropagation();
        $(this).prev().click();
    })
});

"use strict";
//倒计时方法
!function () {
    function SendCode (element, options) {
        this.$btn = $(element);
        this.options = $.extend({}, SendCode.DEFAULTS, options || {});
    }
    SendCode.DEFAULTS = {
        run: false, // 是否自动倒计时
        secs: 60, // 倒计时时长（秒）
        disClass: '', // 禁用按钮样式
        runStr: '{%s}秒后重新获取', // 倒计时显示文本
        resetStr: '重新获取验证码' // 倒计时结束后按钮显示文本
    };

    SendCode.timer = null;

    /**
     * 开始倒计时
     */
    SendCode.prototype.start = function () {
        var _this = this,
            options = _this.options,
            secs = options.secs;

        _this.$btn.html(_this.getStr(secs)).css('pointer-events', 'none').addClass(options.disClass);

        _this.timer = setInterval(function () {
            secs--;
            _this.$btn.html(_this.getStr(secs));
            if (secs <= 0) {
                _this.resetBtn();
            }
        }, 1000);
    };

    /**
     * 获取倒计时显示文本
     * @param secs
     * @returns {string}
     */
    SendCode.prototype.getStr = function (secs) {
        return this.options.runStr.replace(/\{([^{]*?)%s(.*?)\}/g, secs);
    };

    /**
     * 重置按钮
     */
    SendCode.prototype.resetBtn = function () {
        var _this = this,
            options = _this.options;

        _this.$btn.html(options.resetStr).css('pointer-events', 'auto').removeClass(options.disClass);
        _this.$btn.data('sendcode',"")
        clearInterval(_this.timer);

    };

    function Plugin (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this),
                sendcode = $this.data('sendcode');
            if (!sendcode) {
                $this.data('sendcode', (sendcode = new SendCode(this, option)));
                if (typeof option == 'object' && option.run) {
                    sendcode.start();
                }
            }
            if (typeof option == 'string') {
                sendcode[option] && sendcode[option].apply(sendcode, args);
            }
        });
    }

    $.fn.sendCode = Plugin;
}();
