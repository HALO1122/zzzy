$(document).ready(function () {
	box_collapse();
	table_collapse();
	if ($(".table-hover").length) {
		$(".table-hover tr").on("click", function () {
			$(".table-hover tr").removeClass("active");
			$(this).addClass("active");
		});
	}
	if ($(".table-hover-mulit").length) {
		$(".table-hover-mulit").on("click", "tr", function () {
			//$(".table-hover tr").removeClass("active");
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
			}
			else {
				$(this).addClass("active");
			}
		});
	}
	if ($(".select_all").length) {
		$(".select_all").on("change", function () {
			var type = ".ic_01";
			if ($(this).is(":checked")) {
                //总的被选中时 触发子元素的change事件
                $(this).parent().parent().parent().parent().find(type).each(function(){
                    if(!$(this).hasClass("select_all")){
                        $(this).prop("checked", true).change();
                    }
                })
			}
			else {
                type = ".ic_01:checked";
                //总的被选中时 触发子元素的change事件
                $(this).parent().parent().parent().parent().find(type).each(function(){
                    if(!$(this).hasClass("select_all")){
                        $(this).prop("checked", false).change();
                    }
                })
			}
		});
	}
	setValidateForm();
});

/**
 * 增加参数 checkType 判断是否需要错误提示信息
 */
function setValidateForm(checkType) {
	checkType = checkType || 0;
	if ($(".validate-form").length > 0) {
		$(".validate-form").each(function (i, elem) {
			var config = {
				errorElement: "span",
				errorClass: "help-block error",
				focusCleanup: true,
				errorPlacement: function (e, t) {
					if (checkType == "0") {
						return t.parents(".controls").append(e);
					}

				},
				highlight: function (e) {
					return $(e).closest(".control-group").removeClass("error success").addClass("error");
				},
				success: function (e, t) {
					if (checkType == "0") {
						return e.closest(".control-group").removeClass("error").addClass("success");
					} else {
						return $(t.closest(".control-group")).removeClass("error").addClass("success");
					}

				}
			}
			if (checkType == "1") { config.ignore = "" }
			return $(elem).validate(config);
		});
	}
}
function setTitle_01(title_list, title_page, url_add) {
	if (title_page) $(".box-header:eq(0) > .title").text(title_page);
	if (title_list) $(".box-header:eq(1) > .title").text(title_list);

	if ($(".d_add").length) {
		$(".d_add").on("click", function () {
			getMyIframe().attr("src", url_add);
		});
	}
}
// function setTitle_02(title_add) {
// 	if (title_add) {
// 		$(".box-header:eq(0) > .title").text(title_add);
// 		$(".page-header > div.pull-left > h1 > span").text(title_add);
// 	}
// 	if ($(".d_back,.d_back2").length) {
// 		$(".d_back,.d_back2").on("click", function () {
// 			(parent.$(".J_iframe[data-id='" + config['url_page'] + "']"))[0].contentWindow.history.back();
// 		});
// 	}
// }
function setTitle_02(title_add,_type,_url){
    _url = _url || config["url_page"];
    if(title_add){
        $(".box-header > .title").text(title_add);
        $(".page-header > div.pull-left > h1 > span").text(title_add);
    }
    if($(".d_back").length){
        $(".d_back").on("click",function(){
            if(!_type){
                (parent.$(".J_iframe[data-id='"+_url+"']"))[0].contentWindow.history.back();
            }else{
                getMyIframe().attr("src",_url);
            }
        });
    }
}
function setTitle_03(title_left, title_right, title_page, url_search) {
	$(".green-background > .title").text(title_left);
	var dom_right = $(".blue-background > .title").length ? $(".blue-background > .title") : $(".orange-background > .title");
	dom_right.text(title_right);
	$(".dark-orange-background > .title").text(title_page);
	if ($(".d_search").length) {
		$(".d_search").on("click", function () {
			getMyIframe().attr("src", url_search);
		});
	}
}
function setTitle_04(title_list, title_page, url_page) {
	$(".box-header:eq(0) > .title").text(title_page);
	$(".box-header:eq(1) > .title").text(title_list);

	if ($(".d_back,.d_back2").length) {
		$(".d_back,.d_back2").on("click", function () {
			getMyIframe().attr("src", url_page);
		});
	}
}
function setTitle_05(title_left, title_right, title_page, url_page) {
	$(".box-header > .title").text(title_page);
	$(".page-header > div.pull-left > h1 > span").text(title_page);

	$(".green-background > .title").text(title_left);
	var dom_right = $(".blue-background > .title").length ? $(".blue-background > .title") : $(".orange-background > .title");
	dom_right.text(title_right);
	$(".dark-orange-background > .title").text(title_page);

	if ($(".d_back,.d_back2").length) {
		$(".d_back,.d_back2").on("click", function () {
			getMyIframe().attr("src", url_page);
		});
	}
}
function setTitle_06(title_list, title_page, url_add, url_page) {
	$(".box-header:eq(0) > .title").text(title_page);
	$(".box-header:eq(1) > .title").text(title_list);

	if ($(".d_back,.d_back2").length) {
		$(".d_back,.d_back2").on("click", function () {
			getMyIframe().attr("src", url_page);
		});
	}
	if ($(".d_add").length) {
		$(".d_add").on("click", function () {
			getMyIframe().attr("src", url_add);
		});
	}
}
function setTitle_07(title_left, title_right, title_page, url_add, url_search) {
	$(".green-background > .title").text(title_left);
	var dom_right = $(".blue-background > .title").length ? $(".blue-background > .title") : $(".orange-background > .title");
	dom_right.text(title_right);
	$(".dark-orange-background > .title").text(title_page);
	if ($(".d_search").length) {
		$(".d_search").on("click", function () {
			getMyIframe().attr("src", url_search);
		});
	}
	if ($(".d_add").length) {
		$(".d_add").on("click", function () {
			getMyIframe().attr("src", url_add);
		});
	}
}
function setTitle_08(title_page, url_page) {
	$(".page-header > div.pull-left > h1 > span").text(title_page);

	if ($(".d_back,.d_back2").length) {
		$(".d_back,.d_back2").on("click", function () {
			getMyIframe().attr("src", url_page);
		});
	}
}
function setTitle_09(title_list, url_add) {
	if (title_list) $(".box-header .title").text(title_list);

	if ($(".d_add").length) {
		$(".d_add").on("click", function () {
			getMyIframe().attr("src", url_add);
		});
	}
}
function setPagination(pDom, pSize, pCount, func) {
	var titlestrtemp = $(".box-header:eq(1) > .title").text();
	titlestrtemp = titlestrtemp.replace(/共[0-9]+条/, '');
	$(".box-header:eq(1) > .title").text(titlestrtemp);
	if (!pDom.text() || "" == pDom.text()) {
		if (pDom.length) {
			if (pSize == "1" && pCount == "1") {
				//d_alert("提示","暂无数据","info");
				pDom.text("暂无数据");
			} else {
				if (pCount > 0) {
					var titlestr = $(".box-header:eq(1) > .title").text();
					$(".box-header:eq(1) > .title").text(titlestr + "   共" + pCount + "条");
				}
				if (pSize == 1 && pCount == 1 && "暂无数据" != pDom.text()) {
					pDom.pagination('destroy');
				} else {
					pDom.pagination({
						pageSize: pSize,
						total: pCount
					});
				}
				pDom.on("pageClicked", function (event, data) {
					func(data.pageIndex, data.pageSize);
				});
			}
		}
	} else if (pSize == 1 && pCount == 1 && "暂无数据" != pDom.text()) {
		pDom.pagination('destroy');
	}
}
function setSearch(pDom, func) {
	if ($(".d_search").length) {
		var _this = $(".d_search");
		_this.off("click").on("click", function () {
			let _status = JSON.parse(window.localStorage.getItem("pageScreenStatus")),
                pageNo = 0,
				pSize = 20,
				_setTable = ()=>{};
			if (pDom && pDom.text()) {
				if (pDom.length > 0 && "暂无数据" != pDom.text()) {
					pDom.pagination('destroy');
				} else {
					pDom.text("");
				}
			}
			if(_status[_page] && _status[_page]["_status"] == "true"){
                pageNo = "0";
                _setTable = ()=>{setTableFiltrate();}
			}
			func(pageNo,pSize,_setTable);
		});
	}
}
function setDelete(_key, _code) {
	$(".del").on("click", function () {
		var _this = $(this);
		var _fcompanyId = getUserInfo(0).fcompanyId;
		dqq_confirm("确定要删除吗？", function () {
			eval("var sendObj={" + _key + ":'" + _this.attr(_key) + "',fcompanyId:" + _fcompanyId + "}");
			sloading(function () {
				_call(_code, sendObj, function (res) {
					var notice_type = "error";
					if (res.msgBody.sta == "ok") {
						notice_type = "success"
					}
					d_alert("提示", res.msgBody.staInfo, notice_type);
					_this.parent().parent().remove();
				});
			}, 0);
		})
	});
}
function bindArea(d_province, d_city, d_country, aSynSta, v_province, v_city, v_country) {
	if (d_province.length) {
		var _fcompanyId = getUserInfo(0).fcompanyId;
		var _code = "1001000408";
		var sendObj = {
			"fparentAreaCode": "0",
			"fcompanyId": _fcompanyId,
			"fareaName": ""
		};
		_callaaaaa(_code, sendObj, function (res) {
			if (res.msgBody) {
				$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
					d_province.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
				})
				if (v_province) {
					d_province.val(v_province);
					d_province.change();
					//省的动作完成，绑定省的级联
					bindAreaProvinceChange(d_province, d_city);
				}
				else {
					d_province.change();
					//如果没有省的数据 则直接信息绑定
					bindAreaProvinceChange(d_province, d_city);
					bindAreaCityChange(d_city, d_country);
				}
				if (d_city && v_city) {
					var sendObj = {
						"fparentAreaCode": v_province,
						"fcompanyId": _fcompanyId,
						"fareaName": ""
					};
					_callaaaaa(_code, sendObj, function (res) {
						if (res.msgBody) {
							d_city.empty();
							$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
								d_city.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
							});

							d_city.val(v_city);
							d_city.change();
							//市的动作完成，绑定市的级联
							bindAreaCityChange(d_city, d_country);

							if (d_country && v_country) {
								var sendObj = {
									"fparentAreaCode": v_city,
									"fcompanyId": _fcompanyId,
									"fareaName": ""
								};
								_callaaaaa(_code, sendObj, function (res) {
									if (res.msgBody) {
										d_country.empty();
										$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
											d_country.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
										});
										d_country.val(v_country);
										d_country.change();
									};
								}, aSynSta);
							}
						};
					}, aSynSta);
				}
			};
		}, aSynSta);
	};
}
function bindAreaProvinceChange(d_province, d_city) {
	if (d_city) {
		d_province.on("change", function () {
			var sendObj = {
				"fparentAreaCode": $(this).val(),
				"fareaName": ""
			};
			_callaaaaa("1001000408", sendObj, function (res) {
				if (res.msgBody) {
					d_city.empty();
					$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
						d_city.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
					});
					d_city.change();
				};
			});
		});
	};
}

function bindAreaCityChange(d_city, d_country) {
	if (d_country) {
		d_city.on("change", function () {
			var sendObj = {
				"fparentAreaCode": $(this).val(),
				"fareaName": ""
			};
			_callaaaaa("1001000408", sendObj, function (res) {
				if (res.msgBody) {
					d_country.empty();
					$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
						d_country.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
					});
					d_country.change();
				};
			});
		});
	};
}


function bindAreaEmpty(d_province, d_city, d_country, v_province, v_city, v_country) {
    if (d_province.length) {
        var _fcompanyId = getUserInfo(0).fcompanyId;
        var _code = "1001000408";
        var sendObj = {
            "fparentAreaCode": "0",
            "fcompanyId": _fcompanyId,
            "fareaName": ""
        };
		_callaaaaa(_code, sendObj, function (res) {
            d_province.append("<option value='0'> </option>");
            if (res.msgBody) {
                $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                    d_province.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
                })
                if (v_province) {
                    bindAreaProvinceChangeEmpty(d_province, d_city);
                    d_province.val(v_province);
                    //省的动作完成，绑定省的级联
                    if (d_city && v_city) {
                        if(v_province!=0){
                            var sendObj = {
                                "fparentAreaCode": v_province,
                                "fcompanyId": _fcompanyId,
                                "fareaName": ""
                            };
							_callaaaaa(_code, sendObj, function (res) {
                                if (res.msgBody) {
                                    d_city.empty();
                                    d_city.append("<option value='0'> </option>");
                                    $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                                        d_city.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
                                    });
                                    d_city.val(v_city);
                                    //市的动作完成，绑定市的级联
                                    bindAreaCityChangeEmpty(d_city, d_country);

                                    if (d_country && v_country) {
                                        if(v_city!=0){
                                            var sendObj = {
                                                "fparentAreaCode": v_city,
                                                "fcompanyId": _fcompanyId,
                                                "fareaName": ""
                                            };
											_callaaaaa(_code, sendObj, function (res) {
                                                if (res.msgBody) {
                                                    d_country.empty();
                                                    d_country.append("<option value='0'> </option>");
                                                    $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                                                        d_country.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
                                                    });
                                                    d_country.val(v_country);
                                                };
                                            }, false);
                                        }

                                    }
                                };
                            }, false);
                        }

                    }

                }
                else {
                    d_province.change();
                    //如果没有省的数据 则直接信息绑定
                    bindAreaProvinceChangeEmpty(d_province, d_city);
                    bindAreaCityChangeEmpty(d_city, d_country);
                }

            };
        }, false);
    };
}
function bindAreaProvinceChangeEmpty(d_province, d_city,type) {
    if (d_city) {
        d_province.on("change", function () {
        	if($(this).val()!=0){
                var sendObj = {
                    "fparentAreaCode": $(this).val(),
                    "fareaName": ""
                };
				_callaaaaa("1001000408", sendObj, function (res) {
                    if (res.msgBody) {
                        d_city.empty();
                        if(!type) d_city.append("<option value='0'> </option>");
                        $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                            d_city.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
                        });
                        d_city.change();
                    };
                });
			}

        });
    };
}

function bindAreaCityChangeEmpty(d_city, d_country,type) {
    if (d_country) {
        d_city.on("change", function () {
            if($(this).val()!=0){
                var sendObj = {
                    "fparentAreaCode": $(this).val(),
                    "fareaName": ""
                };
				_callaaaaa("1001000408", sendObj, function (res) {
                    if (res.msgBody) {
                        d_country.empty();
                        if(!type) d_country.append("<option value='0'> </option>");
                        $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                            d_country.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
                        });
                        d_country.change();
                    };
                });
			}

        });
    };
}

function setFloatLimit(ids, num, type) {
	var _ids = ids.split(",");
	$.each(_ids, function (i, v) {
		$("#" + v).on("blur", function () {
			var _this = $(this);
			var _val = parseFloat(_this.val());
			if (_val != "") {
				if (!isNaN(_val)) {
					_this.val(_val.toFixed(num));
				}
			}
		});
	});
}
function setFloat(v, num) {
	var _val = parseFloat(v);
	if (_val != "") {
		if (!isNaN(_val)) {
			return _val.toFixed(num)
		}
	}
}
//获取民族
function bindNation(fnation) {
	if (fnation.length) {
		var _trs = '<option value="汉族">汉族</option><option value="蒙古族">蒙古族</option><option value="彝族">彝族</option><option value="侗族">侗族</option><option value="哈萨克族">哈萨克族</option><option value="畲族">畲族</option><option value="纳西族">纳西族</option><option value="仫佬族">仫佬族</option><option value="仡佬族">仡佬族</option><option value="怒族">怒族</option><option value="保安族">保安族</option><option value="鄂伦春族">鄂伦春族</option><option value="回族">回族</option><option value="壮族">壮族</option><option value="瑶族">瑶族</option><option value="傣族">傣族</option><option value="高山族">高山族</option><option value="景颇族">景颇族</option><option value="羌族">羌族</option><option value="锡伯族">锡伯族</option><option value="乌孜别克族">乌孜别克族</option><option value="裕固族">裕固族</option><option value="赫哲族">赫哲族</option><option value="藏族">藏族</option><option value="布依族">布依族</option><option value="白族">白族</option><option value="黎族">黎族</option><option value="拉祜族">拉祜族</option><option value="柯尔克孜族">柯尔克孜族</option><option value="布朗族">布朗族</option><option value="阿昌族">阿昌族</option><option value="俄罗斯族">俄罗斯族</option><option value="京族">京族</option><option value="门巴族">门巴族</option><option value="维吾尔族">维吾尔族</option><option value="朝鲜族">朝鲜族</option><option value="土家族">土家族</option><option value="傈僳族">傈僳族</option><option value="水族">水族</option><option value="土族">土族</option><option value="撒拉族">撒拉族</option><option value="普米族">普米族</option><option value="鄂温克族">鄂温克族</option><option value="塔塔尔族">塔塔尔族</option><option value="珞巴族">珞巴族</option><option value="苗族">苗族</option><option value="满族">满族</option><option value="哈尼族">哈尼族</option><option value="佤族">佤族</option><option value="东乡族">东乡族</option><option value="达斡尔族">达斡尔族</option><option value="毛南族">毛南族</option><option value="塔吉克族">塔吉克族</option><option value="德昂族">德昂族</option><option value="独龙族">独龙族</option><option value="基诺族">基诺族</option>';
		fnation.html(_trs);
	}
}

