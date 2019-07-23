var getConfig,
	//无车承运人公众号地址
	__path = "./doc/wccyrWeChat/",
	_path = './',
	//物流公众号地址
	wlTpl = "/tpl/wlWeChat/",
	ajaxNum = 0,
	isImei = '';

(function() {	
	$("head").append(`<link rel="stylesheet" href="https://at.alicdn.com/t/font_574298_n9u0vc6lkp.css">`);
})();
Date.prototype.Format = function(fmt) { //author: meizz
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
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}

function filtrationNull(info) {
	if (info || info == 0) {
		return info;
	} else {
		return "";
	}
}
//根据表单名字设值
function setValueByName(data) {

}
/*
 * 设置当前时间 向前或向后n毫秒的时间
 * n 时间戳 正值向前 负值向后
 * format 日期格式 默认yyyy-MM-dd
 * type  是否切割成年月日  默认切割
 * */
function setChangeTime(n, format, type) {
	format = format || "yyyy-MM-dd";
	var date = new Date(new Date().getTime() - n).Format(format); //获取当前的时间戳
	if (!type) {
		date = date.substring(0, 10)
	}
	return date;
}
String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof(args) == "object") {
			for (var key in args) {
				if (args[key] != undefined) {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				} else {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, "");
				}
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
}

function jumpFunction(url, params) {
	if (url) {
		if (params) {
			var _text = url;
			if (_text.indexOf('?') > -1) {
				_text = _text.split('?')[0];
			}
			sessionStorage.setItem(_text, JSON.stringify(params));
		}
		window.location.href = getConfig(url);
	}
};
//封装url URL后第一个参数已经有值
function jumpFunction1(url, params) {
	if (url) {
		if (params) {
			var _text = url;
			if (_text.indexOf('?') > -1) {
				_text = _text.split('?')[0];
			}
			sessionStorage.setItem(_text, JSON.stringify(params));
		}
		window.location.href = getConfig(url);
	}

};
// function jumpFunction1 (url,params) {
//     let _parameter = "";
//     if (url) {
//         if (params) {
//             for (var key in params) {
//                 if (params[key]) {
//                     _parameter = _parameter + "*"+key+"=" + encodeURI(params[key]);
//                 }
//             }
//         }
//         window.location.href =getConfig(url + _parameter);
//     }
//
// };

function tokenByCode(code, type, fun) {
	var _tempType = window.sessionStorage.getItem("userTokenType");
	if (_tempType && _tempType > 0 && _tempType < 4) {
		$.ajax({
			url: "/WeChat/checkUserByCode",
			data: {
				"code": code,
				"type": _tempType
			},
			type: "post",
			dataType: "json",
			success: function(data) {
				if (data.staInfoCode == 0) {
					if (fun) {
						fun(data)
					}
				} else if (data.staInfoCode == 2) {
					layer.alert("您尚未进行注册，请点击确认进入注册页面！", function() {
						window.location.href = getConfig(_path + "register.html");
					})
				} else if (data.staInfoCode == 1) {
					layer.alert("身份验证失效，请重新打开公众号！");
				}
			}
		})
	} else {
		layer.alert("您尚未进行注册，请点击确认进入注册页面！", function() {
			window.location.href = getConfig(_path + "register.html");
		})
	}

}
//首次获取token type无实际用途
function tokenByCode_first(code, fun) {
	$.ajax({
		url: "/WeChat/checkUserByCode",
		data: {
			"code": code,
			"type": 1
		},
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.staInfoCode == 0) {
				if (fun) {
					fun(data)
				}
			} else if (data.staInfoCode == 2) {
				layer.alert("您尚未进行注册，请点击确认进入注册页面！", function() {
					window.location.href = getConfig(_path + "register.html");
				})
			} else if (data.staInfoCode == 1) {
				layer.alert("身份验证失效，请重新打开公众号！");
			}
		}
	})
}
//个人中心刷新token  获取用户真正的角色信息
function tokenByCode_grzx(code, token, type, fun) {
	$.ajax({
		url: "/WeChat/checkUserByCode",
		data: {
			'code': code,
			"token": token,
			"type": type
		},
		type: "post",
		dataType: "json",
		success: function(data) {
			if (fun) {
				fun(data)
			}
		}
	})
}

