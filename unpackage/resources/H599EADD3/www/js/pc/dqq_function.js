$(document).ready(function () {
    checkLogin();
	if ($(".table_drag").length) {
		$(".table_drag").colResizable();
	}
	setIframeHeight();
	$(window).resize(function () {
		setIframeHeight();
	});
	getPayTypeName();//动态加载付款方式名称
	if($(".select2_multiple").length > 0){
        $(".select2_multiple").select2({"multiple":true});
    }
    //特殊样式处理
    $(".autoWidth").each(function(){
        $(this).width(($(this).parent().width()*1-($(this).prev().width()*1))*0.9)
    })
	//table tr colspan处理
	if($(".excalTable>thead>tr").length>2){
    	$(".excalTable>thead>tr:even").each((i,v)=>{
    		$(v).children().attr("colspan",$(v).next().children().length)
		})
	}
});
var ajaxNum = 0;
//iconfont网站上的动态网址   添加新图标可能会更新  18-5-28 wsg
var iconFontUrl = "//at.alicdn.com/t/font_574298_c83eu9ksevb.css";
//动态加载运费付款名称
function getPayTypeName() {
	var _fpayName = window.localStorage.getItem("fpayName");
	if (_fpayName != null) {
		var _fpayNamejson = JSON.parse(_fpayName);
		$(".fpayName1").text(_fpayNamejson.fpayName1);
		$(".fpayName2").text(_fpayNamejson.fpayName2);
		$(".fpayName3").text(_fpayNamejson.fpayName3);
	}
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

!function () {
	//if(_page.indexOf("wccyr") != "-1"){
	//	loadLaydate(null,"1");
	//}else{
	//	loadLaydate();
	//}
	loadLaydate();
}();
function noticeTimeout() {
	d_alert("错误!", "请求数据超时，请稍后重试", "error");
	return false;
}
function noticeError() {
	d_alert("错误!", "请求数据错误，请联系管理员", "error");
	return false;
}
function noticeLogout(str) {
	top.swal("错误!", str);
	return false;
}
function checkLogin() {
	if (_page == "main") {
		//客户端跳转网页
		var packet_type = $.request.queryString["packet_type"];
		var packet_token = $.request.queryString["packet_token"];
		var packet_check = $.request.queryString["packet_check"];

		if (typeof (packet_token) != "undefined" && packet_token != null && packet_token.length > 20) {
			_setTokenInfo(packet_type, packet_token, packet_check);
			var url = "/Token/GetUserByToken?packet_type=" + packet_type + "&packet_token=" + packet_token + "&packet_check=" + packet_check;
			_call2('1001000214', url, 'POST', {}, function (res) {
				if (res.msgBody.sta == "ok") {
					setUserInfo(res.msgBody, 1);
					_setTokenInfo(packet_type, packet_token, packet_check);
					var _storagetemp = window.localStorage;
					var _userOperation = _storagetemp.getItem("userOperation");
					if (typeof (_userOperation) == "undefined" || _userOperation == null || _userOperation.length < 20) {
						//获取可操作具体功能
						_call2('1001000207', '/User/GetUserOperation', 'POST', {}, function (res2) {
							var _storage2 = window.localStorage;
							_storage2.setItem("userOperation", JSON.stringify((res2.msgBody.operationObjs)));
							top.window.location.href = "/main.html";
						}, getHeaderObj(),false);
					} else {
						top.window.location.href = "/main.html";
					}
				} else {
					window.localStorage.clear();
					top.window.location.href = "/";
				}
			}, getHeaderObj2(packet_type, packet_token, packet_check),false);
		} else {
			var _storage = window.localStorage;
			var _tokenInfo = _storage.getItem("tokenInfo");

			if (typeof (_tokenInfo) == "undefined" || _tokenInfo == null || _tokenInfo.length < 20) {
				window.localStorage.clear();
				top.window.location.href = "/index.html";
			}
		}
	} else {
		var _storage = window.localStorage;
		var _tokenInfo = _storage.getItem("tokenInfo");
		if (typeof (_tokenInfo) != "undefined" && _tokenInfo != null && _tokenInfo.length > 20) {
            var _tokenObj=JSON.parse(_tokenInfo);
            if (typeof (_tokenObj.fdatetime) != "undefined" && _tokenObj.fdatetime != null && _tokenObj.fdatetime!='null' &&(new Date().getTime()-_tokenObj.fdatetime)>3600000) {
                window.localStorage.clear();
                if(_page!="login" && _page!="waybill"){
                    top.window.location.href = "/index.html";
                }
			}
		} else {
            window.localStorage.clear();
            if(_page!="login" && _page!="waybill"){ 
				top.window.location.href = "/index.html";
			}
		}
	}
}

function setIframeHeight() {
	var _content_main;
	if ($("#content-main").length) {
		_content_main = $("#content-main");
	}
	else if (parent.$("#content-main").length) {
		_content_main = parent.$("#content-main");
	}
	if (typeof (_content_main) != "undefined" && _content_main.height() != null) {
		var _height = _content_main.height();
		_height = _height - 81;
		getMyIframe().height(_height);
	}
}
function setUserInfo(v, t) {
	//token 自动更新不用维护了
	if (t == 1) {
		var jsonObj2 = new Object();
		jsonObj2.frealName = v.frealName;
		jsonObj2.fpostName = v.fpostName;
		jsonObj2.fuserUrl = v.fuserUrl;
		jsonObj2.fsiteNo = v.fsiteNo;
		jsonObj2.fsiteName = v.fsiteName;
		if(typeof (v.fuserType) != "undefined" && v.fuserType != null &&v.fuserType==2){
            jsonObj2.fuserType = v.fuserType;
            jsonObj2.customer = v.customer;
            jsonObj2.wlsmartCard = v.wlsmartCard;
        }
		var objString2 = JSON.stringify(jsonObj2);
		window.localStorage.setItem("userInfo", objString2);
	}else{
        _setTokenInfo(v.packet_type,v.packet_token,v.packet_check);
	}
}
function getUserInfo(t) {
	var _storage = window.localStorage;
	var _tokenInfo = _storage.getItem("tokenInfo");
	var _userInfo = _storage.getItem("userInfo");

	if (!_tokenInfo || _tokenInfo == null) {
		return null;
	} else {
		if (t == 1) {
			_info = JSON.parse(_userInfo);
		}
		else {
			_info = JSON.parse(_tokenInfo);
		}
		return _info;
	}
}
function getMyIframe() {
	var _data_id = top.$(".page-tabs-content a.active").data("id");
	var _now_iframe = top.$(".J_iframe[data-id='" + _data_id + "']");
	return _now_iframe;
}
function _call(code, send, func, aSynSta) {
    ajaxcallAPI(code, send, function (res) {
        top.$('#modal-loading').modal('hide');
		if (code != "1001000209") {
			checkToken(res);
		}
		if(code != "1001000212" && code != "1001000216") ajaxNum--;
        //loading页面关闭
		if(ajaxNum == 0){
            getMainDom("#loading").hide();
        }
		func(res);
	}, function () {
        if(code != "1001000212" && code != "1001000216") ajaxNum--;
        //loading页面关闭
        if(ajaxNum == 0){
            getMainDom("#loading").hide();
        }
		top.$('#modal-loading').modal('hide');
		noticeTimeout();
	}, function () {
        if(code != "1001000212" && code != "1001000216") ajaxNum--;
        //loading页面关闭
        if(ajaxNum == 0){
            getMainDom("#loading").hide();
        }
		top.$('#modal-loading').modal('hide');
		noticeError();
	}, getHeaderObj(), aSynSta);
}
//关闭页面闪屏
function _callaaaaa(code, send, func, aSynSta) {
	ajaxcallAPIaaaaa(code, send, function (res) {
		top.$('#modal-loading').modal('hide');
		if (code != "1001000209") {
			checkToken(res);
		}
		if(code != "1001000212") ajaxNum--;
		//loading页面关闭
		if(ajaxNum == 0){}
		func(res);
	}, function () {
		if(code != "1001000212") ajaxNum--;
		//loading页面关闭
		if(ajaxNum == 0){}
		top.$('#modal-loading').modal('hide');
		noticeTimeout();
	}, function () {
		if(code != "1001000212") ajaxNum--;
		//loading页面关闭
		if(ajaxNum == 0){}
		top.$('#modal-loading').modal('hide');
		noticeError();
	}, getHeaderObj(), aSynSta);
}
function _silentCall(code, send, func, aSynSta) {
    ajaxcallAPI(code, send, function (res) {
        if (code != "1001000209") {
            checkToken(res);
        }
        func(res);

    }, func,func, getHeaderObj(), aSynSta);

}
function _call2(code, url, method, send, success, headerObj,aSynSta) {
	ajaxcallAPI_2(code, url, method, send, success, function () {
		noticeTimeout();
	}, function () {
		noticeError();
	}, headerObj,aSynSta);
}
function confirm_add_ok(res, url_back, func) {
	if (res.msgBody.sta == "ok") {
		top.swal({
			title: res.msgBody.staInfo + " 是否继续?",
			type: "success",
			showCancelButton: true,
			cancelButtonText: "不了",
			confirmButtonText: "继续",
			confirmButtonColor: "#49bf67",
			closeOnConfirm: false,
			allowOutsideClick: false
		}).then(function (isConfirm) {
			if (isConfirm) {
				func();
				top.swal.closeModal();
			}
			else {
				if (url_back != "") {
					window.location.href = url_back;
				}
			}
		});
	}
	else if (res.msgBody.sta == "err") {
		d_alert("错误!", res.msgBody.staInfo, "error");
	}
	else if (res.msgBody.sta == "bzz") {
		d_alert("错误!", res.msgBody.staInfo, "error");
	}
	else {
		d_alert("错误!", "请求数据超时，请稍后重试", "error");
	}
}
function dqq_confirm(str, func) {
	top.swal({
		title: str,
		type: "question",
		showCancelButton: true,
		cancelButtonText: "取消",
		confirmButtonText: "确定",
		confirmButtonColor: "#d33",
		closeOnConfirm: false
	}).then(function (isConfirm) {
		if (isConfirm) {
			func();
			//top.swal.closeModal();
		}
	});
}
function loadLaydate(e, Num) {
	if (typeof (laydate) != "undefined") {
		if ($("#all_date .ly_date").length) {
			$('#all_date .ly_date').each(function(i,v){
                var _laydate = {
                    elem:$(v)[0],
                    max: '2099-06-16',
                    event: 'focus',
                    //istime:true,
                    istoday: true,
                    type: "datetime",
                    choose: function (datas) {
                    },
                    theme: 'grid'
                };
                if (Num) {
                    _laydate.format = 'yyyy-MM-dd'
                } else {
                    _laydate.format = 'yyyy-MM-dd HH:mm:ss'
                    _laydate.istime = true
                }

                // laydate.skin('huanglv');
                laydate.render(_laydate);
			})
		}
	}
}
function setYzmLogin() {
	if ($("#login_name").val() != "") {
		var _username = $("#login_name").val();
		var _random = Date.parse(new Date());
		var _src = api_base + "/Login/VerificationCode?fusername=" + _username + "&fidetifyCode=123456&random=" + _random;
		$(".img_code").html("<img src='" + _src + "' width='100' height='38' onclick='setYzmLogin();' random='" + _random + "' />");
		$(".submit_btn").attr("disabled", false);
	}
}
function get_unix_time(dateStr) {
	var newstr = dateStr.replace(/-/g, '/');
	var date = new Date(newstr);
	var time_str = date.getTime().toString();
	return time_str.substr(0, 10);
}

function getHeaderObj() {
	var _userInfo = getUserInfo(0);
	var _headerObj = "packet_type;" + _userInfo.packet_type + "#packet_token;" + _userInfo.packet_token + "#packet_check;" + _userInfo.packet_check;
	return _headerObj;
}
function getHeaderObj2(packet_type, packet_token, packet_check) {
	var _headerObj = "packet_type;" + packet_type + "#packet_token;" + packet_token + "#packet_check;" + packet_check;
	return _headerObj;
}
function checkToken(res) {
	if (res) {
		// 自动更新token，只用判断过期就可以了 过去不用直接跳出，提示就可以了
		if (res.tokenSta == 3) {
			d_alert("错误!", res.staInfo, "error");
		}
	}
}
function box_collapse() {
	$(".box .box-collapse").click(function (e) {
		var box;
		box = $(this).parents(".box").first();
		box.toggleClass("box-collapsed");
		var _up = "&#xe9ce;";
		var _down = "&#xe9d0;";
		if (box.hasClass("box-collapsed")) {
			$(this).find("i").html(_down);
		}
		else {
			$(this).find("i").html(_up);
		}
		return e.preventDefault();
	});
}
function table_collapse() {
	$(".box .box-collapse2").click(function (e) {
		var box;
		box = $(this).parents(".box").first();
		box.toggleClass("box-collapsed2");
		var _up = "&#xe9ce;";
		var _down = "&#xe9d0;";
		if (box.hasClass("box-collapsed2")) {
			$(this).parent().parent().parent().find(".table_list").hide();
			$(this).find("i").html(_down);
		}
		else {
			$(this).parent().parent().parent().find(".table_list").show();
			$(this).find("i").html(_up);
		}
		return e.preventDefault();
	});
}
function d_alert(title, content, type, func) {
	top.swal(title, content, type).then(function (isConfirm) {
		if (isConfirm === true) {
			if (func) {
				func();
			}
		}
	});
}
function checkInputLength(_dom, min_length, max_length) {
	var _return = true;
	if (_dom.val() != "") {
		var _len = _dom.val().length;
		if (_len < min_length || _len > max_length) {
			_return = false;
		}
	}

	if (_return) {
		return true;
	}
	else {
		d_alert("错误!", "单号格式不正确，请重新输入", "error",function(){
			setTimeout(function(){
                _dom.focus().select();
			})
		});
		return false;
	}
}
function DX(num) {
	var strOutput = "";
	var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
	num += "00";
	var intPos = num.indexOf('.');
	if (intPos >= 0)
		num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
	strUnit = strUnit.substr(strUnit.length - num.length);
	for (var i = 0; i < num.length; i++)
		strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
	return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
};
function d_val(_dom, _val, text_val, _showZero) {
	if (_dom.length) {
		//是否显示0
		if (_val == "0") {
			_val = _showZero == 0 ? 0 : "";
		}

		if (_dom[0].tagName == "INPUT" || _dom[0].tagName == "SELECT") {
			_dom.val(_val);
		}
		else {
			_dom.text(text_val);
		}
		_dom.attr(_dom.attr("id"), _val);
	}
}
function getNum_01(_dom) {
	var num = _dom.text() == "" ? 0 : parseInt(_dom.text());
	return num;
}
function getTime(_type,_nowDate) {
	var d = _nowDate?new Date(_nowDate):new Date();
	var _time = "";
	var _month = (parseInt(d.getMonth()) + 1);
	var _date = d.getDate();
	_month = _month < 10 ? "0" + _month : _month;
	_date = _date < 10 ? "0" + _date : _date;

	if (_type == 1) {
		_time = d.getFullYear() + "-" + _month + "-" + _date;
	}
	else if (_type == 2) {
		_time = d.getFullYear() + "-" + _month + "-" + _date + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}else if (_type == 3) {
        _time = d.getFullYear() + "-" + _month;
    }
	return _time;
}


var timeout_01 = "";
function sloading(func, second) {
	/*
	 top.swal({
	 width:"400",
	 //customClass:"dqq_dialog_01",
	 allowOutsideClick:false,
	 showCloseButton:true,
	 showConfirmButton:false,
	 html:'<div class="loading_01">数据提交中，请稍等</div>'
	 });*/
	if (second > 0) {
		clearTimeout(timeout_01);
		top.$('#modal-loading').modal({ backdrop: 'static' }).on("shown.bs.modal", function () {
			timeout_01 = setTimeout(function () {
				func();
				clearTimeout(timeout_01);
				return;
			}, second);
		});
	}
	else {
		func();
	}

}


function asnySloading(func) {
	top.$('#modal-loading').modal({ backdrop: 'static' }).on("shown.bs.modal", func());
}

var loading2_func;
function sloading2(func) {
	$(".loading_02").show();
	loading2_func = setInterval(function () {
		func();
		clearInterval(loading2_func);
		$(".loading_02").hide();
	}, 500);
}
function GetAreaInfoByID(fareaCode) {
	var returnObj = {};
	var sendObj = {
		"fareaCode": fareaCode,
		"fcompanyId": getUserInfo(0).fcompanyId
	};
	_call('1001000406', sendObj, function (res) {
		returnObj = res.msgBody;
	});
	return returnObj;
}
function setDefaultDate(_startDate, _endDate) {
	if (_startDate) {
		_startDate.val(getTime(1) + " 00:00:00");
	}
	if (_endDate) {
		_endDate.val(getTime(1) + " 23:59:59");
	}
}
function setDefaultMonth(_month) {
        _month.val(getTime(3));
}

/*
* 设置当前时间 向前或向后n毫秒的时间
* n 时间戳 正值向前 负值向后
* format 日期格式 默认yyyy-MM-dd
* type  是否切割成年月日  默认切割
* */
function setChangeTime(n,format,type){
	format = format || "yyyy-MM-dd";
    var date = new Date (new Date().getTime()-n).Format(format);//获取当前的时间戳
	if(!type){
        date = date.substring(0,10)
	}
    return date;
}

function getZhaoling(obj, yingshou) {
	if ($(obj).val() != "") {
		var zhaolinig = parseInt($(obj).val()) - parseInt(yingshou);
		zhaolinig = zhaolinig < 0 ? 0 : zhaolinig;
		$("#money_zhaoling").val(zhaolinig);
	}
	else {
		$("#money_zhaoling").val(0);
	}
}
function collapse_01(obj) {
	if ($(obj).hasClass("up")) {
		$(obj).removeClass("up");
		$(obj).addClass("down");
		$(obj).text("展开代理人");
		$(".dbr").hide();
	}
	else {
		$(obj).removeClass("down");
		$(obj).addClass("up");
		$(obj).text("关闭代理人");
		$(".dbr").show();
	}
}
/*
* 打印是否被选中
* checkStatus
* */
function PickUpGoods(_checkStatus,datapickType) {
    $("#pickUpGoodssub").attr("disabled", true);
    var _fdispatchOrderNos = window.localStorage.getItem("goodsPickFdispatchOrderNos");
	var _fmarketPickerName = $.trim($("#fmarketPickerName").val());
	var _fpickerName = $.trim($("#fpickerName").val());
	var _fpickerMobile = $.trim($("#fpickerMobile").val());
	var _fpickerIdcardNo = $.trim($("#fpickerIdcardNo").val());
	var _fagentName = $.trim($("#fagentName").val());
	var _fagentMobile = $.trim($("#fagentMobile").val());
	var _fagentIdcardNo = $.trim($("#fagentIdcardNo").val());
	if (_fpickerName == "") {
        $("#pickUpGoodssub").attr("disabled", false);
		alert("请输入签收人名称");
		return;
	}
	else if (_fpickerMobile == "") {
		$("#pickUpGoodssub").attr("disabled", false);
		alert("请输入签收人电话");
        return;
	}
	else if (_fpickerIdcardNo == "") {
		$("#pickUpGoodssub").attr("disabled", false);
		alert("请输入签收人身份证");
        return;
	}
	else {
		var sendObj = {
			"fcompanyId": getUserInfo(0).fcompanyId,
			"fmarketPickerName": _fmarketPickerName,
			"fpickerName": _fpickerName,
			"fpickerIdcardNo": _fpickerIdcardNo,
			"fpickerMobile": _fpickerMobile,
			"fagentName": _fagentName,
			"fagentMobile": _fagentMobile,
			"fagentIdcardNo": _fagentIdcardNo,
			"fremark": "",
			"fdispatchOrderNos": _fdispatchOrderNos
		};
		if(datapickType){
            sendObj['fpickType'] = 1;
		}
		sloading(function () {
			_call("1001002800", sendObj, function (res) {
                $("#pickUpGoodssub").attr("disabled", false);
                if (res.msgBody.sta == "ok") {
                	if(_checkStatus){
                        openSwalWindow('1100','650',_dir+"plugins/goodsPickDealManager_print.html");
					}else{
                        top.swal({
                            title: res.msgBody.staInfo + " 是否继续?",
                            type: "success",
                            showCancelButton: true,
                            cancelButtonText: "不了",
                            confirmButtonText: "继续",
                            confirmButtonColor: "#49bf67",
                            closeOnConfirm: false,
                            allowOutsideClick: false
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                top.swal.closeModal();
                            }
                            else {
                                if (url_back != "") {
                                    top.swal.closeModal();
                                    // window.location.href = url_back;
                                }
                            }

                        });
					}
                    getMyIframe().attr("src", _dir + "goodsPickDealManager.html");
                    if(getMyIframe().contents().find("#fdispatchOrderNo").length>0){
                        getMyIframe().contents().find("#fdispatchOrderNo").focus();
                    };
                }else{
                	d_alert("错误",res.msgBody.staInfo,"error");
				}
			});
		}, 0);
	}
}
function codCashedDispathorders(_fdispatchOrderNos) {
	$("#pickUpGoodssub").attr("disabled", true);
	var _fmarketPickerName = $.trim($("#fmarketPickerName").val());
	var _fpickerName = $.trim($("#fpickerName").val());
	var _fpickerMobile = $.trim($("#fpickerMobile").val());
	var _fpickerIdcardNo = $.trim($("#fpickerIdcardNo").val());
	var _fagentName = $.trim($("#fagentName").val());
	var _fagentMobile = $.trim($("#fagentMobile").val());
	var _fagentIdcardNo = $.trim($("#fagentIdcardNo").val());


	var sendObj = {
		"fmarketPickerName": _fmarketPickerName,
		"fpickerName": _fpickerName,
		"fpickerIdcardNo": _fpickerIdcardNo,
		"fpickerMobile": _fpickerMobile,
		"fagentName": _fagentName,
		"fagentMobile": _fagentMobile,
		"fagentIdcardNo": _fagentIdcardNo,
		"fremark": "",
		"fdispatchOrderNos": _fdispatchOrderNos
	};

	sloading(function () {
		_call("1001003017", sendObj, function (res) {
			confirm_add_ok(res, '', function () {
				getMyIframe().attr("src", _dir + "codCashedManager.html");
			})
		});
	}, 0);
}
function exportExcel(sendObj, msgid) {
    if ($(".excel").length) {
        $(".excel").unbind("click").on("click", function () {
            if (sendObj) {
                var sendData = {};
                sendData["msgId"] = "1001004300";
                sendObj['msgId'] = msgid;

                var _form = parent.$("#export_form");
                var _storage = null;
                if (localStorage) {
                    _storage = localStorage;
                    if (!_storage || !_storage.getItem("tokenInfo")) {
                        if (window && window.localStorage) {
                            _storage = window.localStorage;
                        }
                    }

                }
                else if (window && window.localStorage) {
                    _storage = window.localStorage;
                }
                var _userOperation = _storage.getItem("userOperation");
                if (_userOperation != null) {
                    _userOperation = JSON.parse(_userOperation);
                    $.each(_userOperation, function (i, v) {
                        if (v['foperationNo'] == sendData["msgId"]) {
                            _form.attr("action", getApiBase() + v['fajaxUrl']);
                            sendData["serId"] = 0;
                            sendData["type"] = v['fajaxCallBackType'];
                            sendData["key"] = v['fajaxCheckType'];
                            sendData["source"] = 1;
                            sendData["msgBody"] = sendObj;
                        }
                    });
                }
                else {
                    alert("参数错误，请重新登录");
                    return false;
                }
                parent.$("#packet_check").val(getUserInfo().packet_check);
                parent.$("#packet_token").val(getUserInfo().packet_token);
                parent.$("#action_msg").val(JSON.stringify(sendData));
                _form.submit();
            }
        });
    }
}