//通用绑定查询
function bindSearch(_dom, type1, type2, type3, callback,type4,aSynStaType) {
	type3 = type3 || 0;
    type4 = type4 || "-1";
	callback = callback || null;
	var aSynSta = true;
	if(aSynStaType != null && aSynStaType != undefined){
		aSynSta = false;
	}
	if (_dom.length) {
		var _code, key_value, key_name;
		var sendObj = { "msgBody": "" };
		var _fcompanyId = getUserInfo(0).fcompanyId;
		switch (type1) {
			case 1:
				//货物状态
				_code = "1001001901";
				key_value = "fgoodsStatusNo";
				key_name = "fgoodsStatusName";
				break;
			case 2:
				//发货单状态
				_code = "1001001712";
				key_value = "fstatusNo";
				key_name = "fstatusName";
				break;
			case 3:
				//发货单组状态
				_code = "1001001710";
				key_value = "fgroupStatusNo";
				key_name = "fgroupStatusName";
				break;
			case 4:
				//票据类型
				_code = "1001001714";
				key_value = "ftypeNo";
				key_name = "ftypeName";
				break;
			case 5:
				aSynSta = false;
				//获取职务
				_code = "1001000504";
				key_value = "fpostNo";
				key_name = "fname";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fdepartmentNo": "",
					"fpostNo": "",
					"fname": "",
					"fisAbled": "-1",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 6:
				//获取网点
				_code = "1001000706";
				key_value = "fsiteNo";
				key_name = "fname";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fname": "",
					"fsiteNo": "",
					"ftype": type2,
					"flevel": type4,
					"fshowCom": type3,
					"msgid": _code,
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 7:
				//获取票据状态
				_code = "1001001903";
				key_value = "fticketStatusNo";
				key_name = "fticketStatusName";
				break;
			case 8:
				//获取代收款状态
				_code = "1001001905";
				key_value = "fcodstatusNo";
				key_name = "fcodstatusName";
				break;
			case 9:
				//获取临时订单号
				_code = "1001001803";
				key_value = "ftempOrderNo";
				key_name = "ftempOrderNo";
				break;
			case 10:
				//获取付款方式
				_code = "1001000904";
				key_value = "fpayTypeNo";
				key_name = "fpayName";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fpayTypeNo": "-1",
					"fpayName": "",
					"fisAbled": "1",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 11:
				//获取车辆
				_code = "1001002104";
				key_value = "ftruckNo";
				key_name = "fplateNo";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fplateNo": "",
					"fsiteNo": "",
					"fownerType": "-1",
					"ftruckType": "",
					"fisAbled": "1",
					"fisHasGps": "-1",
					"fplateColor": "-1",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 12:
				//获取分级部门
				_code = "1001000608";
				key_value = "fdepartmentNo";
				key_name = "fdepartmentName";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fdepartmentName": "",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 13:
				//获取公司银行
				_code = "1001000610";
				key_value = "fbankAccountNo";
				key_name = "fbankName";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fdepartmentNo": type2
				};
				break;
			case 14:
				//保值费用比率
				_code = "1001001809";
				key_value = "fratioNo";
				key_name = "fhedgeRatio";
				break;
			case 15:
				//获取网点
				_code = "1001000706";
				key_value = "fsiteNo";
				key_name = "fname";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fname": "",
					"fsiteNo": "",
					"ftype": type2,
					"flevel": "2",
					"fshowCom": "1",
					"msgid": _code,
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 16:
				//获取票据状态
				_code = "1001001308";
				key_value = "fjobNo";
				key_name = "frealName";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fjobNo": "",
					"frealName": "",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 17:
				//获取用户组
				_code = "1001000323";
				key_value = "froleNo";
				key_name = "froleName";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"froleNo": "",
					"froleName": "",
					"fremark": "",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 18:
				//获取限制站点
				_code = "1001000712";
				key_value = "fsiteNo";
				key_name = "fname";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fname": "",
					"fsiteNo": "",
					"ftype": type2,
					"flevel": "-1",
					"fshowCom": type3,
					"msgid": _code,
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 19:
				//获取运单费用计算比率
				_code = "1001001004";
				key_value = "ffeeRatio";
				key_name = "ffeeName";
				sendObj = {
					"ffeeNo": "",
					"ffeeName": "",
					"fisAbled": "1",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 20:
				//客户信息获取
				_code = "1001001004";
				key_value = "ffeeRatio";
				key_name = "ffeeName";
				sendObj = {
					"ffeeNo": "",
					"ffeeName": "",
					"fisAbled": "1",
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
			case 21:
				//银行类型列表
				_code = "1001001611";
				key_value = "fbankType";
				key_name = "fbankName";
				sendObj = {
                    "fcompanyId": getUserInfo(0).fcompanyId,
                    "fbankName": '',
					"pageSetBody": { "pageNo": 0, "pageSize": "999" }
				};
				break;
			case 0:
				//获取公司
				_code = "1001000604";
				key_value = "fdepartmentNo";
				key_name = "fdepartmentName";
				sendObj = {
					"fcompanyId": _fcompanyId,
					"fdepartmentNo": "",
					"fdepartmentName": "",
					"fisAbled": "-1",
					"ftype": type2,
					"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
				};
				break;
		}

		_call(_code, sendObj, function (res) {
			if (res.msgBody) {
				if (type1 == 12) {
					//分级部门特殊处理
					/*
					 var _oNoLength=v.forganizationNo.length;
					 var _space="";
					 for(var i=1;i<=_oNoLength;i++){
					 _space+="&nbsp;";
					 }
					 _dom.append("<option value='"+v[key_value]+"' fparentNo='"+v.fparentNo+"' forganizationNo='"+v.forganizationNo+"' fdepartmentNo='"+v.fdepartmentNo+"'>"+_space+v[key_name]+"</option>");
					 */
					function treeMenu(a) {
						this.tree = a || [];
						this.groups = {};
					};
					treeMenu.prototype = {
						init: function (forganizationParentNo) {
							this.group();
							return this.getDom(this.groups[forganizationParentNo]);
						},
						group: function () {
							for (var i = 0; i < this.tree.length; i++) {
								if (this.groups[this.tree[i].forganizationParentNo]) {
									this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
								}
								else {
									this.groups[this.tree[i].forganizationParentNo] = [];
									this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
								}
							}
						},
						getDom: function (a) {
							if (!a) { return '' }
							var data_01 = new Array();
							for (var i = 0; i < a.length; i++) {
								var _oNoLength = a[i].forganizationNo.length;
								var _space = "";
								for (var k = 1; k <= _oNoLength; k++) {
									if (k % 2 == 0) _space += "&nbsp;";

								}

								_dom.append("<option value='" + a[i][key_value] + "' fparentNo='" + a[i].fparentNo + "' forganizationNo='" + a[i].forganizationNo + "' fdepartmentNo='" + a[i].fdepartmentNo + "'>" + _space + a[i][key_name] + "</option>");

								var hasChild = this.groups[a[i].forganizationNo];
								if (hasChild) {
									this.getDom(hasChild)
								}

							}
							return data_01;
						}
					};
					result = new treeMenu(res.msgBody.pageOutBody.pageObjBody).init(0);
				}
				else if (type1 == 14) {
					$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
						_dom.append("<option value='" + v[key_name] + "' fratioNo='" + v['fratioNo'] + "'> ÷ " + v[key_name] * 1000 + "‰</option>");
					});
				}
				else if (type1 == 20) {
					// 添加客户页面下拉选择框
					$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
						_dom.append("<option value='" + v[key_name] + "' fratioNo='" + v['fratioNo'] + "'> ÷ " + v[key_name] * 1000 + "‰</option>");
					});
				}
				else {
					$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
						_dom.append("<option value='" + v[key_value] + "'>" + v[key_name] + "</option>");
					});
				}
				if (callback) {
					callback();
				}
			}
		}, aSynSta);

	}
}
function getText_disable(_type) {
	var _text = "";
	if (_type == 1) {
		_text = "<span class='f_green'>是</span>";
	}
	else {
		_text = "<span class='f_red'>否</span>";
	}
	return _text;
}
function getTdOperate(_type, url_add, fid, key, key_field) {
	var _add = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-success btn-mini' href='javascript:void(0);' title='添加'>添加</a>";
	var _edit = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "&rtype=edit' class='btn btn-primary btn-mini' href='javascript:void(0);' title='修改'>修改</a>";
	var _del = "<a class='btn btn-danger btn-mini del' href='javascript:void(0);' title='删除' fid='" + fid + "' " + key + "='" + key_field + "'>删除</a>";
	var _view = "<a class='btn btn-success btn-mini view' href='javascript:void(0);' title='查看' " + key + "='" + key_field + "'>查看</a>";
	var _jiechuguashi = "<a class='btn btn-info btn-mini jiechuguashi' href='javascript:void(0);' title='解除挂失' " + key + "='" + key_field + "'>解除挂失</a>";
	var _buquan = "<a class='btn btn-info btn-mini buquan' href='javascript:void(0);' title='补全录入' " + key + "='" + key_field + "'>补全录入</a>";
	var _zuofei = "<a class='btn btn-info btn-mini zuofei' href='javascript:void(0);' title='作废' " + key + "='" + key_field + "'>作废</a>";
	var _tuihuo_request = "<a href='" + url_add + "?" + key + "=" + key_field + "' class='btn btn-info btn-mini' href='javascript:void(0);' title='处理退货申请' " + key + "='" + key_field + "'>处理退货申请</a>";
	var _guashi = "<a class='btn btn-info btn-mini guashi' href='javascript:void(0);' title='挂失' fsendSiteNo=" + fid + " " + key + "='" + key_field + "'>挂失</a>";
	var _lipei = "<a class='btn btn-info btn-mini lipei' href='javascript:void(0);' title='理赔授理' " + key + "='" + key_field + "'>理赔授理</a>";
	var _shenhe = "<a href='" + url_add + "?" + key + "=" + key_field + "' class='btn btn-info btn-mini shenhe' href='javascript:void(0);' title='审核' " + key + "='" + key_field + "'>审核</a>";
	//var _shenhe2="<a href='"+url_add+"?fchangeApplyNo="+fid+"&"+key+"="+key_field+"' class='btn btn-info btn-mini shenhe' href='javascript:void(0);' title='审核' "+key+"='"+key_field+"'>审核</a>";
	var _shenhe2 = "<a href='javascript:void(0);' class='btn btn-info btn-mini shenhe' title='审核' fchangeApplyNo='" + fid + "' " + key + "='" + key_field + "'>审核</a>";
	var _chulituihuo = "<a href='" + url_add + "?" + key + "=" + key_field + "' class='btn btn-info btn-mini' href='javascript:void(0);' title='处理退货' " + key + "='" + key_field + "'>处理退货</a>";
	var _dayin = "<a class='btn btn-info btn-mini dayin' href='javascript:void(0);' title='打印' " + key + "='" + key_field + "'>打印</a>";
	var _view2 = "<a class='btn btn-success btn-mini view' href='javascript:void(0);' title='查询驳回原因' " + key + "='" + key_field + "'>查询驳回原因</a>";
	var _view3 = "<a class='btn btn-success btn-mini view' href='javascript:void(0);' title='查看' fchangeApplyNo='" + fid + "' " + key + "='" + key_field + "'>查看</a>";
	var _guanli = "<a class='btn btn-info btn-mini guanli' href='javascript:void(0);' title='流水管理'>流水管理</a>";
	var _shangbao = "<a class='btn btn-success btn-mini shangbao' href='javascript:void(0);' title='流水上报'>流水上报</a>";

	if (_type == 1) {
		return _add;
	}
	else if (_type == 2) {
		return _edit;
	}
	else if (_type == 3) {
		return _del;
	}
	else if (_type == 4) {
		return _add + "&nbsp;" + _edit;
	}
	else if (_type == 5) {
		return _add + "&nbsp;" + _del;
	}
	else if (_type == 6) {
		return _edit + "&nbsp;" + _del;
	}
	else if (_type == 7) {
		return _add + "&nbsp;" + _edit + "&nbsp;" + _del;
	}
	else if (_type == 8) {
		return _view;
	}
	else if (_type == 9) {
		return _edit + "&nbsp;" + _view;
	}
	else if (_type == 10) {
		return _jiechuguashi;
	}
	else if (_type == 11) {
		return _edit + "&nbsp;" + _buquan;
	}
	else if (_type == 12) {
		return _zuofei;
	}
	else if (_type == 13) {
		return _tuihuo_request;
	}
	else if (_type == 14) {
		return _guashi;
	}
	else if (_type == 15) {
		return _lipei;
	}
	else if (_type == 16) {
		return _shenhe;
	}
	else if (_type == 17) {
		return _shenhe2;
	}
	else if (_type == 18) {
		return _chulituihuo;
	}
	else if (_type == 19) {
		return _dayin;
	}
	else if (_type == 20) {
		return _view2;
	}
	else if (_type == 21) {
		return _view3;
	}
	else if (_type == 22) {
		//上报功能不全 暂时删除按钮
		// return _edit + "&nbsp;" + _guanli + "&nbsp;" + _shangbao;
		return _edit + "&nbsp;" + _guanli ;
	}
	else if (_type == 23) {
		// return _edit + "&nbsp;" + _guanli + "&nbsp;" + _shangbao;
		return _guanli ;
	}
}
//增加一行
function addRowFluid(addButton, delButton, wrapid, rowNumId, rowFluid) {
	if (addButton.length) {
		addButton.on("click", function () {
			var rowNumobj = $("#" + rowNumId);
			rowNumobj.val(parseInt(rowNumobj.val()) + 1);
			// var addContent=$(this).parent().html();
			var rowContent = $("#" + wrapid).find("." + rowFluid + ":hidden").html();
			var rowid = wrapid + "_" + rowNumobj.val();
			var delContent = "<button type='button' class='btn btn-danger span12 " + delButton + "' onclick='delRowFluid(\"" + rowid + "\",\"" + rowNumId + "\");' >删除</button>";

			rowContent = rowContent.replace('<delarea>', delContent);
			$("#" + wrapid).append("<div class='" + rowFluid + " " + wrapid + "' id='" + rowid + "'>" + rowContent + "</div>");
			$("#" + rowid + " ._select2").select2();
		});
	}
}
function addRowFluid_01(addButton, wrapid, rowNumId, rowFluid, autoNum) {
	var _add = function () {
		var rowNumobj = $("#" + rowNumId);
		rowNumobj.val(parseInt(rowNumobj.val()) + 1);
		if($("#" + wrapid).find("." + rowFluid + ":hidden").length>0){
            var _body = $("#" + wrapid).find("." + rowFluid + ":hidden");
        }else{
            var _body = $("#" + wrapid).find("." + rowFluid);
		}
		var rowContent = _body.html();
		var rowid = wrapid + "_" + rowNumobj.val();
		var delContent = "<button type='button' class='btn btn-danger span12 d_delRow' onclick='delRowFluid(\"" + rowid + "\",\"row-fluid\");' >删除</button>";

		rowContent = rowContent.replace('<delarea>', delContent);
		$("#" + wrapid).append("<div class='" + rowFluid + " " + wrapid + "' id='" + rowid + "'>" + rowContent + "</div>");
		$("#" + rowid + " ._select2").select2();
		if(_page == "cashlow_add"){
			$("#"+rowid).find(".body_dist_title").text("流水"+rowNumobj.val()+"：")
		}
	}
	if (autoNum > 0) {
		for (var i = 0; i < autoNum; i++) {
			_add();
		}
	}
	else {
		if (addButton.length) {
			addButton.on("click", function () {
				_add();
			});
		}
	}
}
function delRowFluid(rowid, rowNumId) {
	$("#" + rowid).remove();
	$("#" + rowNumId).val(parseInt($("#" + rowNumId).val()) - 1);
}
//校验发货单组票号
function isTicketNoCheck(ticketNo, ticketNo2, type) {
	var _fcompanyId = getUserInfo(0).fcompanyId;

	if (type == 1) {
		//校验发货单组开始票号是否正确
		var _code = "1001001702";
		var sendObj = {
			"fstartNo": ticketNo,
			"fcompanyId": _fcompanyId
		};
	}
	else if (type == 2) {
		//校验发货单组结束票号是否正确
		var _code = "1001001703";
		var sendObj = {
			"fendNo": ticketNo,
			"fcompanyId": _fcompanyId
		};
	}
	else {
		//校验发货单组票段是否正确
		var _code = "1001001704";
		var sendObj = {
			"fstartNo": ticketNo,
			"fendNo": ticketNo2,
			"fcompanyId": _fcompanyId
		};
	}

	_call(_code, sendObj, function (res) {
		if (res.msgBody) {
			if (res.msgBody.sta == "ok") {

			}
			else {
				d_alert("错误!", res.msgBody.staInfo, "error");
			}
		}
	});
}
function CheckMemberSta(fmemberCardNo, fname, fidcardNo, type) {
	var _fcompanyId = getUserInfo(0).fcompanyId;
	var sendObj = {
		"fname": fname,
		"fmemberCardNo": fmemberCardNo,
		"fidcardNo": fidcardNo,
		"fcompanyId": _fcompanyId
	};
	_call('1001001604', sendObj, function (res) {
		if (res.msgBody.sta == "eroor") {
			return false;
		}
		else {
			return true;
		}
	});
}
function numToDX(num) {
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
function showDispatchOrderDetail(fdispatchOrderNo, func) {
	if (fdispatchOrderNo != "") {
		var _html = '<iframe width="100%" height="500" frameborder="0" src="' + _dir + 'dispatchOrderEnteredSearchManager_detail.html?id=' + fdispatchOrderNo + '"></iframe>';
		if (func) {
			top.swal({
				//customClass:"dqq_dialog_02",
				width: "1000",
				allowOutsideClick: false,
				showCloseButton: true,
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				html: _html
			}).then(function (isConfirm) {
				if (isConfirm === true) {
					func();
				}
			});
		}
		else {
			top.swal({
				//customClass:"dqq_dialog_02",
				width: "1000",
				allowOutsideClick: false,
				showCloseButton: true,
				showConfirmButton: false,
				html: _html
			});
		}

	}
	else {
		d_alert("提示", "请输入运单号", "error");
	}
}
function showLoadListDetail(floadListNo) {
	top.swal({
		width: "800",
		allowOutsideClick: false,
		showCloseButton: true,
		showConfirmButton: false,
		html: '<iframe width="100%" height="400" frameborder="0" src="' + _dir + 'loadListInfo_detail.html?id=' + floadListNo + '"></iframe>'
	});
}
function getPlateColor(fplateColor) {
	var color_text = "";
	switch (fplateColor) {
		case 1:
			color_text = "蓝";
			break;
		case 2:
			color_text = "黄";
			break;
		case 3:
			color_text = "白";
			break;
		case 4:
			color_text = "黑";
			break;
		case 9:
			color_text = "其他";
			break;
	}
	return color_text;
}
function getText_truckType(_type) {
	var _text = "";
	if (_type == 1) {
		_text = "直属车辆";
	}
	else if (_type == 2) {
		_text = "挂靠车辆";
	}
	else if (_type == 3) {
		_text = "外来车辆";
	}
	return _text;
}
function getTreeList(type1, type2, callback,option={}) {
	type2 = type2 || 0;
	callback = callback || null;
	var sendObj = { "msgBody": "" };
	var _fcompanyId = getUserInfo(0).fcompanyId;
	var result;

	if (type1 == 1) {
		//获取公司部门多选
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fdepartmentName": "",
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001000608", sendObj, function (res) {
			if (res.msgBody) {
				function treeMenu(a) {
					this.tree = a || [];
					this.groups = {};
				};
				treeMenu.prototype = {
					init: function (forganizationParentNo) {
						this.group();
						return this.getDom(this.groups[forganizationParentNo]);
					},
					group: function () {
						for (var i = 0; i < this.tree.length; i++) {
							if (this.groups[this.tree[i].forganizationParentNo]) {
								this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);

							}
							else {
								this.groups[this.tree[i].forganizationParentNo] = [];
								this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
							}
						}
					},
					getDom: function (a) {
						if (!a) { return '' }
						var data_01 = new Array();
						for (var i = 0; i < a.length; i++) {
							data_01[i] = new Array();
							data_01[i]['title'] = a[i].fdepartmentName;
							data_01[i]['key'] = a[i].forganizationNo;
							data_01[i]['fdepartmentNo'] = a[i].fdepartmentNo;

							var hasChild = this.groups[a[i].forganizationNo];
							if (hasChild) {
								data_01[i]['folder'] = true;
								data_01[i]['expanded'] = true;
								data_01[i]['children'] = this.getDom(hasChild);
							}
						};
						return data_01;
					}
				};
				result = new treeMenu(res.msgBody.pageOutBody.pageObjBody).init(0);
				if (callback) {
					callback(result);
				}
			}
		}, false);
	}
	else if (type1 == 2) {
		//获取公司部门单选[公司组织机构设置用]
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fdepartmentName": "",
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001000608", sendObj, function (res) {
			if (res.msgBody) {
				function treeMenu(a) {
					this.tree = a || [];
					this.groups = {};
				};
				treeMenu.prototype = {
					init: function (forganizationParentNo) {
						this.group();
						return this.getDom(this.groups[forganizationParentNo]);
					},
					group: function () {
						for (var i = 0; i < this.tree.length; i++) {
							if (this.groups[this.tree[i].forganizationParentNo]) {
								this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
							}
							else {
								this.groups[this.tree[i].forganizationParentNo] = [];
								this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
							}
						}
					},
					getDom: function (a) {
						if (!a) { return '' }
						var data_01 = new Array();
						for (var i = 0; i < a.length; i++) {
							data_01[i] = new Array();
							data_01[i]['title'] = a[i].fdepartmentName;
							data_01[i]['key'] = a[i].forganizationNo;
							data_01[i]['fdepartmentNo'] = a[i].fdepartmentNo;
							data_01[i]['forganizationNo'] = a[i].forganizationNo;
							data_01[i]['forganizationType'] = a[i].forganizationType;
							data_01[i]['forganizationParentNo'] = a[i].forganizationParentNo;
							data_01[i]['fid'] = a[i].fid;

							var hasChild = this.groups[a[i].forganizationNo];
							if (hasChild) {
								data_01[i]['folder'] = true;
								data_01[i]['expanded'] = true;
								data_01[i]['children'] = this.getDom(hasChild);
							}
						};
						return data_01;
					}
				};
				result = new treeMenu(res.msgBody.pageOutBody.pageObjBody).init(0);
				if (callback) {
					callback(result);
				}
			}
		});
	}
	//网点结构
	else if (type1 == 3) {
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fname": "",
			"fsiteNo": "1",
			"ftype": "-1",
			"flevel": "-1",
			"fshowCom": type2,
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001000706", sendObj, function (res) {
			if (res.msgBody) {
				function treeMenu(a) {
					this.tree = a || [];
					this.groups = {};
				};
				treeMenu.prototype = {
					init: function (fupperSiteNo) {
						this.group();
						return this.getDom(this.groups[fupperSiteNo]);
					},
					group: function () {
						for (var i = 0; i < this.tree.length; i++) {
							if (this.groups[this.tree[i].fupperSiteNo]) {
								this.groups[this.tree[i].fupperSiteNo].push(this.tree[i]);
							}
							else {
								this.groups[this.tree[i].fupperSiteNo] = [];
								this.groups[this.tree[i].fupperSiteNo].push(this.tree[i]);
							}
						}
					},
					getDom: function (a) {
						if (!a) { return '' }
						var data_01 = new Array();
						for (var i = 0; i < a.length; i++) {
							data_01[i] = new Array();
							data_01[i]['title'] = a[i].fname;
							data_01[i]['key'] = a[i].fsiteNo;
							data_01[i]['fsiteNo'] = a[i].fsiteNo;
							data_01[i]['fupperSiteNo'] = a[i].fupperSiteNo;
							data_01[i]['fupperSiteName'] = a[i].fupperSiteName;

							var hasChild = this.groups[a[i].fsiteNo];
							if (hasChild) {
								data_01[i]['folder'] = true;
								data_01[i]['expanded'] = true;
								data_01[i]['children'] = this.getDom(hasChild);
							}
						};
						return data_01;
					}
				};
				result = new treeMenu(res.msgBody.pageOutBody.pageObjBody).init(0);
			}
		});
	}
	else if (type1 == 4) {
		//ztree用查询公司结构
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fdepartmentName": "",
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001000608", sendObj, function (res) {
			if (res.msgBody) {
				var data_01 = new Array();
				$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
					data_01[i] = new Array();
					data_01[i]['id'] = v.forganizationNo;
					data_01[i]['pId'] = v.forganizationParentNo;
					data_01[i]['fparentNo'] = v.fparentNo;
					data_01[i]['name'] = v.fdepartmentName;
					data_01[i]['forganizationType'] = v.forganizationType;
				});
				result = data_01;
				if (callback) {
					callback(result);
				}
			}
		});
	}
	else if (type1 == 5) {
		//ztree用查询网点
		//默认值为查询全部
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fname": "",
			"fsiteNo": option["fsiteNo"]!=undefined ? option["fsiteNo"] : "1",
			"ftype": option["ftype"]!=undefined ? option["ftype"] : "-1",
			"flevel": option["flevel"]!=undefined ? option["flevel"] : "-1",
			"fshowCom": type2,
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001000706", sendObj, function (res) {
			if (res.msgBody) {
				var data_01 = new Array();
				$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
					data_01[i] = new Array();
					data_01[i]['id'] = v.fsiteNo;
					data_01[i]['pId'] = v.fupperSiteNo;
					data_01[i]['fupperSiteName'] = v.fupperSiteName;
					data_01[i]['name'] = v.fname;
				});
				result = data_01;
				if (callback) {
					callback(result);
				}
			}
		});
	}
	else if (type1 == 6) {
		//组织机构页面专用
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fdepartmentName": "",
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001000608", sendObj, function (res) {
			if (res.msgBody) {
				function treeMenu(a) {
					this.tree = a || [];
					this.groups = {};
				};
				treeMenu.prototype = {
					init: function (forganizationParentNo) {
						this.group();
						return this.getDom(this.groups[forganizationParentNo]);
            },
                group: function () {
                    for (var i = 0; i < this.tree.length; i++) {
                        if (this.groups[this.tree[i].forganizationParentNo]) {
                            this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
                        }
                        else {
                            this.groups[this.tree[i].forganizationParentNo] = [];
                            this.groups[this.tree[i].forganizationParentNo].push(this.tree[i]);
                        }
                    }
                },
                getDom: function (a) {
                    if (!a) { return '' }
						var data_01 = new Array();
						for (var i = 0; i < a.length; i++) {
							data_01[i] = new Array();
							data_01[i]['title'] = a[i].fdepartmentName;
							data_01[i]['key'] = a[i].forganizationNo;
							data_01[i]['fdepartmentNo'] = a[i].fdepartmentNo;
							data_01[i]['forganizationNo'] = a[i].forganizationNo;
							data_01[i]['forganizationType'] = a[i].forganizationType;
							data_01[i]['forganizationParentNo'] = a[i].forganizationParentNo;
							data_01[i]['fid'] = a[i].fid;
							data_01[i]['folder'] = true;

							var hasChild = this.groups[a[i].forganizationNo];
							if (hasChild) {
								data_01[i]['expanded'] = true;
								data_01[i]['children'] = this.getDom(hasChild);
							}
						};
						return data_01;
					}
				};
				result = new treeMenu(res.msgBody.pageOutBody.pageObjBody).init(0);
				if (callback) {
					callback(result);
				}
			}
		});
	}
	else if (type1 == 7) {
		//ztree用查询员工列表
		sendObj = {
			"fcompanyId": _fcompanyId,
			"fname": "",
			"fsiteNo": "1",
			"ftype": "-1",
			"flevel": "-1",
			"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
		};

		_call("1001001308", sendObj, function (res) {
			if (res.msgBody) {
				var data_01 = new Array();
				$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
					data_01[i] = new Array();
					data_01[i]['id'] = v.fsiteNo;
					data_01[i]['pId'] = v.fupperSiteNo;
					data_01[i]['fupperSiteName'] = v.fupperSiteName;
					data_01[i]['name'] = v.fname;
				});
				result = data_01;
			}
		});
	}
	return result;
}
function getParentFdepartmentNo(parentNode) {
	if (parentNode.data.forganizationType == 1) {
		return parentNode.data.fdepartmentNo;
	}
	else {
		return getParentFdepartmentNo(parentNode.parent);
	}
}
function getParentforganizationNo(node) {
	if (node.forganizationType == 1) {
		return node.forganizationNo;
	}
	else {
		var _parentNode = node.parent;
		if (_parentNode.data.forganizationType == 1) {
			return _parentNode.data.forganizationNo;
		}
		else {
			return getParentforganizationNo(_parentNode);
		}
	}
}
function getParentforganizationNo2(node) {
	if (node.forganizationType == 1) {
		return node.id;
	}
	else {
		var _parentNode = node.getParentNode();
		if (_parentNode.forganizationType == 1) {
			return _parentNode.forganizationNo;
		}
		else {
			return getParentforganizationNo(_parentNode);
		}
	}
}