function getUrlParams(names) {
	//获取？后面的参数
	var urlSearch = location.search;
	var urlPathName = location.pathname;
	var localData = sessionStorage.getItem(urlPathName);
	var urlValue = "";
	//如果缓存中有改值  直接返回
	if (localData && JSON.parse(localData)[names]) {
		return JSON.parse(localData)[names]
	}
	//以？*&来拆分
	var params = urlSearch.split(/[?*&]/);
	for (var i = 0; i < params.length; i++) {
		//如果url参数里包含传递过来names字段，则取=后面的部分
		var mapInfo = params[i].split("=");
		if (mapInfo[0] == names) {
			urlValue = decodeURIComponent(mapInfo[1]);
			return urlValue;
		}

	}
	return urlValue;
}

function getUrlString(names) {
	//获取？后面的参数
	var urlSearch = location.search;
	var urlPathName = location.pathname;
	var localData = sessionStorage.getItem(urlPathName);
	var urlValue = "";
	//如果缓存中有改值  直接返回
	if (localData && JSON.parse(localData)[names]) {
		return JSON.parse(localData)[names]
	}
	//以？*&来拆分
	var params = urlSearch.split(/[?*&]/);
	for (var i = 0; i < params.length; i++) {
		//如果url参数里包含传递过来names字段，则取=后面的部分
		if (params[i].indexOf(names) >= 0) {
			urlValue = decodeURIComponent(params[i].split("=")[1]);
			return urlValue;
		}
	}
	return urlValue;
}
// $(function(){
$.request = (function() {
	var apiMap = {};

	function request(queryStr) {
		var api = {};
		if (apiMap[queryStr]) {
			return apiMap[queryStr];
		}
		api.queryString = (function() {
			var urlParams = {};
			var e,
				d = function(s) {
					return decodeURIComponent(s.replace(/\+/g, " "));
				},
				q = queryStr.substring(queryStr.indexOf('?') + 1),
				r = /([^&=]+)=?([^&]*)/g;
			while (e = r.exec(q)) urlParams[d(e[1])] = d(e[2]);
			return urlParams;
		})();
		api.getUrl = function() {
			var url = queryStr.substring(0, queryStr.indexOf('?') + 1);
			for (var p in api.queryString) {
				url += p + '=' + api.queryString[p] + "&";
			}
			if (url.lastIndexOf('&') == url.length - 1) {
				return url.substring(0, url.lastIndexOf('&'));
			}
			return url;
		}
		apiMap[queryStr] = api;
		return api;
	}
	$.extend(request, request(window.location.href));
	return request;
})();
// })
// 获取url中的用户信息存到缓存中
function getUrlUserInfo() {
	let _packet_check = $.request.queryString['packet_check'],
		_packet_token = $.request.queryString['packet_token'],
		_packet_type = $.request.queryString['packet_type'],
		_fopenId = $.request.queryString['fopenId'],
		_fappId = $.request.queryString['fappId'];
	if (_packet_check && _packet_token && _packet_type && _fopenId && _fappId) {
		let _info = {
			'packet_check': _packet_check,
			'packet_token': _packet_token,
			'packet_type': _packet_type
		};
		window.localStorage.setItem('tokenInfo', JSON.stringify(_info));
		window.localStorage.setItem('fopenId', _fopenId);
		window.localStorage.setItem('fappId', _fappId);
	} else {
		// $.toast("获取用户信息失败，请重新认证！","cancel");
		//$("body").append($(`<div class="errorInfo-model"></div>`))
	}
}
//key 字段名称 type 是否需要格式化为json 0 默认格式化 1 不格式化
function getlocalStorage(key, type = 0) {
	let storage = window.localStorage.getItem(key);
	if (storage) {
		if (type == 0) {
			return JSON.parse(storage);
		} else {
			return storage;
		}
	} else {
		$.toast("获取用户信息失败！", "cancel");
		return false;

	}
}
// 检测注册时候的token sta : 0 本地无缓存 1 packet_type不等于openid 2 正常
function checkToken() {
	var locatory = getlocalStorage("fopenId", 1);
	if (locatory) {
		if (locatory != null && locatory.length > 10) {
			return true;
		}
	}
	return false;
}
// send msgBody中的内容  fileObj 对象 可以是多个对象
function _callWe(code, url, send, func, aSynSta, ajaxOption) {
	ajaxNum++;
	$.showLoading()
	ajaxcallAPI(code, url, send, function(res) {
		ajaxNum--;
		if (ajaxNum == 0) {
			$.hideLoading()
		}
		func(res);
	}, function(res) {
		//超时时间
		ajaxNum--;
		if (ajaxNum == 0) {
			$.hideLoading()
		}
		if (ajaxOption['timeout']) {
			if (func) func(res);
		} else {
			$.toast("网络超时，请稍后重试", "cancel");
		}
	}, function() {
		ajaxNum--;
		if (ajaxNum == 0) {
			$.hideLoading()
		}
		$.toast("网络错误，请稍后重试", "cancel");
	}, getHeaderObj(), aSynSta, ajaxOption);
}
// 只穿code版
function _callWe_noUrl(code, url, send, func, aSynSta, ajaxOption) {
	ajaxNum++;
	$.showLoading();
	ajaxcallAPI(code, url, send, function(res) {
		ajaxNum--;
		if (ajaxNum == 0) {
			$.hideLoading()
		}
		func(res);
	}, function(res) {
		//超时时间
		ajaxNum--;
		if (ajaxNum == 0) {
			$.hideLoading()
		}
		if (ajaxOption['timeout']) {
			if (func) func(res);
		} else {
			$.toast("网络超时，请稍后重试", "cancel");
		}
	}, function() {
		ajaxNum--;
		if (ajaxNum == 0) {
			$.hideLoading()
		}
		$.toast("网络错误，请稍后重试", "cancel");
	}, getHeaderObj(), aSynSta, ajaxOption);
}