function directExportExcel(sendObj, msgid) {

	if (sendObj) {
		var sendData = {};
		sendData["msgId"] = "1001004300";
		sendObj['msgId'] = msgid;

		var _form = parent.$("#export_form");
		var _storage = null;
		if (localStorage) {
			_storage = localStorage;
			if (!_storage || !_storage.getItem("tokenInfo")) {
				if (window && window.localStorage) {
					_storage = window.localStorage;
				}
			}

		}
		else if (window && window.localStorage) {
			_storage = window.localStorage;
		}
		var _userOperation = _storage.getItem("userOperation");
		if (_userOperation != null) {
			_userOperation = JSON.parse(_userOperation);
			$.each(_userOperation, function (i, v) {
				if (v['foperationNo'] == sendData["msgId"]) {
					_form.attr("action", getApiBase() + v['fajaxUrl']);
					sendData["serId"] = 0;
					sendData["type"] = v['fajaxCallBackType'];
					sendData["key"] = v['fajaxCheckType'];
					sendData["source"] = 1;
					sendData["msgBody"] = sendObj;
				}
			});
		}
		else {
			alert("参数错误，请重新登录");
			return false;
		}
		parent.$("#packet_check").val(getUserInfo().packet_check);
		parent.$("#packet_token").val(getUserInfo().packet_token);
		parent.$("#action_msg").val(JSON.stringify(sendData));
		_form.submit();
	}
}