function bindArea2(province_id, city_id, country_id) {
	var _province = $("#" + province_id);
	var _city = $("#" + city_id);
	var _city_wrap = $("#" + city_id + "_wrap");
	var _city_default = "<option value='0'>请选择城市</option>";
	var _country = $("#" + country_id);
	var _country_wrap = $("#" + country_id + "_wrap");
	var _country_default = "<option value='0'>请选择区域</option>";
	var _companyId = getUserInfo(0).fcompanyId;
	var _code = "1001000408";

	var sendObj = {
		"fparentAreaCode": "0",
		"fcompanyId": _companyId,
		"fareaName": ""
	};
	_call(_code, sendObj, function (res) {
		if (res.msgBody) {
			$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
				_province.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
			});
		};
		if (_city) {
			_province.on("change", function () {
				var _this = $(this);
				if (_this.val() == "0") {
					_city.val(0);
					_city_wrap.hide();
					_city.html(_city_default);
					_country.val(0);
					_country_wrap.hide();
					_country.html(_city_default);
				}
				else {
					var sendObj = {
						"fparentAreaCode": _this.val(),
						"fcompanyId": _companyId,
						"fareaName": ""
					};
					_call(_code, sendObj, function (res) {
						if (res.msgBody) {
							_city.html(_city_default);
							$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
								_city.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
							});
						};
					});
					_city.change();
					_city_wrap.show();
					_country_wrap.hide();

					if (_country) {
						_city.on("change", function () {
							var _this2 = $(this);
							if (_this2.val() == "0") {
								_country.val(0);
								_country_wrap.hide();
								_country.html(_city_default);
							}
							else {
								var sendObj = {
									"fparentAreaCode": _this2.val(),
									"fcompanyId": _companyId,
									"fareaName": ""
								};
								_call(_code, sendObj, function (res) {
									if (res.msgBody) {
										_country.html(_country_default);
										$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
											_country.append("<option value='" + v.fareaCode + "'>" + v.fareaName + "</option>");
										});
									};
								});
								_country.change();
								_country_wrap.show();
							}
						});
					}
				}
			});
		}
	});
}
/*
 nums:货物数量dom数组
 total_num:数量合计dom
 moneys:货物运费dom数组
 total_trans_money:运费合计dom
 bz_money:保值金额dom
 bz_rate:保值比率dom
 bz_total:保值费dom
 delivery_money:送货费dom
 total_money:总计金额dom
 total_money_text:总计金额大写
 */