function getHeaderObj() {
	var _userInfo = getUserInfo(0),
		_headerObj;
	if (_userInfo) {
		_headerObj = "packet_type;" + _userInfo.packet_type + "#packet_token;" + _userInfo.packet_token + "#packet_check;" +
			_userInfo.packet_check;
	}
	return _headerObj;
}
//获取用户信息 t=0  token信息 1 用户信息
function getUserInfo(t) {
	var _storage = window.localStorage,
		_tokenInfo = _storage.getItem("tokenInfo"),
		_userInfo = _storage.getItem("userInfo"),
		_info = "";
	if (!_tokenInfo || _tokenInfo == null) {
		return null;
	} else {
		if (t == 1) {
			_info = JSON.parse(_userInfo);
		} else {
			_info = JSON.parse(_tokenInfo);
		}
		return _info;
	}
}
//var api_base = getApiBase();
// var api_base="http://wl.56ps.cn:8893";
 var api_base="http://192.168.1.167:8893";
 // var api_base="http://192.168.1.169:8893";


function getApiBase() {
	var curServerPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = 0;
	if (pathName && typeof(pathName) != "undefined" && pathName.length > 1) {
		pos = curServerPath.indexOf(pathName);
	} else {
		pos = curServerPath.length - 1;
	}
	var serverPath = curServerPath.substring(0, pos);
	//在生产服务器 获取接口数据不走域名服务器转发
	if (serverPath.indexOf('56ps.cn') != -1 && serverPath.indexOf('56ps.cn:8893') < 0) {
		serverPath = serverPath + ":8893";
	}
	return serverPath;
}