function getApiBase() {
	var curServerPath = window.document.location.href;
	if (curServerPath.indexOf('test.gjd8.com') > -1) {
		return "http://www.beautyouth.com:8893";
	}
	var pathName = window.document.location.pathname;
	var pos = 0;
	if (pathName && typeof (pathName) != "undefined" && pathName.length > 1) {
		pos = curServerPath.indexOf(pathName);
	} else {
		pos = curServerPath.length - 1;
	}
	var serverPath = curServerPath.substring(0, pos);
	return serverPath;
}

function getFormatDate(type, date_str) {
	var str;
	var checksta = checkdate(date_str);
	if (checksta > 0) {
		if (type == 1) {
			str = date_str.substring(0, 10);
		} else if (type == 2) {
			if (checksta == 1) {
				str = date_str.substring(0, 19);
			} else {
				str = date_str.substring(0, 10) + " 00:00:00";
			}
		}
	} else {
		str = getFormatDate(type, getNowFormatDate())
	}
	return str;
}
//获得展示的时间
function getViewFormatDate(type, date_str) {
	var str;
	if (!date_str || typeof (date_str) == 'undefined' || date_str.length < 10) {
		return "";
	}
	var checksta = checkdate(date_str);
	if (checksta > 0) {
		if (type == 1) {
			str = date_str.substring(0, 10);
		} else if (type == 2) {
			if (checksta == 1) {
				str = date_str.substring(0, 19);
			} else {
				str = date_str.substring(0, 10) + " 00:00:00";
			}
		}
	} else {
		str = getFormatDate(type, getNowFormatDate())
	}
	return str;
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		+ " " + date.getHours() + seperator2 + date.getMinutes()
		+ seperator2 + date.getSeconds();
	return currentdate;
}