function setOrderTotalMoney(nums, total_num, moneys, total_trans_money, bz_money, bz_rate, bz_total, delivery_money, total_money, total_money_text, fdispatchOrderQrSum) {
	var _count = function () {
		var _goodsNum = countGoodsNum(nums);
		var _transMoney = countTransMoney(moneys);
		var _bzMoney = countBzMoney(bz_money, bz_rate);

		d_val(total_num, _goodsNum, _goodsNum, 0);
		if (fdispatchOrderQrSum) {
			d_val(fdispatchOrderQrSum, _goodsNum, _goodsNum, 0);
		}
		//d_val(total_trans_money,_transMoney,_transMoney,0);
		d_val(bz_total, _bzMoney, _bzMoney, 0);

		var _total = countTotalMoney(moneys, bz_money, bz_rate, delivery_money);
		var _total_text = "￥" + _total;
		var _total_dx = DX(_total);

		d_val(total_money, _total_text, _total_text, 0);
		d_val(total_money_text, _total_dx, _total_dx, 0);
	}
	_count();
	nums.on("keyup", _count);
	moneys.on("keyup", _count);
	bz_money.on("keyup", _count);
	bz_rate.on("change", _count);
	delivery_money.on("keyup", _count);
}
//计算货物数量
function countGoodsNum(nums) {
	var _num_total = 0;
	nums.each(function (i, obj) {
		var _val = $(obj).val();
		if (_val != "") {
			_num_total += parseInt(_val);
		}
	});
	return _num_total > 0 ? _num_total : 0;
}
//计算运费
function countTransMoney(moneys) {
	var _num_total = 0;
	moneys.each(function (i, obj) {
		var _val = $(obj).val();
		if (_val != "") {
			_num_total += parseFloat(_val);
		}
	});
	return _num_total > 0 ? _num_total.toFixed(2) : 0;
}
//计算保值费
function countBzMoney(bz_money, bz_rate) {
	var _num_total = 0;

	if (bz_money.val() != "") {
		_num_total = bz_money.val() / bz_rate.val();
	}
	return _num_total > 0 ? _num_total.toFixed(2) : 0;
}
//计算运费总金额
function countTotalMoney(moneys, bz_money, bz_rate, delivery_money) {
	var _num_total = 0;
	var total_trans_money = countTransMoney(moneys);
	//var total_bz_money=countBzMoney(bz_money,bz_rate);
	var total_bz_money = bz_money.val() == "" ? 0 : bz_money.val();

	if (delivery_money.val() != "") {
		_num_total = delivery_money.val();
	}
	_num_total = parseFloat(total_trans_money) + parseFloat(total_bz_money) + parseFloat(_num_total);
	return _num_total > 0 ? _num_total.toFixed(2) : 0;
}
//显示通用的运单模板
function bindDispatchOrder(_wrap, _type, func) {
	_wrap.load(_dir + "plugins/dispatchOrder_" + _type + ".html", function (response, status, xhr) {
		_wrap.html(response);
		if (func) {
			func();
		}
	});
}
//设置用户已录入的运单明细值
//_type 0.value 1.text 2.html
function bindDispatchOrderDetail(_fdispatchOrderNo,fun) {
	var sendObj = {
		"fcompanyId": getUserInfo(0).fcompanyId,
		"fdispatchOrderNo": _fdispatchOrderNo
	};
	var storagefdispatchOrder=null;
    var fdispatchOrderList = window.localStorage.getItem("loadListInfoListSearchManager_check");
    if (typeof (fdispatchOrderList) != "undefined" && fdispatchOrderList != null && fdispatchOrderList.length > 20) {
        var fdispatchOrderListjson=JSON.parse(fdispatchOrderList);
        $.each(fdispatchOrderListjson,function(i,v){
			if(v.fdispatchOrderNo==_fdispatchOrderNo){
                storagefdispatchOrder=v;
			}
        });
	}
	if(storagefdispatchOrder!=null){
        stuffDispatchOrderDetaiHtml(storagefdispatchOrder);
	}else{
        _call("1001001813", sendObj, function (res) {
        	if(res.msgBody){
                stuffDispatchOrderDetaiHtml(res.msgBody);
				if(fun) fun();
            }else{
                //top.swal.close();
                d_alert("提示", "无可修改运单信息", "error");
			}
        });

	}

}
function stuffDispatchOrderDetaiHtml(dispatchOrderDetai){
    if (dispatchOrderDetai) {
        var _v = dispatchOrderDetai;

        if (typeof (editDispatchOrderfsendSiteNo) != "undefined") {
            editDispatchOrderfsendSiteNo = _v.fsendSiteNo;
            editDispatchOrderfsendSiteName = _v.fsendSiteName;

        }
        if (typeof (editDispatchOrderfsendSiteNo) != "undefined") {
            editDispatchOrderfreceiveSiteNo = _v.freceiveSiteNo;
            editDispatchOrderfreceiveSiteName = _v.freceiveSiteName;
            if (typeof (editDispatchOrderStats) != "undefined") {
                editDispatchOrderStats = 1;
                 if (editDispatchOrderSitesend == 1 && editDispatchOrderSitere == 1) {
                    d_val($("#fsendSiteNo"), _v.fsendSiteNo, _v.fsendSiteName, 0);
                    $("#fsendSiteNo").attr("fsendSiteNo_text", _v.fsendSiteName);
                    d_val($("#fsendSiteName"), _v.fsendSiteName, _v.fsendSiteName, 0);
                    $("#fsendSiteNo").select2();
                    d_val($("#freceiveSiteNo"), _v.freceiveSiteNo, _v.freceiveSiteName, 0);
                    $("#freceiveSiteNo").attr("freceiveSiteNo_text", _v.freceiveSiteName);
                    d_val($("#freceiveSiteName"), _v.freceiveSiteName, _v.freceiveSiteName, 0);
                    $("#freceiveSiteNo").select2();
                }
            }
        }


        //异常处理-退货处理-申请退货，单号查询1001001813时 根据返回的freturnStatus状态做页面提示，如果freturnStatus 为1 页面提示“该运单已申请退货”
        if (_page == "goodsReturnApplicationEntryManager" && _v.freturnStatus == 1) {
            d_alert("提示", "该运单已申请退货", "error");
            return false;
        }

        //bcs 运单修改逻辑修改
        if (typeof (editDispatchOrderObj) != "undefined") {
            editDispatchOrderObj = dispatchOrderDetai;
        }
        var _fsendDate = getFormatDate(1, _v.fsendDate);
        $("#cod_fid").val("");
        $("#orderfee_fid").val("");
        if ($("#dispatch_fid").length) {
            $("#dispatch_fid").val(_v.fid);
            if (_v.orderFee) $("#orderfee_fid").val(_v.orderFee.fid);
            if (_v.cod) $("#cod_fid").val(_v.cod.fid);
        }

        d_val($("#fdispatchOrderNo_text"), _v.fdispatchOrderNo, _v.fdispatchOrderNo, 0);
        d_val($("#fsendDate"), _fsendDate, _fsendDate, 0);
        d_val($("#fdispatchOrderNo"), _v.fdispatchOrderNo, _v.fdispatchOrderNo, 0);
        d_val($("#fsendSiteNo"), _v.fsendSiteNo, _v.fsendSiteName, 0);
        $("#fsendSiteNo").attr("fsendSiteNo_text", _v.fsendSiteName);
        d_val($("#fsendSiteName"), _v.fsendSiteName, _v.fsendSiteName, 0);
        d_val($("#fwlcardNo"), _v.fwlcardNo, _v.fwlcardNo, 0);
        d_val($("#fsenderNo"), _v.fsenderNo, _v.fsenderNo, 0);
        d_val($("#fsender"), _v.fsender, _v.fsender, 0);
        d_val($("#fsenderName"), _v.fsenderName, _v.fsenderName, 0);
        d_val($("#fsenderTel"), _v.fsenderTel, _v.fsenderTel, 0);
        d_val($("#fsenderMobile"), _v.fsenderMobile, _v.fsenderMobile, 0);
        d_val($("#fsenderIdcardNo"), _v.fsenderIdcardNo, _v.fsenderIdcardNo, 0);
        d_val($("#fsenderCardType"), _v.fsenderCardType, _v.fsenderCardType, 0);
        d_val($("#freceiveSiteNo"), _v.freceiveSiteNo, _v.freceiveSiteName, 0);
        $("#freceiveSiteNo").attr("freceiveSiteNo_text", _v.freceiveSiteName);
        d_val($("#freceiveSiteName"), _v.freceiveSiteName, _v.freceiveSiteName, 0);

		if(_page != "dispatchOrderInfoSearch_detail" && _page != "editDispatchOrdeNormal"&& _page != "dispatchOrderCheckListManager_add" ){
            $("#fsendSiteNo").select2();
            $("#freceiveSiteNo").select2();
        }


        d_val($("#freceiverName"), _v.freceiverName, _v.freceiverName, 0);
        d_val($("#freceiverTel"), _v.freceiverTel, _v.freceiverTel, 0);
        d_val($("#freceiverMobile"), _v.freceiverMobile, _v.freceiverMobile, 0);
        d_val($("#freceiverIdcardNo"), _v.freceiverIdcardNo, _v.freceiverIdcardNo, 0);
        d_val($("#freceiverCardType"), _v.freceiverCardType, _v.freceiverCardType, 0);
        d_val($("#fisRequiredReceipt"), _v.fisRequiredReceipt, (_v.fisRequiredReceipt == 0 ? "否" : "是"), 0);
        $("#fisRequiredReceipt").attr("fisRequiredReceipt_text", (_v.fisRequiredReceipt == 0 ? "否" : "是"))
        d_val($("#fdispatchOrderStatus"), _v.fdispatchOrderStatus, _v.fdispatchOrderStatus, 0);
        d_val($("#fclaimsStatus"), _v.fclaimsStatus, _v.fclaimsStatus, 0);
        d_val($("#flostStatus"), _v.flostStatus, _v.flostStatus, 0);
        d_val($("#funusualStatus"), _v.funusualStatus, _v.funusualStatus, 0);
        d_val($("#freceiveStatus"), _v.freceiveStatus, _v.freceiveStatus, 0);
        d_val($("#ffeeStatus"), _v.ffeeStatus, _v.ffeeStatus, 0);
        d_val($("#fcodstatus"), _v.fcodstatus, _v.fcodstatus, 0);
        d_val($("#fremark"), _v.fremark, _v.fremark, 0);
        d_val($("#freceiverStreetAddress"), _v.freceiverStreetAddress, _v.freceiverStreetAddress, 0);


        bindAreaEmpty($("#freceiverProvinceCode"),$("#freceiverCityCode"),$("#freceiverCountyCode"),_v.freceiverProvinceCode,_v.freceiverCityCode,_v.freceiverCountyCode);

        if (_v.orderFee && _v.orderFee != 'null') {

            d_val($("#fpayType"), _v.orderFee.fpayType, _v.orderFee.fpayTypeName, 0);
            if(_page != "dispatchOrderInfoSearch_detail"){
                if (typeof (disfpayTypeEdit) != "undefined") {
                    disfpayTypeEdit=_v.orderFee.fpayType;
                    $("#fpayType").select2();
                }
			}

            $("#fpayType").attr("fpayType_text", _v.orderFee.fpayTypeName);
            var _ftotalFee = "￥" + _v.orderFee.ftotalFee.toFixed(2);
            d_val($("#ftotalFee"), _ftotalFee, _ftotalFee, 0);
            var _ftotalFee_text = DX(_v.orderFee.ftotalFee.toFixed(2));
            d_val($("#ftotalFee_text"), _ftotalFee_text, _ftotalFee_text, 0);
            var _fcarriage = _v.orderFee.fcarriage.toFixed(2);
            d_val($("#fcarriage"), _fcarriage, _fcarriage, 0);
            var _fmaintenanceFee = _v.orderFee.fmaintenanceFee.toFixed(2);
            d_val($("#fmaintenanceFee"), _fmaintenanceFee, _fmaintenanceFee, 0);
            var _fhedgeAmount = _v.orderFee.fhedgeAmount.toFixed(2);
            d_val($("#fhedgeAmount"), _fhedgeAmount, _fhedgeAmount, 0);
            var _fhedgeRatio = (" ÷ " + (_v.orderFee.fhedgeRatio * 1000) + "‰");
            d_val($("#fhedgeRatio"), _v.orderFee.fhedgeRatio, _fhedgeRatio, 0);
            $("#fhedgeRatio").attr("fhedgeRatio_text", _fhedgeRatio);
            var _fdeliveryFee = _v.orderFee.fdeliveryFee.toFixed(2);
            d_val($("#fdeliveryFee"), _fdeliveryFee, _fdeliveryFee, 0);
            var _fpickFee = _v.orderFee.fpickFee.toFixed(2);
            d_val($("#fpickFee"), _fpickFee, _fpickFee, 0);
            var _freceiptFee = _v.orderFee.freceiptFee.toFixed(2);
            d_val($("#freceiptFee"), _freceiptFee, _freceiptFee, 0);
            var _ftransferFee = _v.orderFee.ftransferFee.toFixed(2);
            d_val($("#ftransferFee"), _ftransferFee, _ftransferFee, 0);
        }

        if (_v.cod != null && _v.cod != 'null') {
            d_val($("#fcodno"), _v.cod.fcodno, _v.cod.fcodno, 0);
            var _fcod = _v.cod.fcodTotal.toFixed(2);
            d_val($("#fcodTotal"), _fcod, _fcod, 0);
            var _fcodfee = _v.cod.fcodfee.toFixed(2);
            d_val($("#fcodfee"), _fcodfee, _fcodfee, 0);
        } else {
            d_val($("#fcodno"), '', '', 0);
            d_val($("#fcodno"), '', '', 0);
            d_val($("#fcodTotal"), '', '', 0);
            d_val($("#fcodfee"), '', '', 0);
        }



        d_val($("#fcustomerNo"), _v.fcustomerNo, _v.fcustomerNo, 0);
        d_val($("#fsenderBankCardNo"), _v.fsenderBankCardNo, _v.fsenderBankCardNo, 0);
        d_val($("#fdispatcherName"), _v.fdispatcherName, _v.fdispatcherName, 0);
        d_val($("#fsorterName"), _v.fsorterName, _v.fsorterName, 0);

        /*
         if(_type==1){
         $.each(res.msgBody.goods,function(i,g){
         $("#goods_wrap").append("<tr><td>"+g.fgoodsNo+"</td><td>"+g.fgoodsName+"</td><td>"+g.ftype+"</td><td>"+g.fgoodsNum+"</td><td>"+g.fpacket+"</td><td>"+g.fgoodsWeight+"</td><td>"+g.fgoodsVolume+"</td><td>"+g.fgoodsLong+"</td><td>"+g.fgoodsWidth+"</td><td>"+g.fgoodsHeight+"</td><td>"+g.fgoodsState+"</td></tr>");
         });
         }
         else{*/
        var _goodsNum = 0, _goodsline = 0;
        $.each(_v.goods, function (i, g) {
            _goodsNum += parseInt(g.fgoodsNum);
            _goodsline++;
            d_val($("#fgoodsFid_" + i), g.fid, g.fid, 0);
            d_val($("#fgoodsNo_" + i), g.fgoodsNo, g.fgoodsNo, 0);
            d_val($("#fgoodsName_" + i), g.fgoodsName, g.fgoodsName, 0);
            d_val($("#ftype_" + i), g.ftype, g.ftype, 0);
            d_val($("#fgoodsNum_" + i), g.fgoodsNum, g.fgoodsNum, 0);
            d_val($("#fgoodsWeight_" + i), g.fgoodsWeight, g.fgoodsWeight, 0);
            d_val($("#fgoodsVolume_" + i), g.fgoodsVolume, g.fgoodsVolume, 0);
            d_val($("#fpacket_" + i), g.fpacket, g.fpacket, 0);
            d_val($("#fgoodsLong_" + i), g.fgoodsLong, g.fgoodsLong, 0);
            d_val($("#fgoodsWidth_" + i), g.fgoodsWidth, g.fgoodsWidth, 0);
            d_val($("#fgoodsHeight_" + i), g.fgoodsHeight, g.fgoodsHeight, 0);
            d_val($("#fgoodsState_" + i), g.fgoodsState, g.fgoodsState, 0);
        });
        if (_goodsline < 3) {
            for (var lineidx = 2; lineidx >= _goodsline; lineidx--) {
                d_val($("#fgoodsFid_" + lineidx), 0, 0, 0);
                d_val($("#fgoodsNo_" + lineidx), '', '', 0);
                d_val($("#fgoodsName_" + lineidx), '', '', 0);
                d_val($("#ftype_" + lineidx), '', '', 0);
                d_val($("#fgoodsNum_" + lineidx), '', '', 0);
                d_val($("#fgoodsWeight_" + lineidx), '', '', 0);
                d_val($("#fgoodsVolume_" + lineidx), '', '', 0);
                d_val($("#fpacket_" + lineidx), '', '', 0);
                d_val($("#fgoodsLong_" + lineidx), '', '', 0);
                d_val($("#fgoodsWidth_" + lineidx), '', '', 0);
                d_val($("#fgoodsHeight_" + lineidx), '', '', 0);
                d_val($("#fgoodsState_" + lineidx), '', '', 0);
            }
        }
        d_val($("#total_num"), _goodsNum, _goodsNum, 0);
        //}
        $("#fsendSiteNo").change();
        $("#freceiveSiteNo").change();

        //运单详情当前状态
        if ($("#retab3").length) {
            $("#r_fdispatchOrderStatus").text(_v.fdispatchOrderStatusName);
            $("#r_fcodstatus").text((typeof (_v.cod) != 'undefined' && _v.cod != null ? _v.cod.fcodstatusName : "无"));
            $("#r_piaoju").text(_v.fdispatchOrderPjStatusName);

            var ffeestatustemp =0;
            if (_v.orderFee && _v.orderFee != 'null'){
                ffeestatustemp=_v.orderFee.ffeeStatus;
            }
            $("#r_FfeeStatus").text(getOrderFeeTransportaionStatusName(ffeestatustemp));
        }
        if (_page == "RootdispatchOrderChange") {
            if (_v.fdispatchOrderStatus == 5) {
                $("#frootChangePackSta option[value='0']").text("已提货");
            }

            var feestr = $("#frootChangeFeeSta option[value='" + _v.ffeeStatus + "']").text();
            if (typeof (feestr) != "undefined" && feestr.length > 3) {
                $("#frootChangeFeeSta option[value='-1']").text(feestr);
            }

            if (_v.cod != null && _v.cod != 'null') {
                var fcodstr = $("#frootChangeCodSta option[value='" + _v.cod.fcodstatus + "']").text();
                if (typeof (fcodstr) != "undefined" && fcodstr.length > 3) {
                    $("#frootChangeCodSta option[value='-1']").text(fcodstr);
                }
            }

        }
    }

}


function getOrderFeeTransportaionStatusName(fcarriageStatus){
    var fcarriageStatusName="";
    switch (fcarriageStatus){
        case 0:fcarriageStatusName="运费未收" ;   break;
        case 1:fcarriageStatusName="运费已收";    break;
        case 2:fcarriageStatusName="运费已结";  break;
        case 3:fcarriageStatusName="运费已返";    break;
        case 4:fcarriageStatusName="运费已清算" ;   break;
        case 9:fcarriageStatusName="运费已冻结";    break;
        default:fcarriageStatusName="无";break;
    }
    return fcarriageStatusName;
}