//code 和 url 一起传
function ajaxcallAPI(foperationNo, fajaxUrl, sendObj, onSuccess, onTimeout, onError, headerObj, aSynSta, ajaxOption) {
	var msg = {};
	var sendData = {};
	sendData["msgId"] = foperationNo;
	sendData["serId"] = 0;
	sendData["type"] = 1;
	sendData["key"] = 0;
	sendData["source"] = 1;
	sendData["msgBody"] = sendObj;
	msg["msg"] = JSON.stringify(sendData);
	myajax(api_base + fajaxUrl,
		"POST",
		msg,
		onSuccess,
		onTimeout,
		onError, headerObj, aSynSta, ajaxOption
	);
}
//只传code
function ajaxcallAPI_noUrl(ajaxID, sendObj, onSuccess, onTimeout, onError, headerObj, aSynSta, ajaxOption) {
	var _storage = window.localStorage;
	var _userOperation = _storage.getItem("userOperation");
	if (_userOperation != null) {
		_userOperation = JSON.parse(_userOperation);
		$.each(_userOperation, function(i, v) {
			if (v['foperationNo'] == ajaxID) {
				var msg = {};
				var sendData = {};

				sendData["msgId"] = v['foperationNo'];
				sendData["serId"] = 0;
				sendData["type"] = v['fajaxCallBackType'];
				sendData["key"] = v['fajaxCheckType'];
				sendData["source"] = 1;
				sendData["msgBody"] = sendObj;
				msg["msg"] = JSON.stringify(sendData);
				myajax(
					api_base + v['fajaxUrl'],
					v['fajaxType'],
					msg,
					onSuccess,
					onTimeout,
					onError, headerObj, aSynSta, ajaxOption
				);
				return false;
			}
		});
	} else {
		noticeLogout("参数错误，请重新登录");
		return false;
	}
}

function myajax(url, fajaxType, dataInput, onSuccess, onTimeout, onError, headerObj, aSynSta, ajaxOption) {
	// FormData 对象
	var form = new FormData();
	// 可以增加表单数据
	form.append("msg", dataInput.msg); // 表单对象
	//增加文件上传对象  格式为json  {"文件名","文件"}
	if (ajaxOption && ajaxOption['fileObj'] && typeof(ajaxOption['fileObj']) != "undefined" && JSON.stringify(ajaxOption[
			'fileObj']) != '{}') {
		for (let key in ajaxOption['fileObj']) {
			form.append(key, ajaxOption['fileObj'][key]);
		}
	}
	if (headerObj && typeof(headerObj) != "undefined" && headerObj.length > 10) {
		var headerobjs = headerObj.split("#");
		for (var headnum = 0; headnum < headerobjs.length; headnum++) {
			var headObjstr = headerobjs[headnum].split(";");
			if (headObjstr.length == 2) {
				form.append(headObjstr[0], headObjstr[1])
			}
		}
	}
	// XMLHttpRequest 对象
	var xhr = new XMLHttpRequest();
	var xhrSyn = true; //默认异步
	if (typeof(aSynSta) != "undefined" && aSynSta == false) {
		xhrSyn = false;
	}
	//超时时间
	if (ajaxOption && ajaxOption['timeout']) {
		xhr.timeout = ajaxOption['timeout'];
	}
	xhr.open(fajaxType, url, xhrSyn);
	xhr.onload = function() {
		var res = JSON.parse(xhr.responseText);
		if (this.status >= 200 && this.status < 300) {
			_setTokenInfo(xhr.getResponseHeader("packet_type"), xhr.getResponseHeader("packet_token"), xhr.getResponseHeader(
				"packet_check"));
			onSuccess(res);
		} else if (onError != null && typeof onError == 'function') {
			onError(res);
		}
	};
	if (onTimeout != null && typeof onTimeout == 'function') {
		xhr.ontimeout = onTimeout;
	}
	if (onError != null && typeof onError == 'function') {
		xhr.onerror = onError;
	}
	xhr.send(form);
};