/**
 * 校验是否为 时间格式  本系统只有 两种时间格式   yyyy-mm-dd hh:mm:ss  类型1   或者  yyyy-mm-dd 类型 2
 **/
function checkdate(date_str) {
	if (date_str && typeof (date_str) != 'undefined') {
        date_str=date_str+"";
		var result = date_str.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})(\.[0-9]*)?$/);
		if (result == null) {
			result = date_str.match(/^(\d{4})(-)(\d{2})\2(\d{2})$/);
			if (result == null) {
				return 0;
			} else {
				return 2;
			}
		} else {
			return 1;
		}
	}
	return 0;
}
//根据编号获取付款方式名称 1:交付 2：提付 3:合同户
function getPayTypeNameByNo(fpayTypeNo) {
	var _fpayName = window.localStorage.getItem("fpayName");
	var fpayName = "";
	if (_fpayName != null) {
		var _fpayNamejson = JSON.parse(_fpayName);
		if (fpayTypeNo == 1) {
			fpayName = _fpayNamejson.fpayName1;
		}
		if (fpayTypeNo == 2) {
			fpayName = _fpayNamejson.fpayName2;
		}
		if (fpayTypeNo == 3) {
			fpayName = _fpayNamejson.fpayName3;
		}
	}
	return fpayName;
}
function openSelect(elem) {
	if (document.createEvent) {
		var e = document.createEvent("MouseEvents");
		e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		elem[0].dispatchEvent(e);
	}
	else if (element.fireEvent) {
		elem[0].fireEvent("onmousedown");
	}
}
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
}
//js 导出excal table必须有excalTable的class
function tableToExcel(table) {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
		base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
		format = function(s, c) {
			return s.replace(/{(\w+)}/g,
				function(m, p) {return c[p]; })
		}
	var _Html = "";
	//新版本增加excalTable 即可导出
	if($(".excalTable").length>0){
        $(".excalTable").each((i,v)=>{
            $(v).find("div.dropdown-filter-dropdown,div:hidden,tr:hidden").remove();
            _Html += v.innerHTML;
        })
	}else{
		//兼容老版本页面
        if (!table.nodeType) table = document.getElementById(table)
        $(table).find("div.dropdown-filter-dropdown,div:hidden,tr:hidden").remove();
        _Html+=table.innerHTML;
	}
	var ctx = {worksheet: 'Worksheet', table: _Html};
	window.location.href = uri + base64(format(template, ctx));
	// $(".screen_end").click();
}
//
function judgeBrowser() {
    let ua = navigator.userAgent.toLowerCase();
    if(_mime("type", "application/vnd.chromium.remoting-viewer") && ua.indexOf("chrome") == -1){
        d_alert("警告","不是谷歌浏览器，请切换谷歌浏览器！","error");
	}
}
function _mime(option,value){
    var mimeTypes = navigator.mimeTypes;
    for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
            return true;
        }
    }
    return false;
}
//上传成功提示方法
function upfilesuccess(res) {
    if (res.lengthComputable) {
        $(".bar").width(parseInt(loaded / total * 100) + "%")
    }
    if (res.msgBody.sta == "ok") {
        top.swal("提示", res.msgBody.staInfo, "success");
    } else {
        top.swal("错误!", res.msgBody.staInfo, "error");
    }
}
//调用chrome打印
function doPrint() {
    bdhtml=window.document.body.innerHTML;
    sprnstr="<!--startprint-->";
    eprnstr="<!--endprint-->";
    prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
    prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
    window.document.body.innerHTML=prnhtml;
    window.print();
    window.document.body.innerHTML=bdhtml;
    window.location.href=window.location.href;
}
function changeWeChat(){
	let fusername = $("#fusername").val(),
        fpassword = $("#fpassword").val();
	if(!fusername && !fpassword){
		d_alert("错误","请输入用户名和密码！");
	}
	_call('1001000151',{'fusername':fusername,'fpassword':fpassword},function(res){
		if(res.msgBody){
			d_alert(res.msgBody.staInfo)
		}
	})
}