function showOrderDetail(order_id, type) {
	if (type == 1) {
		top.swal({
			width: "800",
			allowOutsideClick: false,
			showCloseButton: true,
			showConfirmButton: false,
			html: '<iframe width="100%" height="400" frameborder="0" src="' + _dir + 'plugins/orderDetail_1.html?id=' + order_id + '"></iframe>'
		});
	}
}
//从左点右方法之一
function bindTableToggle_01(data_source_table) {
	var _toggle_right = $("#toggle_right");
	var _toggle_left = $("#toggle_left");
	var _toggle_right_all = $("#toggle_right_all");
	var _toggle_left_all = $("#toggle_left_all");
	var _left_list_table = $("#left_list_wrap table");
	var _right_list_table = $("#right_list_wrap table");

	//邦定输入运单号左右切换
	bindTableToggle_03(_left_list_table, _right_list_table, data_source_table);
	//邦定点击按钮左右切换
	if (_toggle_left.length) {
		_toggle_left.on("click", function () {
			bindTableToggle_02(_right_list_table, _left_list_table, 1, data_source_table, 1);
		});
	}
	if (_toggle_right.length) {
		_toggle_right.on("click", function () {
			bindTableToggle_02(_left_list_table, _right_list_table, 1, data_source_table, 0);
		});
	}
	if (_toggle_left_all.length) {
		_toggle_left_all.on("click", function () {
			bindTableToggle_02(_right_list_table, _left_list_table, 0, data_source_table, 1);
		});
	}
	if (_toggle_right_all.length) {
		_toggle_right_all.on("click", function () {
			bindTableToggle_02(_left_list_table, _right_list_table, 0, data_source_table, 0);
		});
	}
}
function bindTableToggle_02(table_01, table_02, toggle_type, data_source_table, showDetail) {
	var _trs = table_01.DataTable().rows(toggle_type == 0 ? "" : ".active");
	var _datas = _trs.data();
	var _lastChild;

	if (_page == "loadListInfoListSearchManager_check" && showDetail == 0 && _datas.length == 1) {
		showDispatchOrderDetail(_datas[0][1], function () {
			bindTableToggle_02(table_01, table_02, toggle_type, data_source_table, 1);
		});
	}
	else {
		//如果要插入的表格中已存在相同数据,即删除
		var _rows = table_02.DataTable().rows();
		$.each(_datas, function (i, v) {
			$.each(_rows, function (k, g) {
				var _tr = table_02.DataTable().row(g);
				if (typeof (_tr.data()) != "undefined") {
					if (_datas[i].toString() == _tr.data().toString()) {
						_tr.remove().draw();
					}
				}
			});
		});

		table_02.DataTable().rows.add(_datas).draw();

		_trs.remove().draw();
        _lastChild = table_02.children("tbody").children("tr:last-child");
		//将新增过去的一行添加高亮状态
        _lastChild.addClass("active").siblings(".active").removeClass("active")
        table_02.parent().parent().scrollTop(table_02.height()-table_02.parent().parent().height()*1+36);
		//计算合计
		setHejiTable(data_source_table);
        //交付运费结算页面 判断table是否被单击
        if(typeof(isTableClick) != "undefined"){
        	isTableClick = 1;
        }
	}
}
function bindTableToggle_03(table_01, table_02, data_source_table) {
	$(".toggle_input").off("keydown").on("keydown", function (e) {
		var key = event.keyCode;
		var _this = $(this);
		if (key == 13) {
            _this.blur();
			if (_this.val() != "") {
				var thisinputval=trimAll(_this.val());
				var _table_from = _this.hasClass("left_search") ? table_01 : table_02;
				var _table_to = _this.hasClass("left_search") ? table_02 : table_01;

				var _rows = _table_from.DataTable().rows().nodes();
				var isExist = false;
                $.each(_rows, function (i, v) {
					var _tr = _table_from.DataTable().row(v);
					//如果输入的运单号和每行数据的运单号相同,即把该行剪贴过去
					if (thisinputval == trimAll(_tr.data()[1])) {
                        isExist=true;
						if (_page == "loadListInfoListSearchManager_check" && !_this.hasClass("right_search")) {
							showDispatchOrderDetail(thisinputval, function () {
								bindTableToggle_04(_table_to, _tr, _tr.data(), data_source_table);
								_this.focus().select();
							});
						}
						else {
							bindTableToggle_04(_table_to, _tr, _tr.data(), data_source_table);
                                _this.focus().select();
						}
					}
				});
				if(!isExist){
					//控制音频播放
					top.$("#warningTone").prop("src","/assets/music/error.wav");
					top.$("#warningTone").get(0).play();
					top.swal({
						title:"错误",
						text:"未找到改运单号",
						type:"error",
                        allowEscapeKey:true,
                        confirmButtonText:"确认",
					}).then(function(isConfirm){
						top.swal.close();
                        //输入框获得焦点
                        setTimeout(function(){
                            _this.focus().select();
                        },50);
					})
				}
			}
		}
	})
}
function trimAll(str)
{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function bindTableToggle_04(table_01, tr, data, data_source_table) {
	//如果要插入的表格中已存在相同数据,即删除
	var _rows = table_01.DataTable().rows();
	$.each(_rows, function (i, v) {
		var _tr = table_01.DataTable().row(v);
		if (typeof (_tr.data()) != "undefined") {
			if (data.toString() == _tr.data().toString()) {
				_tr.remove().draw();
			}
		}
	});
	table_01.DataTable().row.add(data).draw();
	tr.remove().draw();
    table_01.children("tbody").children("tr:last-child").addClass("active").siblings(".active").removeClass("active")
    table_01.parent().parent().scrollTop(table_01.height()-table_01.parent().parent().height()*1+36);
	//计算合计
	setHejiTable(data_source_table);
}
//选择右侧表格的时候，底部表格自动计算对应费用
//所有值根据bindDispatchOrderListSearch方法而来
function bindDispatchOrderTotalTable_01(table_list, table_total) {
	var zc_piaoshu = zc_jianshu = zc_tifu = zc_jiaofu = zc_hetong = zc_baozhifei = zc_songhuofei = zc_jiehuofei = zc_daishoukuan = zc_daishoukuan_shouxu = zc_zhongzhuanfeiyong = zc_heji = 0;
	var fc_piaoshu = fc_jianshu = fc_tifu = fc_jiaofu = fc_hetong = fc_baozhifei = fc_songhuofei = fc_jiehuofei = fc_daishoukuan = fc_daishoukuan_shouxu = fc_zhongzhuanfeiyong = fc_heji = 0;
	var zz_piaoshu = zz_jianshu = zz_tifu = zz_jiaofu = zz_hetong = zz_baozhifei = zz_songhuofei = zz_jiehuofei = zz_daishoukuan = zz_daishoukuan_shouxu = zz_zhongzhuanfeiyong = zz_heji = 0;
	var total_yunfei = 0;
	var show_daishoukuan = shou_daishoukuan_shouxu = true;
	var _datas = table_list.DataTable().rows().data();
	//如果pagetype=9 特殊情况
	var isPage9 = false;

	if (_page == "loadListGenerateManager" || _page == "dispatchOrder_print_1") {
		show_daishoukuan = true;
		shou_daishoukuan_shouxu = false;
	}
	else if (_page == "deliveryFreightSettle" || _page == "contractSettle") {
		show_daishoukuan = false;
		shou_daishoukuan_shouxu = false;
	}
	if(_pageType&&_pageType == "9"){
        isPage9 = true;
	}


	$.each(_datas, function (i, v) {
        if (_pageType == 2) {
			var _fdispatchOrderType = v[20];
			var _fpayType = v[18];
			var _goodsNum = v[7];
			var _fcarriage = v[9];
			var _fmaintenanceFee = v[10];
			var _fdeliveryFee = v[11];
			var _fpickFee = v[12];
			var _fcodTotal = (show_daishoukuan ? v[14] : 0);
			var _fcodfee = (shou_daishoukuan_shouxu ? v[15] : 0);
			var _ftransferFee = v[19];
            var _ftotalFee = v[13];
		}
		else if(_pageType == 3){
            var _fdispatchOrderType = v[20];
            var _fpayType = v[21];
            var _goodsNum = v[9];
            var _fcarriage = v[11];
            var _fmaintenanceFee = v[13];
            var _fdeliveryFee = v[15];
            var _fpickFee = v[16];
            var _fcodTotal = (show_daishoukuan ? v[14] : 0);
            var _fcodfee = (shou_daishoukuan_shouxu ? v[15] : 0);
            var _ftransferFee = v[18];
            var _ftotalFee = v[14];
		}
		else if(_pageType == 4){
			//交付运费结算
            var _fdispatchOrderType = v[13];
            var _fpayType = v[14];
            var _goodsNum = 0;
            var _fcarriage = v[7];
            var _fmaintenanceFee = v[8];
            var _fdeliveryFee = v[10];
            var _fpickFee = 0;
            var _fcodTotal = v[9];
            var _fcodfee = v[10];
            var _ftransferFee = 0;
            var _ftotalFee = v[9];
		}
		else if(_pageType == 7){
            //待审核装车单 pagetype 7
            var _fdispatchOrderType = v[11];
            var _fpayType = v[12];
            var _goodsNum = v[2];
            var _fcarriage = v[13];
            var _fmaintenanceFee = v[6];
            var _fdeliveryFee = v[8];
            var _fpickFee = v[9];
            var _fcodTotal = v[10];
            var _fcodfee = v[14];
            var _ftransferFee = 0;
            var _ftotalFee = v[7];
	  	}else if(_pageType == 8){
            //装车单生成 pagetype 8
            var _fdispatchOrderType = v[7];
            var _fpayType = v[8];
            var _goodsNum = 0;
            var _fcarriage = 0;
            var _fmaintenanceFee = 0;
            var _fdeliveryFee = 0;
            var _fpickFee = 0;
            var _fcodTotal = v[6];
            var _fcodfee = 0;
            var _ftransferFee = 0;
            var _ftotalFee = v[5];
        }else if(_pageType == 9){
            var _fcodTotal = v[4];
            var _fcodfee = v[5] ;
            var _ftotalFee = v[6];
            zz_piaoshu += 1;
            zz_daishoukuan += parseInt(_fcodTotal);
            zz_daishoukuan_shouxu += parseInt(_fcodfee);
            zz_heji += parseInt(_ftotalFee);
        }else{
			var _fdispatchOrderType = v[24];
			var _fpayType = v[25];
			var _goodsNum = v[9];
			var _fcarriage = v[26];
			var _fmaintenanceFee = v[13];
			var _fdeliveryFee = v[15];
			var _fpickFee = v[16];
			var _fcodTotal = (show_daishoukuan ? v[17] : 0);
			var _fcodfee = (shou_daishoukuan_shouxu ? v[18] : 0);
			var _ftransferFee = v[22];
			var _ftotalFee = v[14];
		}
		if(!isPage9){
            if (_fdispatchOrderType == 1) {
                //正程
                zc_jianshu += parseInt(_goodsNum);
                if (_fpayType == 2) {
                    zc_tifu += parseInt(_fcarriage);
                }
                else if (_fpayType == 1) {
                    zc_jiaofu += parseInt(_fcarriage);
                }
                else if (_fpayType == 3) {
                    zc_hetong += parseInt(_fcarriage);
                }
                zc_piaoshu += 1;
                zc_baozhifei += parseInt(_fmaintenanceFee);
                zc_songhuofei += parseInt(_fdeliveryFee);
                zc_jiehuofei += parseInt(_fpickFee);
                zc_daishoukuan += parseInt(_fcodTotal);
                zc_daishoukuan_shouxu += parseInt(_fcodfee);
                zc_zhongzhuanfeiyong += parseInt(_ftransferFee);
                total_yunfei += _ftotalFee;
                zc_heji += _ftotalFee;
            }
            else if (_fdispatchOrderType == 2) {
                //返程
                fc_jianshu += parseInt(_goodsNum);
                if (_fpayType == 2) {
                    fc_tifu += parseInt(_fcarriage);
                }
                else if (_fpayType == 1) {
                    fc_jiaofu += parseInt(_fcarriage);
                }
                else if (_fpayType == 3) {
                    fc_hetong += parseInt(_fcarriage);
                }
                fc_piaoshu += 1;
                fc_baozhifei += parseInt(_fmaintenanceFee);
                fc_songhuofei += parseInt(_fdeliveryFee);
                fc_jiehuofei += parseInt(_fpickFee);
                fc_daishoukuan += parseInt(_fcodTotal);
                fc_daishoukuan_shouxu += parseInt(_fcodfee);
                fc_zhongzhuanfeiyong += parseInt(_ftransferFee);
                total_yunfei += _ftotalFee;
                fc_heji += _ftotalFee;
            }
            else if (_fdispatchOrderType == 3 || _fdispatchOrderType == 4) {
                //中转
                zz_jianshu += parseInt(_goodsNum);
                if (_fpayType == 2) {
                    zz_tifu += parseInt(_fcarriage);
                }
                else if (_fpayType == 1) {
                    zz_jiaofu += parseInt(_fcarriage);
                }
                else if (_fpayType == 3) {
                    zz_hetong += parseInt(_fcarriage);
                }
                zz_piaoshu += 1;
                zz_baozhifei += parseInt(_fmaintenanceFee);
                zz_songhuofei += parseInt(_fdeliveryFee);
                zz_jiehuofei += parseInt(_fpickFee);
                zz_daishoukuan += parseInt(_fcodTotal);
                zz_daishoukuan_shouxu += parseInt(_fcodfee);
                zz_zhongzhuanfeiyong += parseInt(_ftransferFee);
                total_yunfei += _ftotalFee;
                zz_heji += _ftotalFee;
            }

        }
	});

    if(_pageType && _pageType == 9){
        d_val(table_total.find("tr.all td.piaoshu"), zz_piaoshu, zz_piaoshu, 1);
        d_val(table_total.find("tr.all td.daishoukuan"), zz_daishoukuan, zz_daishoukuan, 1);
        d_val(table_total.find("tr.all td.daishoukuan_shouxu"), zz_daishoukuan_shouxu, zz_daishoukuan_shouxu, 1);
        d_val(table_total.find("tr.all td.sfje"), zz_heji, zz_heji, 1);
    }

	if(!isPage9){
        //正程
        d_val(table_total.find("tr.zhengcheng td.piaoshu"), zc_piaoshu, zc_piaoshu, 1);
        d_val(table_total.find("tr.zhengcheng td.jianshu"), zc_jianshu, zc_jianshu, 1);
        d_val(table_total.find("tr.zhengcheng td.tifu"), zc_tifu, zc_tifu, 1);
        d_val(table_total.find("tr.zhengcheng td.jiaofu"), zc_jiaofu, zc_jiaofu, 1);
        d_val(table_total.find("tr.zhengcheng td.hetong"), zc_hetong, zc_hetong, 1);
        d_val(table_total.find("tr.zhengcheng td.baozhifei"), zc_baozhifei, zc_baozhifei, 1);
        d_val(table_total.find("tr.zhengcheng td.songhuofei"), zc_songhuofei, zc_songhuofei, 1);
        d_val(table_total.find("tr.zhengcheng td.jiehuofei"), zc_jiehuofei, zc_jiehuofei, 1);
        if (show_daishoukuan) {
            d_val(table_total.find("tr.zhengcheng td.daishoukuan"), zc_daishoukuan, zc_daishoukuan, 1);
        }
        if (shou_daishoukuan_shouxu) {
            d_val(table_total.find("tr.zhengcheng td.daishoukuan_shouxu"), zc_daishoukuan_shouxu, zc_daishoukuan_shouxu, 1);
        }
        d_val(table_total.find("tr.zhengcheng td.zhongzhuanfeiyong"), zc_zhongzhuanfeiyong, zc_zhongzhuanfeiyong, 1);
        d_val(table_total.find("tr.zhengcheng td.heji"), zc_heji, zc_heji, 1);

        //返程
        d_val(table_total.find("tr.fancheng td.piaoshu"), fc_piaoshu, fc_piaoshu, 1);
        d_val(table_total.find("tr.fancheng td.jianshu"), fc_jianshu, fc_jianshu, 1);
        d_val(table_total.find("tr.fancheng td.tifu"), fc_tifu, fc_tifu, 1);
        d_val(table_total.find("tr.fancheng td.jiaofu"), fc_jiaofu, fc_jiaofu, 1);
        d_val(table_total.find("tr.fancheng td.hetong"), fc_hetong, fc_hetong, 1);
        d_val(table_total.find("tr.fancheng td.baozhifei"), fc_baozhifei, fc_baozhifei, 1);
        d_val(table_total.find("tr.fancheng td.songhuofei"), fc_songhuofei, fc_songhuofei, 1);
        d_val(table_total.find("tr.fancheng td.jiehuofei"), fc_jiehuofei, fc_jiehuofei, 1);
        if (show_daishoukuan) {
            d_val(table_total.find("tr.fancheng td.daishoukuan"), fc_daishoukuan, fc_daishoukuan, 1);
        }
        if (shou_daishoukuan_shouxu) {
            d_val(table_total.find("tr.fancheng td.daishoukuan_shouxu"), fc_daishoukuan_shouxu, fc_daishoukuan_shouxu, 1);
        }
        d_val(table_total.find("tr.fancheng td.zhongzhuanfeiyong"), fc_zhongzhuanfeiyong, fc_zhongzhuanfeiyong, 1);
        d_val(table_total.find("tr.fancheng td.heji"), fc_heji, fc_heji, 1);

        //中转
        d_val(table_total.find("tr.zhongzhuan td.piaoshu"), zz_piaoshu, zz_piaoshu, 1);
        d_val(table_total.find("tr.zhongzhuan td.jianshu"), zz_jianshu, zz_jianshu, 1);
        d_val(table_total.find("tr.zhongzhuan td.tifu"), zz_tifu, zz_tifu, 1);
        d_val(table_total.find("tr.zhongzhuan td.jiaofu"), zz_jiaofu, zz_jiaofu, 1);
        d_val(table_total.find("tr.zhongzhuan td.hetong"), zz_hetong, zz_hetong, 1);
        d_val(table_total.find("tr.zhongzhuan td.baozhifei"), zz_baozhifei, zz_baozhifei, 1);
        d_val(table_total.find("tr.zhongzhuan td.songhuofei"), zz_songhuofei, zz_songhuofei, 1);
        d_val(table_total.find("tr.zhongzhuan td.jiehuofei"), zz_jiehuofei, zz_jiehuofei, 1);
        if (show_daishoukuan) {
            d_val(table_total.find("tr.zhongzhuan td.daishoukuan"), zz_daishoukuan, zz_daishoukuan, 1);
        }
        if (shou_daishoukuan_shouxu) {
            d_val(table_total.find("tr.zhongzhuan td.daishoukuan_shouxu"), zz_daishoukuan_shouxu, zz_daishoukuan_shouxu, 1);
        }
        d_val(table_total.find("tr.zhongzhuan td.zhongzhuanfeiyong"), zz_zhongzhuanfeiyong, zz_zhongzhuanfeiyong, 1);
        d_val(table_total.find("tr.zhongzhuan td.heji"), zz_heji, zz_heji, 1);

        //合计
        var _piaoshu = (zc_piaoshu + fc_piaoshu + zz_piaoshu);
        d_val(table_total.find("tr.all td.piaoshu"), _piaoshu, _piaoshu, 1);
        var _jianshu = (zc_jianshu + fc_jianshu + zz_jianshu);
        d_val(table_total.find("tr.all td.jianshu"), _jianshu, _jianshu, 1);
        var _tifu = (zc_tifu + fc_tifu + zz_tifu);
        d_val(table_total.find("tr.all td.tifu"), _tifu, _tifu, 1, 1);
        var _jiaofu = (zc_jiaofu + fc_jiaofu + zz_jiaofu);
        d_val(table_total.find("tr.all td.jiaofu"), _jiaofu, _jiaofu, 1);
        var _hetong = (zc_hetong + fc_hetong + zz_hetong);
        d_val(table_total.find("tr.all td.hetong"), _hetong, _hetong, 1);
        var _baozhifei = (zc_baozhifei + fc_baozhifei + zz_baozhifei);
        d_val(table_total.find("tr.all td.baozhifei"), _baozhifei, _baozhifei, 1);
        var _songhuofei = (zc_songhuofei + fc_songhuofei + zz_songhuofei);
        d_val(table_total.find("tr.all td.songhuofei"), _songhuofei, _songhuofei, 1);
        var _jiehuofei = (zc_jiehuofei + fc_jiehuofei + zz_jiehuofei);
        d_val(table_total.find("tr.all td.jiehuofei"), _jiehuofei, _jiehuofei, 1);
        d_val(table_total.find("tr.all td.heji"), total_yunfei, total_yunfei, 1);

        if (show_daishoukuan) {
            var _daishoukuan = (zc_daishoukuan + fc_daishoukuan + zz_daishoukuan);
            d_val(table_total.find("tr.all td.daishoukuan"), _daishoukuan, _daishoukuan, 1);
        }

        if (shou_daishoukuan_shouxu) {
            var _daishoukuan_shouxu = (zc_daishoukuan_shouxu + fc_daishoukuan_shouxu + zz_daishoukuan_shouxu);
            d_val(table_total.find("tr.all td.daishoukuan_shouxu"), _daishoukuan_shouxu, _daishoukuan_shouxu, 1);
        }
        var _zhongzhuanfeiyong = (zc_zhongzhuanfeiyong + fc_zhongzhuanfeiyong + zz_zhongzhuanfeiyong);
        d_val(table_total.find("tr.all td.zhongzhuanfeiyong"), _zhongzhuanfeiyong, _zhongzhuanfeiyong, 1);

    }
}
function showDispatchOrder_print(_type, _value, _isCloseButton) {
	top.swal({
		customClass: "dqq_dialog_01",
		width: "1300",
		allowOutsideClick: false,
		showCloseButton: _isCloseButton,
		showConfirmButton: false,
		//confirmButtonText:"打印",
		//cancelButtonText:"关闭",
		html: '<iframe width="100%" height="400" frameborder="0" src="' + _dir + 'plugins/dispatchOrder_print_' + _type + '.html?floadListNo=' + _value + '"></iframe>'
	});
}
function showwccyrDispatchOrder( _value, _isCloseButton) {
    top.swal({
        customClass: "dqq_dialog_01",
        width: "1300",
        allowOutsideClick: false,
        showCloseButton: _isCloseButton,
        showConfirmButton: false,
        //confirmButtonText:"打印",
        //cancelButtonText:"关闭",
        html: '<iframe width="100%" height="300" frameborder="0" src="' + _dir + 'plugins/wccyrDispatchOrder.html?floadListNo=' + _value + '"></iframe>'
    });
}


//绑定左右下的运单模板
function bindDispatchTemplate_01(left_wrap, right_wrap, bottom_wrap, left_temp, right_temp, bottom_temp, func) {
	left_wrap.load(_dir + "plugins/dispatchOrderList_" + left_temp + "_left.html", function (response1, status1, xhr1) {
		left_wrap.html(response1);
		getPayTypeName();//动态加载运费付款名称
		$("#toggle_btns").load(_dir + "plugins/toggle_btns.html", function (response2, status2, xhr2) {
			$("#toggle_btns").html(response2);
			right_wrap.load(_dir + "plugins/dispatchOrderList_" + right_temp + "_right.html", function (response3, status3, xhr3) {
				right_wrap.html(response3);
				getPayTypeName();//动态加载运费付款名称
				if (bottom_wrap) {
					bottom_wrap.load(_dir + "plugins/dispatchOrderList_" + bottom_temp + "_bottom.html", function (response4, status4, xhr4) {
						bottom_wrap.html(response4);
						getPayTypeName();//动态加载运费付款名称
						if (func) {
							func();
						}
					});
				}
			});
		});
	});
}
//绑定上左右下左右的运单模板
function bindDispatchTemplate_02(left_wrap, right_wrap, bottom_left_wrap, bottom_right_wrap, func) {
	left_wrap.load(_dir + "plugins/dispatchOrderList_1_left.html", function (response1, status1, xhr1) {
		left_wrap.html(response1);
		getPayTypeName();//动态加载运费付款名称
		$("#toggle_btns").load(_dir + "plugins/toggle_btns.html", function (response2, status2, xhr2) {
			$("#toggle_btns").html(response2);
			right_wrap.load(_dir + "plugins/dispatchOrderList_1_right.html", function (response3, status3, xhr3) {
				right_wrap.html(response3);
				getPayTypeName();//动态加载运费付款名称
				if (bottom_left_wrap) {
					bottom_left_wrap.load(_dir + "plugins/dispatchOrderList_2_bottom_left.html", function (response4, status4, xhr4) {
						bottom_left_wrap.html(response4);
						getPayTypeName();//动态加载运费付款名称
						if (bottom_right_wrap) {
							bottom_right_wrap.load(_dir + "plugins/dispatchOrderList_2_bottom_right.html", function (response5, status5, xhr5) {
								bottom_right_wrap.html(response5);
								getPayTypeName();//动态加载运费付款名称
								if (func) {
									func();
								}
							});
						}
					});
				}
			});
		});
	});
}
//绑定上左右下左右的运单模板公共
function bindDispatchTemplate_03(left_wrap, right_wrap, bottom_left_wrap, bottom_right_wrap,left_wrap_num,right_wrap_num,bottom_left_num,bottom_right_num, func) {
    left_wrap.load(_dir + "plugins/dispatchOrderList_"+left_wrap_num+"_left.html", function (response1, status1, xhr1) {
        left_wrap.html(response1);
        getPayTypeName();//动态加载运费付款名称
        $("#toggle_btns").load(_dir + "plugins/toggle_btns.html", function (response2, status2, xhr2) {
            $("#toggle_btns").html(response2);
            right_wrap.load(_dir + "plugins/dispatchOrderList_"+right_wrap_num+"_right.html", function (response3, status3, xhr3) {
                right_wrap.html(response3);
                getPayTypeName();//动态加载运费付款名称
                if (bottom_left_wrap) {
                    bottom_left_wrap.load(_dir + "plugins/dispatchOrderList_"+bottom_left_num+"_bottom.html", function (response4, status4, xhr4) {
                        bottom_left_wrap.html(response4);
                        getPayTypeName();//动态加载运费付款名称
                        if (bottom_right_wrap) {
                            bottom_right_wrap.load(_dir + "plugins/dispatchOrderList_"+bottom_right_num+"_bottom.html", function (response5, status5, xhr5) {
                                bottom_right_wrap.html(response5);
                                getPayTypeName();//动态加载运费付款名称
                                if (func) {
                                    func();
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}
function getDispatchOrderDetail(_dom, _type) {
	var _fdispatchOrderNo = $.trim(_dom.val());
	if (_fdispatchOrderNo == "") {
		d_alert("错误!", "请输入发货单号", "error");
	}
	else {
		bindDispatchOrderDetail(_fdispatchOrderNo);
	}
	return false;
}
function openSwalWindow(_width, _height, _url) {
	top.swal({
		width: _width,
		allowOutsideClick: false,
		showCloseButton: true,
		showConfirmButton: false,
        animation: false,
		html: '<iframe width="100%" height="' + _height + '" frameborder="0" src="' + _url + '"></iframe>'
	});
}
//获取运单代收货款的手续金额
function getDispatchOrderCodFee(d_btn, d_sendNo, d_receiveNo, d_wlcardNo, d_fee) {
	if (d_btn.length) {
		d_btn.on("keyup", function () {
			var _fsendSiteNo = d_sendNo.val().substring(0, 4);
			var _freceiveSiteNo = d_receiveNo.val().substring(0, 4);
			var _isTogether = _fsendSiteNo == _freceiveSiteNo ? 1 : 0;
			var _isWlCard = d_wlcardNo.val().length > 2 ? 1 : 0;
			var sendObj = {
				"fcodTotal": $(this).val(),
				"isTogether": _isTogether,
				"isWlCard": _isWlCard
			};
			_callaaaaa('1001002807', sendObj, function (res) {
				var _fcodFree = 0;
				if (res.msgBody.fcodFree > 0) {
					_fcodFree = res.msgBody.fcodFree;
				}
				d_fee.text("￥" + _fcodFree);
			});
		});
	}
}
function bindCardPrefix(d_wlcard) {
	if (d_wlcard.length) {
		d_wlcard.on("keydown", function () {
			var _this = $(this);
			var _keyword = "WL";
			if (_this.val().indexOf(_keyword) == -1) {
				_this.val(_keyword + _this.val());
			}
		});
	}
}
var dispatchorder_loadSite = "";
var dispatchorder_receiveSite = "";
function setDispatchOrderListTable(loadSite, receiveSite, _v, table_left, table_right, _type, _hidden_daishoukuan, _hidden_daishoukuanxiaoji, _hidden_shouxufei) {
	if (dispatchorder_loadSite == "" && dispatchorder_receiveSite == "") {
		dispatchorder_loadSite = loadSite;
		dispatchorder_receiveSite = receiveSite;
	}

	if ($("#DataTables_Table_0").length) {
		table_left.DataTable().clear().destroy();
		if (_page == "loadListGenerateManager") {
			//如果是装车单生成页面,第二次查询时同时清空右边的表格,如果装车网点和到达网点一样,则不清空
			if (dispatchorder_loadSite != null && dispatchorder_receiveSite != null && dispatchorder_loadSite == loadSite && dispatchorder_receiveSite == receiveSite) {
				table_right.DataTable().destroy();
				dispatchorder_loadSite = loadSite;
				dispatchorder_receiveSite = receiveSite;
			}
			else {
				if ($("#DataTables_Table_1").length) {
					table_right.DataTable().clear().destroy();
				}
			}
		} if (_page == "SitePayableFreightSettle") {
			if ($("#DataTables_Table_1").length) {
				table_right.DataTable().clear().destroy();
			}
		} else {
			table_right.DataTable().destroy();
		}
		$(".data-table").off("click");
	}


	var dataSet = [];
	if (_v) {
		$.each(_v, function (i, v) {
			var goodsNum = 0;
			var goodsName = "";
			if (v.goods) {
				$.each(v.goods, function (k, g) {
					if (g) {
						goodsNum += parseInt(g.fgoodsNum);
						goodsName += g.fgoodsName + ",";
					}
				});
			}
			if (goodsName != "") {
				goodsName = goodsName.substring(0, goodsName.length - 1);
			}

			dataSet.push([
				(i + 1),
				v.fdispatchOrderNo,
				goodsName,
				v.fsendSiteName,
				v.fsenderName,
				(v.fsenderTel == "" ? v.fsenderMobile : v.fsenderMobile == "" ? v.fsenderTel : v.fsenderTel + "," + v.fsenderMobile),
				v.freceiveSiteName,
				v.freceiverName,
				(v.freceiverTel == "" ? v.freceiverMobile : v.freceiverMobile == "" ? v.freceiverTel : v.freceiverTel + "," + v.freceiverMobile),
				goodsNum,
				(v.orderFee.fpayType == 2 ? v.orderFee.fcarriage : ""),
				(v.orderFee.fpayType == 1 ? v.orderFee.fcarriage : ""),
				(v.orderFee.fpayType == 3 ? v.orderFee.fcarriage : ""),
				v.orderFee.fmaintenanceFee,
				v.orderFee.ftotalFee,
				v.orderFee.fdeliveryFee,
				v.orderFee.fpickFee,
				v.cod == null ? 0 : v.cod.fcodTotal,
				v.cod == null ? 0 : v.cod.fcodfee,
				v.fwlcardNo,
				((v.cod == null ? 0 : v.cod.fcodTotal) - (v.cod == null ? 0 : v.cod.fcodfee)),
				v.fsendDate,
				v.orderFee.ftransferFee,
				'',//中转城市
				v.fdispatchOrderType,
				v.orderFee.fpayType,
				v.orderFee.fcarriage
			]);
		});

		//判断再次查询时destroy table
		/*
		 if($("#DataTables_Table_0").length){
		 table_left.DataTable().clear().destroy();
		 if(_page=="loadListGenerateManager"){
		 //如果是装车单生成页面,第二次查询时同时清空右边的表格,如果装车网点和到达网点一样,则不清空
		 if(dispatchorder_loadSite!=null && dispatchorder_receiveSite!=null && dispatchorder_loadSite==loadSite && dispatchorder_receiveSite==receiveSite){
		 table_right.DataTable().destroy();

		 }
		 else{
		 table_right.DataTable().clear().destroy();
		 }
		 }
		 else{
		 table_right.DataTable().destroy();
		 }
		 $(".data-table").off("click");
		 }*/

		//_type=0是填充左侧表格数据,_type=1是加载后填充右侧表格数据
		if (_type == 0) {
			var _dataSet_left = dataSet;
			var _dataSet_right = null;
		}
		else {
			var _dataSet_left = null;
			var _dataSet_right = dataSet;
		}

		//填充左侧和右侧表格
		table_left.DataTable({
			'data': _dataSet_left,
			'paging': false,
			"columnDefs": [
				{ "targets": [17], "visible": _hidden_daishoukuan, "searchable": _hidden_daishoukuan },
				{ "targets": [18], "visible": _hidden_shouxufei, "searchable": _hidden_shouxufei },
				{ "targets": [20], "visible": _hidden_daishoukuanxiaoji, "searchable": _hidden_daishoukuanxiaoji },
				{ "targets": [24], "visible": false, "searchable": false },
				{ "targets": [25], "visible": false, "searchable": false },
				{ "targets": [26], "visible": false, "searchable": false }
			]
		});
		var table_02 = table_right.DataTable({
			'data': _dataSet_right,
			'paging': false,
			"ordering":false,
			"columnDefs": [
				{ "targets": [17], "visible": _hidden_daishoukuan, "searchable": _hidden_daishoukuan },
				{ "targets": [18], "visible": _hidden_shouxufei, "searchable": _hidden_shouxufei },
				{ "targets": [20], "visible": _hidden_daishoukuanxiaoji, "searchable": _hidden_daishoukuanxiaoji },
				{ "targets": [24], "visible": false, "searchable": false },
				{ "targets": [25], "visible": false, "searchable": false },
				{ "targets": [26], "visible": false, "searchable": false }
			]
		});

		//每次都必须邦定tr的点击事件
		bindActiveTr();

		//绑定两个表的关联切换
		bindTableToggle_01(table_right);
	}
}
function bindActiveTr() {
	$(".data-table").on('click', ' tbody tr', function () {
		$(this).toggleClass('active');
	});
}
function setHejiTable(data_source_table) {
	//根据页面类型判断如果页面是1个合计,则计算1个合计,如果是2个则计算2个
	if (_pageType == 0) {
		bindDispatchOrderTotalTable_01(data_source_table, $("#total_wrap"));
	}
	else {
		bindDispatchOrderTotalTable_01($("#left_list_wrap table"), $("#bottom_left_wrap"));
		bindDispatchOrderTotalTable_01($("#right_list_wrap table"), $("#total_wrap"));
	}
}
function setTabDispatchOrderCheck(_button, _value) {
	if (_button.attr("b_type") == "0") {
		//恢复旧运单
		var _filltext = $(".filltext");
		$(".highlight").removeClass("highlight");
		$(".filltext").each(function (i, v) {
			$(v).text($(v).attr($(v).attr("id")));
			$(v).text($(v).attr(($(v).attr("id")) + "_text"));
		});
	}
	else {
		//新运单
		//高亮运单值不一致的地方
		if (_value) {
			$.each(JSON.parse(_value), function (i, v) {

				if (i == "fsendSiteName") {
					$("#fsendSiteNo").text(v);
					$("#" + i).addClass("highlight").text(v);
				}
				else if (i == "freceiveSiteName") {
					$("#freceiveSiteNo").text(v);
					$("#" + i).addClass("highlight").text(v);
				}
				else if (i == "orderFee") {
					$("#" + i).addClass("highlight").text(v);
					$.each(v, function (j, k) {
						$("#" + j).addClass("highlight").text(k);
						if (j == "fhedgeRatio") {
							$("#" + j).text((" x " + (k * 1000) + "‰"));
						}
						else if (j == "fpayTypeName") {
							$("#fpayType").html(k);
						}
						else if (j == "fisRequiredReceipt") {
							$("#" + j).text((k == 0 ? "否" : "是"));
						}
						else if (j == "ftotalFee") {
							$("#" + j).text("￥" + k);
						}
					});
				}
				else if (i == "cod") {
					$("#" + i).addClass("highlight").text(v);
					$.each(v, function (j, k) {
						$("#" + j).addClass("highlight").text(k);
					});
				}
				else if (i == "goods") {
					$.each(v, function (j, k) {
						if (typeof (k.fid) != "undefined" && k.fid > 0) {
							for (var jjk = 0; jjk < 3; jjk++) {
								if ($("#fgoodsFid_" + jjk).val() == k.fid) {
									if (typeof (k.fisDeleted) != "undefined" && k.fisDeleted == true) {
										$("#fgoodsName_" + jjk).addClass("highlight").text("");
										$("#fgoodsNum_" + jjk).addClass("highlight").text("");
										$("#fgoodPrice" + jjk).addClass("highlight").text("");
										$("#fpacket_" + jjk).addClass("highlight").text("");
									} else {
										$.each(k, function (n, m) {
											$("#" + n + "_" + jjk).addClass("highlight").text(m);
										});
									}
								}
							}
						} else {
							for (var jjk = 0; jjk < 3; jjk++) {
								if (!$("#fgoodsFid_" + jjk).val() > 0) {
									$.each(k, function (n, m) {
										$("#" + n + "_" + jjk).addClass("highlight").text(m);
									});
									$("#fgoodsFid_" + jjk).val(1);
									jjk = 4;
								}
							}


						}
						var goodsNum0 = ($("#fgoodsNum_0").text() != 0 ? parseInt($("#fgoodsNum_0").text()) : 0);
						var goodsNum1 = ($("#fgoodsNum_1").text() != 0 ? parseInt($("#fgoodsNum_1").text()) : 0);
						var goodsNum2 = ($("#fgoodsNum_2").text() != 0 ? parseInt($("#fgoodsNum_2").text()) : 0);
						var tempSum = goodsNum0 + goodsNum1 + goodsNum2;
						if (tempSum != $("total_num").attr("total_num")) {
							$("#total_num").addClass("highlight").text(tempSum);
						}
					});

				} else if (i == "fpayTypeName") {
					$("#fpayType").html(v);
					$("#" + i).addClass("highlight").text(v);
				} else {
					$("#" + i).addClass("highlight").text(v);
				}
			});
		}
	}
}
function getFstatffListData(fjobNo, frealName, callback) {
	//ztree用查询员工列表
	var sendObj = {
		"fcompanyId": getUserInfo(0).fcompanyId,
		"fjobNo": fjobNo,
		"frealName": frealName,
		"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
	};
	_call("1001001308", sendObj, function (res) {
		if (res.msgBody) {
			var data_01 = new Array();
			$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
				data_01[i] = new Array();
				data_01[i] = v;
				data_01[i]['id'] = v.fid;
				data_01[i]['name'] = "工号:" + v.fjobNo + "&nbsp;&nbsp;&nbsp;&nbsp;姓名:" + v.frealName + "(" + v.fdepartmentNames + ")";
			});
			if (callback) {

				callback(data_01);
			}
			else {
				return data_01;
			}
		}
	});
}function getFtruckListData(fplateNo, callback) {
    //ztree用查询车辆列表
    var sendObj = {
        "fcompanyId": getUserInfo(0).fcompanyId,
        "fplateNo": fplateNo,
        "ftruckMobile":"",
        "ftruckTypeNo":"",
        "fisAbled":"1",
        "pageSetBody": { "pageNo": 0, "pageSize": "20" }
    };
    _call("1001002111", sendObj, function (res) {
        if (res.msgBody) {
            var data_01 = new Array();
            $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                data_01[i] = new Array();
                data_01[i] = v;
                data_01[i]['id'] = v.fid;
                data_01[i]['name'] = "车牌号:" + v.fplateNo + "&nbsp;&nbsp;&nbsp;&nbsp;司机:" + v.fstaffName  + "&nbsp;&nbsp;&nbsp;&nbsp;电话:" + v.ftruckMobile;
            });
            if (callback) {
                callback(data_01);
            }
            else {
                return data_01;
            }
        }
    });
}
function getRoleListData(rolename) {
	var result;
	var sendObj = {
		"fcompanyId": getUserInfo(0).fcompanyId,
		"froleNo": "",
		"froleName": rolename,
		"fremark": "",
		"pageSetBody": { "pageNo": 0, "pageSize": "-1" }
	};

	_call("1001000323", sendObj, function (res) {
		if (res.msgBody) {
			var data_01 = new Array();
			$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
				data_01[i] = new Array();
				data_01[i] = v;
				data_01[i]['id'] = v.fid;
				data_01[i]['froleNo'] = v.froleNo;
				data_01[i]['name'] = v.froleName;
			});
			result = data_01;
		}
	});
	return result;
}
//信息页面获取输入的电话号
function upDateInfo(that){
	var inputVal = $(that).parent().prev().children("#Tel").val();

    _call("1001000468",{type:1,fsims:inputVal},function(res){
		if(res.msgBody){
			d_alert("完成","更新电话薄成功！","success")
		}
    })
}
//对元素监听回车事件
function domOnkeyDown(DOM,fun){
	if(DOM.length>0){
        DOM.on("keydown",function(e){
            if(e.keyCode == "13" || e.keyCode == "108"){
                fun();
            }
        })
	}
}
//绑定筛选按钮单击事件
function screenBtnClick(fun){
    $("body").on("click",e=>{
    	if($(e.target).hasClass("screen_start") || $(e.target).hasClass("screen_end")){
    		let _p = config["pagination_01"];
            if (_p && _p.text() && "暂无数据" != _p.text()) {
                _p.pagination('destroy');
            }
    		//获取当前页面的选中状态
            var _status = JSON.parse(window.localStorage.getItem("pageScreenStatus")),
				screenStatus=true;//筛选状态
            // 	loadingDom = getMainDom("#loading");
            // loadingDom.show();
            if($(e.target).hasClass("screen_start")){
                screenStatus="true";
                //设置按钮样式
                $(e.target).text("禁用筛选").removeClass("screen_start").addClass("screen_end");
            }else if($(e.target).hasClass("screen_end")){
                screenStatus="false";
                $(e.target).text("启用筛选").removeClass("screen_end").addClass("screen_start");
                $(".data-table").find("div.dropdown-filter-dropdown,div:hidden,tr:hidden").remove();
            }
            if(_status){
                _status[_page] = {
                    "_status" : screenStatus,
                    "_html" : $(".data-table").parent().html(),
                }
            }
            //改变状态
            window.localStorage.setItem("pageScreenStatus",JSON.stringify(_status))
		}
    })
}
//页面初始化时 判断该页面是否已经是筛选状态
function pageIsScreen(fun){
    let status = JSON.parse(window.localStorage.getItem("pageScreenStatus"));
    if(status[_page] && status[_page]["_status"] == "true"){
    	$(".screenBtn").text("禁用筛选").removeClass("screen_start").addClass("screen_end");
    	if(fun) {
    		fun("1","1000000",setTableFiltrate)
		}
	};
    //绑定筛选按钮单击事件
    screenBtnClick(fun);
}
// 绑定table筛选
function setTableFiltrate(Dom,option){
    var Dom = Dom || $(".excalTable");
    $("head").append("<link>");
    $("head").children(":last").attr({
        "rel":"stylesheet",
        "type":"text/css",
        "href":"/assets/stylesheets/sortTable/table.css"
    })
    $.getScript("/assets/javascripts/sortTable/table.js",function(){
        option = $.extend(true,{},option?option:{},{"sort":false,'captions':{ a_to_z: '升序排列', z_to_a: '降序排列', search: '搜索', select_all: '全部选择' }});
        if(Dom.length>1){
            Dom.each((i,v)=>{
                $(v).excelTableFilter(option);
            })
        }else{
            Dom.excelTableFilter(option);
        }
    })
}
//获取主页面元素
function getMainDom(Dom){
	if(top.$(Dom).length>0){
		return top.$(Dom);
	}else if($(Dom).length>0){
        return $(Dom);
	}
}
/*
* 新版 表格左右移动
* Dom 两个table 和 按钮组的共同元素
* data 查询出的数据
* _html table头部信息
* clickMove tr点击事件 true/false 判断点击是做移动还是高亮
* _paytype 如果传值 就固定 交付提付还是合同户 1交付 2提付 3 合同户
* */
function tableShuffling(option){
	this.leftHtml = option._html || $("#left_list_wrap .order_div_head").prop("outerHTML");
	this.rightHtml = option._html || $("#left_list_wrap .order_div_head").prop("outerHTML");
	this._paytype = option._paytype || false;
	this.Dom = option.Dom || $("#tableParent");
	this.input = this.Dom.find(".toggle_input");
	this.data = option.data;
	this.clickMove = option.clickMove || false;
	this.disPatchOrderType = [];
	this._liWidth = [];
	//下边table合计
	this.leftTotal = {};
	this.rightTotal = {};
	//保持不变的左右合计
    this.leftTotalClone = {};
    this.rightTotalClone = {};
}
tableShuffling.prototype = {
	init : function(){
		let	that = this;
		//获取需要计算那几个合计 _fdispatchOrderType
		$("#bottom_left_wrap").find(".order_table_body").each((i,v)=>{
            that.leftTotal[$(v).attr("fdispatchordertype")]={};
            that.rightTotal[$(v).attr("fdispatchordertype")]={};
            //往type类型数组中放输入数据
            that.disPatchOrderType.push($(v).attr('fdispatchordertype'));
            //根据table头部信息  获取到有多少列
            $(v).find("li:first-child~li").each((index,value)=>{
                that.leftTotal[$(v).attr("fdispatchordertype")][$(value).attr("fname")] = 0;
                that.rightTotal[$(v).attr("fdispatchordertype")][$(value).attr("fname")] = 0;
            })
		})
		//拼接上方两个table
        this.joinTopTable();
		//初始化合计
		this.setBottomTotal();
        //复制两个备用数据
        this.leftTotalClone = JSON.parse(JSON.stringify(this.leftTotal));
        this.rightTotalClone = JSON.parse(JSON.stringify(this.rightTotal));
        //绑定输入框查询
        this.bindInputChange();
		//绑定tr 点击事件
		this.bindTrClick();
		//绑定按钮组 点击事件
		this.bindBtnClick();
	},
	joinTopTable : function(){
		let _dom = this.Dom,
			that = this,
        	leftTable = _dom.find("#left_list_wrap"),
            rightTable = _dom.find("#right_list_wrap"),
            //获取字体大小 设置宽度使用
            _fontSize = leftTable.css("fontSize").slice(0,-2)*1,
            //li 所有的字段名称
            liArr = [];
        //根据table头部信息  获取到有多少列
        $("#left_list_wrap .order_div_head li").each((i,v)=>{
            liArr.push($(v).attr("fname"));
            that._liWidth.push($(v).text().length);
        })
        //遍历返回的数据 拼接到页面 拼接上边两个table
        $.each(this.data,(i,v)=>{
            //拼接table
            let _ul = `<ul class="order_ul">`;
            $.each(liArr,(idx,val)=>{
            	//如果字段值没有标题长 就按照标题的宽度
                let a = (i+1+"").length*1,
					_data = v[val];
                //判断是否有,
				if(val.indexOf(",")>-1){
                    _data = eval(`v['${val.replace(",","']['")}']`);
                    val = val.split(",");
                    val = val[val.length-1];
				}
                if(idx < 1) {
                	//序号
                    _ul +=`<li fname="${val}">${i+1}</li>`;
                }else if(val == "fpayType"){
                	//单独判断payType
                    _ul +=`<li class="hide" fname="fpayType">${that._paytype?that._paytype:_data}</li>`;
				}else if(val == "fdispatchOrderType"){
                    //单独判断dispatchOrderType
                    _ul +=`<li class="hide" fname="fdispatchOrderType">${that.disPatchOrderType.length == 1?that.disPatchOrderType[0]:_data}</li>`;
                }else{
                    _ul +=`<li fname="${val}">${_data}</li>`;
                    a = (v[val]+"").length*1;
                }
                //判断每一个列的最大宽度
                that._liWidth[idx] = that._liWidth[idx] > a? that._liWidth[idx] : a;
            });
            _ul +=`</ul>`;
            this.leftHtml+=`<div class="order_div order_div_body active"  leftOrRight="left" fdispatchOrderNo="${v.fdispatchOrderNo}">${_ul}</div>`
            this.rightHtml+=`<div class="order_div order_div_body"  leftOrRight="right" fdispatchOrderNo="${v.fdispatchOrderNo}">${_ul}</div>`;
            // 计算合计
            that.calculateTotals(v);
        });
        leftTable.html(this.leftHtml);
        rightTable.html(this.rightHtml);
        //遍历div 设置宽度
        $.each(that._liWidth,(index,value)=>{
            $(".order_div li:nth-child("+(index+1)+")").css("width",_fontSize*value);
        })
	},
	bindInputChange : function(){
		let that = this;
        this.input.off("keydown").on("keydown",function(e){
            let _this = $(this);
            if (e.keyCode == 13) {
                if (_this.val() != "") {
					 let nowPlace = $(this).hasClass("left_search")?"left":"right",
						 toPlace = nowPlace == "right"?"left":"right",
						 orderNo = _this.val(),
						 src = "/assets/music/error.wav";
                    _this.blur();
                    if(that.moveOrder(nowPlace,orderNo)){
                        _this.focus().select();
					}else{
                        top.swal({
                            title:"错误",
                            text:"未找到改运单号",
                            type:"error",
                            allowEscapeKey:true,
                            confirmButtonText:"确认",
                        }).then(function(isConfirm){
                            top.swal.close();
                            //输入框获得焦点
							_this.focus().select();
                        })
                        //控制音频播放
                        top.$("#warningTone").prop("src",src);
                        top.$("#warningTone").get(0).play();
					}
                }
            }
		})
	},
	bindTrClick : function(){
        //绑定单击 tr单击事件
		let that = this;
        $("#left_list_wrap,#right_list_wrap").off("click").on("click",".order_div_body",function(){
        	//根据传进来的参数 判断点击tr做什么处理
        	if(that.clickMove){
                //确定运单号
                let orderNo = $(this).attr("fdispatchOrderNo"),
                    leftOrRight = $(this).attr("leftOrRight")=="right"?"right":"left";
                // 确定是左边点击还是右边点击、
                if(orderNo){
                    that.moveOrder(leftOrRight,orderNo);
                }
			}else{
        		$(this).toggleClass("clickActive");
			}
        })
	},
	bindBtnClick : function(){
		let that = this;
        //绑定按钮单击
		$("#toggle_btns").off("click").on("click","a",function(e){
			//获取当前所在位置
			let nowPlace = $(this).attr("id").indexOf("right")>-1?"left":"right";
			switch ($(this).attr("id")) {
				//点击左右单个移动时
                case "toggle_right":
                case "toggle_left":
					if($("#"+nowPlace+"_list_wrap div.order_div_body.clickActive").length>0){
                        $("#"+nowPlace+"_list_wrap div.order_div_body.clickActive").each((i,v)=>{
                            that.moveOrder(nowPlace,$(v).attr("fdispatchOrderNo"))
						})
					}else{
						d_alert("错误","请先选择要移动的运单!","error")
					}
                	break;
                //点击左右全部移动时
                case "toggle_right_all":
                case "toggle_left_all":
                    that.moveAllOrder(nowPlace);
                	break;
            }
            //清除选中状态
            $("#"+nowPlace+"_list_wrap div.order_div_body.clickActive").removeClass("clickActive");
		})
    },
	moveOrder : function(nowPlace,orderNo){
		//移动单个运单
		let toPlace = nowPlace=="right"?"left":"right",
			that = this,
			nowOrder = $("#"+nowPlace+"_list_wrap div[fdispatchOrderNo="+orderNo+"]"),
			toOrder = $("#"+toPlace+"_list_wrap div[fdispatchOrderNo="+orderNo+"]"),
			payType = nowOrder.find("[fname=paytype]").text(),
			//测试数据大量重复运单 此处type会获取到多个重复type
            disPatchOrderType = (nowOrder.find("[fname=fdispatchOrderType]").text()).slice(0,1),
			_data = {},
            isReduce = nowPlace == "right"?false:true;
        if(toOrder.length>0){
            if(toOrder.is(":hidden") && !nowOrder.is(":hidden")){
                //获取到该行的数据
                nowOrder.find("li").each((i,v)=>{
                    _data[$(v).attr("fname")] = $(v).text();
                })
                //修改两个table的计算数据
                that.countLine(that.leftTotal,_data,disPatchOrderType,isReduce);
                that.countLine(that.rightTotal,_data,disPatchOrderType,!isReduce);
                if(disPatchOrderType != 4){
                    //计算合计 如果disPatchOrderType已经是4 就不需要在计算合计
                    that.countLine(that.leftTotal,_data,4,isReduce);
                    that.countLine(that.rightTotal,_data,4,!isReduce);
				}
                // 页面赋值
                that.setBottomTotal(that.leftTotal,that.rightTotal);
                toOrder.addClass("active");
                nowOrder.removeClass("active");
                //设置最后一个运单高亮
                that.setMoveOrderStyle(toOrder);
                return true;
            }else{
            	d_alert("错误","已结算运单中存在该运单！","error",()=>{
                    return true;
                })
			}
        }else{
            return false;
        }
	},
    moveAllOrder : function(nowPlace){
		//移动所有的运单
		if($("#"+nowPlace+"_list_wrap div.order_div_body.active").length>0){
            let leftData = nowPlace == "left"?this.rightTotalClone:this.leftTotalClone,
                rightData = nowPlace == "left"?this.leftTotalClone:this.rightTotalClone;
            //移动所有运单
            let toPlace = nowPlace=="right"?"left":"right";
            $("#"+nowPlace+"_list_wrap div.order_div_body").removeClass("active");
            $("#"+toPlace+"_list_wrap div.order_div_body").addClass("active");
            //设置最后一个运单高亮
            this.setMoveOrderStyle($("#"+toPlace+"_list_wrap div.order_div_body.active:last"));
            //对合计赋值
            this.setBottomTotal(leftData,rightData);
            //重新对数据赋值
			this.leftTotal = JSON.parse(JSON.stringify(leftData));
			this.rightTotal = JSON.parse(JSON.stringify(rightData));
		}
	},
	setMoveOrderStyle : function(nowOrder){
    	let that = this,
            toPlace = nowOrder.attr("leftorright"),
			toDom = $("#"+toPlace+"_list_wrap"),
			order = nowOrder.attr("fdispatchOrderNo"),
			//当前元素在总元素的下标
			_index = toDom.find(".order_div_body.active").index(nowOrder)*1 + 1;
        nowOrder.addClass("clickActive").siblings(".clickActive").removeClass("clickActive");
            if(toDom.children(".order_div_body.active").length>6){
            	//设置偏移量 每次偏移 一行高度*个数
				toDom.scrollTop(toDom.find(">div:first").height()*1 * (_index-3 > 0 ?_index-3 : 0))
			}
            // table_02.parent().parent().scrollTop(table_02.height()-table_02.parent().parent().height()*1+36);
	},
    calculateTotals : function(v){
    	//区分计算哪一行 分成4行 根据传进来的_fdispatchOrderType参数判断需要计算那几行
        let that = this;
        if(v.fdispatchOrderType){
            that.countLine(that.leftTotal,v,v.fdispatchOrderType);
		}
        that.countLine(that.leftTotal,v,4);
	},
	countLine : function(_total,value,num,isReduce){
        //_total要修改的地方 value 总数据 num 第几行 isReduce 是增加还是减少
        //计算一行数据
        let that = this,
			//如果传入的有paytype  就按照传入的来 如果没有就从数据中拿到
			paytype = that._paytype || (value["orderFee"]?value["orderFee"]["fpayType"]:value["fpayType"]),
			Count = isReduce?"-":"+",
			_carriage = value["orderFee"] ? value["orderFee"]["fcarriage"] : value["fcarriage"];
        //判断调用时有没有传入paytype
		if(_total[num]){
            if(paytype){
                //计算对应的提付交付合同户
                _total[num]["fcarriage_"+paytype] = eval(_total[num]["fcarriage_"+paytype]*1+""+Count+""+_carriage*1);
            }else{
                console.log("错误，没有传入_paytype,并且数据没有返回paytype");
            }
            //计算票数
            _total[num]["orderNum"] = eval( _total[num]["orderNum"] +""+Count+""+ 1);
            $.each(_total[num],(i,v)=>{
                // 计算合计 合计数据格式可能在orderFee中
				if(i=="ftotalFee"){
                    _total[num][i] = eval(v*1 +""+Count+""+ (value[i] != 0 ? value[i]*1 : (value["orderFee"] ? value["orderFee"][i]*1 : 0)));
				}else{
                    _total[num][i] = eval(v*1 +""+Count+""+ (value[i]?value[i]*1:0));
                }
            })
		}
    },
	clearTotal : function(nowPlace){
		let that = this;
		//清楚上方table数据
        $("#"+nowPlace+"_list_wrap").find(".order_div_body.active").each((i,v)=>{
        	$(v).removeClass("active");
		})
        //清楚下方合计
		$("#bottom_"+nowPlace+"_wrap").find(".order_table_body").each((i,v)=>{
			$(v).find("li:first-child~li").text(0);
            $.each(that[nowPlace+"Total"][$(v).attr("fdispatchordertype")],(ii,vv)=>{
                that[nowPlace+"Total"][$(v).attr("fdispatchordertype")][ii] = 0;
                that[nowPlace+"TotalClone"][$(v).attr("fdispatchordertype")][ii] = 0;
			})
		})
	},
	tableTotal : function(nowPlace){
		//返回合计的数据
		return this[nowPlace+"Total"];
	},
	tableData : function(nowPlace,topOrBottom,_jsonOrArr){
		//返回table数据
		// topOrBottom 是上边table还是下边 1上 2下
		// jsonOrArr 返回json还是数组 1 json 2 arr
		let Dom = topOrBottom == 1 ? $("#"+nowPlace+"_list_wrap") : $("#bottom_"+nowPlace+"_wrap"),
            _tableData = {},
			jsonOrArr = _jsonOrArr || 1,
            lineSelect = topOrBottom == 1 ? "div.active" : ".order_table_body",
            listSelect = "li",
            listName = "fname";
        Dom.find(lineSelect).each((i,v)=>{
            _tableData[i] = jsonOrArr == 1 ? {} : [];
            $(v).find(listSelect).each((index,value)=>{
            	if(jsonOrArr == 1 ){
                    _tableData[i][$(value).attr(listName)] = $(value).text();
                }else{
                    _tableData[i].push($(value).text());
				}
            })
        })
        return _tableData;
	},
    setBottomTotal : function(leftTotal,rightTotal){
		let that = this;
		leftTotal = leftTotal || that.leftTotal,
		rightTotal = rightTotal || that.rightTotal;
		//下边表格赋值
    	$("#bottom_left_wrap,#bottom_right_wrap").each((i,v)=>{
    		//确定数据
    		var data = $(v).attr("id").indexOf("left") > -1 ? leftTotal : rightTotal;
    		$.each(data,function(ii,vv){
    			$.each(vv,(index,value)=>{
    				//找到对应li 填充值
                    $(v).find(".order_table_body[fdispatchOrderType="+ii+"]").find("li[fname="+index+"]").text(value);
                })
			})
 		})
	}

}
/*
* 拼接下边table
* option 参数列表
* option.Dom 对应元素
* option.dispathchordertype 数组 1正程 2返程 3中转 4合计 逗号分隔 默认4个 [1,2,3,4]
* fun 回调
* */
function setTotalTable(option,fun){
	let num = option.dispathchordertype || [1,2,3,4],
		Dom = option.Dom;
	Dom.each((index,value)=>{
		let Dom = $(value),
            _list = [];
        Dom.find(".order_table_head li:first-child~li").each((i,v)=>{
            _list.push($(v).attr("fname"));
        })
        $.each(num,(i,v)=>{
            let name,
                _html;
            switch (v+""){
                case "1":
                    name = "正程";
                    break;
                case "2":
                    name = "返程";
                    break;
                case "3":
                    name = "中转";
                    break;
                case "4":
                    name = "合计";
                    break;
            }
            _html = `<div class='order_table order_table_body' fdispatchOrderTypeName="${name}" fdispatchOrderType="${v}"><ul class='order_table_ul'><li>${name}</li>`;
            $.each(_list,(ii,vv)=>{
                _html += `<li fname = "${vv}">&nbsp;</li>`;
            })
            _html += "</ul></div>";
            Dom.append(_html);
        })
	})

}

/*
* 获取table的数据
* Dom 要获取的元素
* 返回json版
* */
function getTablePrice(Dom,option){
	option = option || {};
	let _tableData = {},
		lineSelect = option.lineSelect || "div.active",
		listSelect = option.listSelect || "li",
		listName = option.listName || "fname";
    Dom.find(lineSelect).each((i,v)=>{
        _tableData[i] = {};
		$(v).find(listSelect).each((index,value)=>{
            _tableData[i][$(value).attr(listName)] = $(value).text();
        })
	})
	return _tableData;
}
function getTablePrice_01(Dom,option){
    option = option || {};
    let _tableData = [],
        lineSelect = option.lineSelect || "div.active",
        listSelect = option.listSelect || "li",
        listName = option.listName || "fname";
    Dom.find(lineSelect).each((i,v)=>{
        _tableData[i] = [];
        $(v).find(listSelect).each((index,value)=>{
            _tableData[i].push($(value).text());
        })
    })
    return _tableData;
}
//设置下拉框
function setSelectCode(arr,Dom){
    this.arr = arr;
    this.resArr = [];
    this.Dom = Dom;
}
setSelectCode.prototype = {
    init : function(){
        let bankCodeArr = this.arr.split(";");
        $.each(bankCodeArr,(i,v)=>{
            if(v){
                let a = v.split(",");
                this.resArr.push(a);
            }
        })
        this.setSelect();
    },
    setSelect : function(){
        if(this.resArr.length > 0){
            $.each(this.resArr,(i,v)=>{
                this.Dom.append(`<option value="${v[1]}">${v[0]}</option>`);
            })
        }
    }
}
//绑定键盘事件
function bindKeyDown(DOM,fun){
	DOM.off("keydown").on("keydown",(e)=>{
		if(e.keyCode == "13" || e.keyCode == "108"){
			if(fun) fun();
		}
	})
}
//导入导出公共方法
//页面引用必须只有boot3所 如果发现显示框位置有问题 检查页面是否同时引用了boot2
class importFun{
	constructor(option){
		this.fileData = [];
        this.fun = option.callback;
        this.option = option;
        this.takeOutOption = option.takeOutOption;
        this.joinPage();
		this.bindEvent();
	}
	joinPage(){
        var downPath=modalType(this.option.takeOutCode);
        //引用相应js
        $("head").append("<link href='/assets/stylesheets/bootstrap/bootstrap.min3.3.7.css' media='all' rel='stylesheet' type='text/css' />");
        $("head").append("<link href='/assets/stylesheets/fileinput/fileinput.css' media='all' rel='stylesheet' type='text/css' />");
        $("head").append("<link href='/assets/stylesheets/fileinput/fileinput-rtl.css' media='all' rel='stylesheet' type='text/css' />");
        $("body").append(`<script src='/assets/javascripts/fileinput/fileinput.js' type='text/javascript'></script>`);
        $("body").append("<script src='/assets/javascripts/fileinput/locales/zh.js' type='text/javascript'></script>");
        //样式冲突结局
		$("head").append(`<style>
			.btn-mini{
				padding: 5px 10px!important;
				font-size: 12px!important;
				line-height: 1.5!important;
				border-radius: 3px!important;
			}
		</style>`);
		$("#btnGroup").append(`<button class="btn btn-success d_import"><i class="icon-white icon-plus"></i> 导入</button>&nbsp;`);
		if(this.takeOutOption) $("#btnGroup").append(`<button class="btn btn-success takeOut"><i class="icon-white icon-plus"></i> 导出</button>`);
        let $modal = $(`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						  <div class="modal-dialog" role="document">
							<div class="modal-content">
							  <div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">上传文件</h4>
							  </div>
							  <div class="modal-body">
							  	<div class="imgparent0" id="idCardParent"></div>
							  </div>
							  <div class="modal-footer">
							    <span><a href="`+downPath+`">点击下载导入模板</a>&nbsp;&nbsp;</span>
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
								<button type="button" class="btn btn-primary" id="fileUpload">上传</button>
							  </div>
							</div>
						  </div>
						</div>`);
		$("body").append($modal);
	}
    bindEvent(){
		//绑定事件
		let upLoadOption = {
				language : 'zh',
				showCancel:false,
				showRemove:true,
				maxFileSize:1024,
				fileActionSettings:{
					showRemove: true,
					showUpload: false,
					showZoom: true,
					showDrag: true,
					removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
					removeClass: 'btn btn-xs btn-default',
					removeTitle: 'Remove file',
					uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
					uploadClass: 'btn btn-xs btn-default',
					uploadTitle: 'Upload file',
					zoomIcon: '<i class="glyphicon glyphicon-zoom-in"></i>',
					zoomClass: 'btn btn-xs btn-default',
					zoomTitle: 'View Details',
					dragIcon: '<i class="glyphicon glyphicon-menu-hamburger"></i>',
					dragClass: 'text-info',
					dragTitle: 'Move / Rearrange',
					dragSettings: {},
					indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
					indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
					indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
					indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
					indicatorNewTitle: 'Not uploaded yet',
					indicatorSuccessTitle: 'Uploaded',
					indicatorErrorTitle: 'Upload Error',
					indicatorLoadingTitle: 'Uploading ...'
				},
				uploadUrl: "http://zzzy.56ps.cn:8893",//无用 插件要求填
				uploadAsync: true,
				maxFileCount: 1,
				showBrowse: false,
				browseOnZoneClick: true,
				allowedFileExtensions : [ 'xlsx'],
				initialPreviewShowDelete:false
			},
			that = this;
		$(".d_import").click(function(){
            $('#myModal').modal('show');
		})
		//模态框显示
        $('#myModal').on("show",() => {
        	if(!$("#idCardParent").find("#idCard").length>0){
                $("#idCardParent").append(`<input id="idCard" name="idCard[]" type="file" class="file hoverImg i1" multiple data-show-upload="false" data-show-caption="true" data-msg-placeholder="上传相关excal">`)
                $("#idCard").fileinput(upLoadOption);
                $("#idCard").on("filebatchselected",function(event,data){
                	if(data.length>0){
                		that.fileData[0] = data[0];
					}
                })
			}
		})
		//保存按钮点击
		$("#fileUpload").click(() => {
            if(!$(".kv-fileinput-error").is(":hidden")){
                d_alert("错误","文件格式错误！","error");
            }else if(that.fileData.length==0){
                d_alert("错误","请选择excal！","error");
			}else{
                that.fun(that.fileData);
            }
		});
		//导出按钮点击
		if($(".takeOut").length > 0){
            $(".takeOut").click(function(){
                takeOut(that.option.takeOutCode,that.takeOutOption)
            })
		}
	}
}
//导出excal
function takeOut(msgid,Obj){
    var sendObj = eval(`(${Obj})`);
    if (sendObj) {
        var sendData = {};
        sendData['msgId'] = msgid;
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
//导入导出成功回调方法
function newUploadSuccess(res){
    if(res.msgBody.sta=="ok"){
        d_alert("成功",res.msgBody.staInfo,"success",function(){
        	$(".kv-file-remove").click();
        	$("#myModal").modal('hide');
		});
    }else{
        d_alert("错误!",res.msgBody.staInfo,"error");
    }
}
//判断数据是否存在 nullData 如果不存在返回的值
function isnull(data,nullData=''){
    if(data && data !='undefined' && data != 'null'){
		return data;
    }else{
		return nullData
    }
}
function  modalType(takeOutCode) {
	var downloadPath='';
	switch (takeOutCode) {
		case '1001000411':
            downloadPath='/excel/行政区导入模板.xlsx';
			break;
        case '1001000624':
            downloadPath='/excel/公司导入模板.xlsx';
            break;
        case '1001000809':
            downloadPath='/excel/干线路由导入模板.xlsx';
            break;
        case '1001002129':
            downloadPath='/excel/车型导入模板.xlsx';
            break;
        case '1001001518':
            downloadPath='/excel/货主导入模板.xlsx';
            break;
        case '1001000622':
            downloadPath='/excel/公司车队导入模板.xlsx';
            break;
        case '1001002116':
            downloadPath='/excel/车辆导入模板.xlsx';
            break;
		default:
            downloadPath='/excel/万里智能物流卡导入模板.xlsx';
            break;
    }
    return downloadPath;
}