function _setTokenInfo(_packet_type, _packet_token, _packet_check) {
	if (_packet_check && _packet_check != null &&
		_packet_token && _packet_token != null &&
		_packet_type && _packet_type != null) {
		var _storage = window.localStorage;
		var jsonObj = new Object();
		jsonObj.packet_type = _packet_type;
		jsonObj.packet_token = _packet_token;
		jsonObj.packet_check = _packet_check;
		jsonObj.fcompanyId = _packet_type;
		jsonObj.fdatetime = new Date().getTime();
		var objString = JSON.stringify(jsonObj);
		_storage.setItem("tokenInfo", objString);
	}
}
//公共返回消息处理
function disposeInfo(res, func) {
	if (res.msgBody.sta == "ok" || !res.msgBody.sta) {
		if (func) func();
	} else if (res.msgBody.sta == "err") {
		$.toast(res.msgBody.staInfo, "cancel")
	} else if (res.msgBody.sta == "bzz") {
		$.toast(res.msgBody.staInfo, "cancel")
	} else {
		$.toast(res.msgBody.staInfo, "cancel")
	}
}
//通用查询验证非空 type false:不分页验证 true：多条数据分页验证
function searchInfo(data, fun, type = false) {
	if (!type) {
		if (data.msgBody && JSON.stringify(data.msgBody) != '{}') {
			if (fun) fun();
		} else {
			$.toast('警告,暂无数据！', 'cancel');
		}
	} else {
		if (data.msgBody && data.msgBody.pageOutBody.pageObjBody.length > 0) {
			if (fun) fun();
		} else {
			$.toast('警告,暂无数据！', 'cancel');
		}
	}

}
//验证是否有必填字段为填写 必填字段必须添加isRequired属性
function requiredData(DOM = "") {
	var isOk = true;
	if ($(DOM + " input[isRequired=true]").length > 0) {
		$(DOM + " input[isRequired=true]").each((i, v) => {
			if (!$(v).val()) {
				$.toptip($(v).attr("placeholder"), "error")
				isOk = false;
				return false;
			}
		})
	}
	return isOk;
}
// //收集表单数据为一个数组
$.formRequest = function(name) {
	var search = location.search.slice(1);
	var arr = search.split("&");
	for (var i = 0; i < arr.length; i++) {
		var ar = arr[i].split("=");
		if (ar[0] == name) {
			if (unescape(ar[1]) == 'undefined') {
				return "";
			} else {
				return unescape(ar[1]);
			}
		}
	}
	return "";
}
$(function() {
	//获取后台配置的微信静态授权链接
	var formatUrl;
	getConfig = function(url) {
		// if (!formatUrl) {
		//     $.ajax({
		//         url: "/WeChat/GetConfig",
		//         type: "post",
		//         dataType: "json",
		//         async: false,
		//         success: function (data) {
		//             if (data.backUrl) {
		//                 formatUrl = data.backUrl;
		//             } else {
		//                 layer.msg("服务器异常请重新加载", {
		//                     icon: 1,
		//                     time: 2000 //2秒关闭（如果不配置，默认是3秒）
		//                 }, function () {
		//                     WeixinJSBridge.invoke('closeWindow', {}, function (res) {
		//                     });
		//                 });
		//             }
		//         }
		//     })
		// };
		// return formatUrl.format(url);
		return url;
	}
})
//form收集表单
$.fn.formSerialize = function(formdate) {
	var element = $(this);
	if (!!formdate) {
		for (var key in formdate) {
			var $id = element.find('#' + key);
			var value = $.trim(formdate[key]).replace(/&nbsp;/g, '');
			var type = $id.attr('type');
			if (type) {
				if ($id.hasClass('weuiSelect')) {
					$id.attr("data-values", value).val(formdate[$id.attr('data-key')]);
				} else {
					switch (type) {
						case "checkbox":
							if (value == "true") {
								$id.attr("checked", 'checked');
							} else {
								$id.removeAttr("checked");
							}
							break;
						case "select":
							$id.val(value).trigger("change");
							break;
						default:
							$id.val(value);
							break;
					}
				}
			}
		};
		return false;
	}
	var postdata = {};

	element.find('input[name]:not([notSubmit])').each(function(r) {
		var $this = $(this);
		var id = $this.attr('name');
		var type = $this.attr('type');
		//如果是weiuiSelect  数据是放在data-values 中
		if ($this.hasClass('weuiSelect')) {
			postdata[id] = $this.attr("data-values") ? $this.attr("data-values") : "";
		} else {
			switch (type) {
				case "checkbox":
					postdata[id] = $this.is(":checked");
					break;
				default:
					var value = $this.val() == "" ? "" : $this.val();
					if (!$.formRequest("keyValue")) {
						value = value.replace(/&nbsp;/g, '');
					}
					postdata[id] = value;
					break;
			}
		}
	});
	return postdata;
};
//设置页面显示值
function setPageValue(Obj) {
	$.each(Obj, (i, v) => {
		if ($("#" + i).length > 0) {
			v = v ? v : "0";
			switch ($("#" + i)[0].tagName) {
				case "INPUT":
				case "SELECT":
					$("#" + i).val(v);
					break;
				default:
					$("#" + i).text(v);
					break;
			}
		}
	})
}
//调用jsjdk公共方法 jsjdkList 调用的jdk列表 fun回调函数
/*function getJsJdk(jsjdkList, fun) {
	//获取code
	var url = location.href.split('#')[0],
		sendObj = {
			"furl": url
		};
	_callWe("1001006007", "/WeChart/GetJsSDKInfo", sendObj, function(res) {
		if (res.msgBody) {
			var wxconfigdata = res.msgBody;
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，
				appId: wxconfigdata.appidInfo, // 必填，企业号的唯一标识，此处填写企业号corpid
				timestamp: wxconfigdata.timestamp, // 必填，生成签名的时间戳
				nonceStr: wxconfigdata.nonceStr, // 必填，生成签名的随机串
				signature: wxconfigdata.signature, // 必填，签名，见附录1
				jsApiList: jsjdkList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		} else {
			$.toast('获取授权失败，用户无权限！', "cancel")
		}
	}, false);
	wx.ready(function() {
		if (fun) fun();
	});
	//初始化jsapi接口 状态d
	wx.error(function(res) {
		alert("调用微信jsapi返回的状态:" + res.errMsg);
	});
}*/
//替换带有 /download 的路径
function setDownloadUrl(url) {
	if (url.indexOf("/download") > -1) {
		url = url.replace("/download", '/preview');
	}
	return url;
}
//上传到 nextCload
function upLoadImg(data, fun, type = false) {
	//type 异步上传还是同步上传  false同步 true异步
	let num = 0,
		val = {};
	if (Object.keys(data).length > 0) {
		let dataImg = [];
		$.each(data, (i, v) => {
			dataImg.push({
				'key': i,
				'val': v
			});
		})
		uploadImg_data(dataImg, 0, val, function(res) {
			fun(res);
		})
	} else if (fun) {
		fun(val)
	}
}

function uploadImg_data(data, num, resData, fun) {
	_callWe('1001007307', '/File/WxPublicFileUpload', {
		"imgBase64": data[num]['val']['base64']
	}, res => {
		resData[data[num]['key']] = setDownloadUrl(res['msgBody']['shareUrl']);
		num++;
		if (num == data.length && fun) {
			fun(resData)
		} else {
			uploadImg_data(data, num, resData, fun)
		}
	})
}
//初始化底部按钮列表
/*
 * dataList 对象格式{
 *   returnBtn：{}， 默认返回上一次点击
 *   mainBtn：[{'name':"抢单",'url':"DispatchOrderSearchByCz.html"},fun],''  数组或字符串格式 数组的话代表有二级菜单，字符串代表一级菜单直接跳转  如果fun有值会直接替换调跳转链接
 *   userCenter：{} 默认个人中心
 * }
 * */
class setTobar {
	constructor(dataList, DOM) {
		this.defaultOptoin = {
			returnBtn: {
				"html": "<div><i class='iconfont icon-fanhui'></i>返回</div>",
				onCLick: function() {
					window.history.back(-1);
				}
			},
			mainBtn: [],
			userCenter: {
				"html": "<div><i class='iconfont icon-gerenzhongxin'></i>个人中心</div>",
				onCLick: function() {
					let userType = window.localStorage.getItem('userType'),
						_url = '';
					//根据个人中心页面存储的userType决定个人中心跳转到哪一个页面
					if (userType) {
						switch (userType * 1) {
							case 1:
								_url = "hzGrzxIndexNew.html";
								break;
							case 2:
								_url = "czGrzxIndexNew.html";
								break;
							case 3:
								_url = "jsyGrzxIndexNew.html";
								break;
							case 4:
								_url = "xcddGrzxIndexNew.html";
								break;
						}
					} else {
						//如果没有缓存 默认跳转到车主个人中心
						_url = "czGrzxIndexNew.html";
					}
					window.location.href = _path + _url;
				}
			},
		};
		this.DOM = DOM || $("body");
		this.dataList = $.extend(true, {}, this.defaultOptoin, dataList);
		//默认列表展示最大角度
		this.rotateNum = 160;
		this.init();
	}
	init() {
		//拼接html
		this.joinHtml();
		//动态生成css属性
		this.addCss();
		//绑定事件
		this.bindEvent();
	}
	joinHtml() {
		//  拼装html
		let that = this,
			$html = $(
				`<div id="bottomTobar" class="">
                        <div class="text-center leftBtn"></div>
                        <div class="text-center centerList"></div>
                        <div class="text-center rightBtn"></div>
                    </div>`
			);
		//填充左侧按钮
		$html.children('.leftBtn').html(that.dataList['returnBtn']['html']).click(that.dataList['returnBtn']['onCLick']);
		//填充右侧按钮
		$html.children('.rightBtn').html(that.dataList['userCenter']['html']).click(that.dataList['userCenter']['onCLick']);
		//填充中间主按钮
		$html.children('.centerList').append(that.setCenterBtn(that.dataList['mainBtn']));
		console.log(that.dataList)
		that.DOM.append($html);
	}
	setCenterBtn(data) {
		// 中间主按钮html
		//type 1 数组数据，点击弹出按钮列表 2 单个按钮 直接跳转
		let _html = "";
		if (data.length > 1) {
			_html = $(
				`<div class="mainBtn">
                            <span>菜单</span>
                        </div>
                    <div id="parentList">
                    </div>
            `
			);
			$.each(data, (i, v) => {
				let DOM = $(`<div class="childList" url="${v.url}" >${v.name}</div>`);
				if (v['onClick']) {
					DOM.addClass('hasClick').click(v['onClick']);
				}
				_html.append(DOM)
			})
		} else if (data.length == 1) {
			_html = $(
				`<div class="mainBtn" url="${data[0]['url']}" >
                        <span>${data[0]['name']}</span>
                    </div>`
			);
			if (data[0]['onClick']) {
				_html.addClass('hasClick').click(data[0]['onClick']);
			}
		}
		return _html;
	}
	bindEvent() {
		$("#bottomTobar .mainBtn").click(function() {
			if (!$(this).hasClass('hasClick')) {
				if ($(this).attr('url')) {
					window.location.href = _path + $(this).attr("url");
				} else {
					$("#parentList div").toggleClass('show');
				}
			} else {
				console.log("已经执行绑定的点击事件")
			}
		})
		if ($("#parentList").length > 0) {
			$("#parentList .childList").click(function() {
				if (!$(this).hasClass('hasClick')) {
					window.location.href = _path + $(this).attr("url");
				} else {
					console.log("已经执行绑定的点击事件")
				}
			})
		}
	}
	addCss() {
		let that = this;
		if ($("#parentList").length > 0) {
			let _css = '';
			$("#parentList").children().each((i, v) => {
				_css +=
					`
                    .centerList .childList.show:nth-child(${i+1}){
                        transform: rotate(${-that.rotateNum/2 + Math.floor(that.rotateNum/($("#parentList").children().length+1)) * (i+1)}deg) translateY(-5rem);
                        opacity: 1;
                    }
                `;
			})
			if ($('head style').length > 0) {
				_css = $('head style').text() + _css;
			} else {
				$('head').append($("<style></style>"))
			}
			$('head style').text(_css)
		}
		$("body").css("marginBottom", $("#bottomTobar").height() + "px");
	}
}
document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();
            } else {
                webview.close(); //hide,quit按手机返回键直接退出APP
            }
        })
    });
});
