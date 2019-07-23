$(function () {
    $(".floatDiv").each(function () {
        $(this).width(($(this).parent().width() - $(this).prev().width()) * 0.8)
    })
})
//通用绑定查询 增加empty参数 判断是否需要清空原有数据
function bindSearch_cyr(_dom, type1, type2, type3, callback) {
    if (_dom.children("[value='']")) {
        var _html = _dom.children("[value='']");
    }
    _dom.html("");
    if (_html) _dom.append(_html);
    var aSynSta = true;
    type3 = type3 || 0;
    callback = callback || null;
    if (_dom.length) {
        var _code, key_value, key_name;
        var sendObj = { "msgBody": "" };
        var _fcompanyId = getUserInfo(0).fcompanyId;
        switch (type1) {
            case 1:
                //车主信息
                _code = "1001000619";
                key_value = "fdepartmentNo";
                key_name = "fdepartmentName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "fdepartmentName": "",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 2:
                //查询货主信息 后边不加手机号版
                _code = "1001000314";
                key_value = "fuserNo";
                key_name = "frealName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "frealName": "",
                    "fmobile": "",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 3:
                //查询合同类型
                _code = "1001007200";
                key_value = "fagreemnetType";
                key_name = "ftypeName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                };
                break;
            case 19:
                //驾驶员信息 名称+手机号版
                _code = "1001001317";
                key_value = "fstaffNo";
                key_name = "frealName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "fdepartmentNo": type3,
                    "frealName": "",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 20:
                //驾驶员信息
                _code = "1001001317";
                key_value = "fstaffNo";
                key_name = "frealName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "fdepartmentNo": type3,
                    "frealName": "",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 21:
                //查询车辆类型信息
                _code = "1001002124";
                key_value = "ftruckTypeNo";
                key_name = "ftruckTypeName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "ftruckTypeCode": "",
                    "ftruckTypeName": "",
                    "msgid": _code,
                    "ftype": type2,
                    "fshowCom": type3,
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 22:
                //查询货主信息
                _code = "1001000314";
                key_value = "fuserNo";
                key_name = "frealName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "frealName": "",
                    "fmobile": "",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 23:
                //查询货物种类
                _code = "1001002133";
                key_value = "fgoodsTypeCode";
                key_name = "fgoodsTypeName";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "fgoodsTypeName": "",
                    "fgoodsTypeCode": "",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
                };
                break;
            case 24:
                //获取车辆
                _code = "1001002111";
                key_value = "ftruckNo";
                key_name = "fplateNo";
                sendObj = {
                    "fcompanyId": _fcompanyId,
                    "fplateNo": "",
                    "ftruckType": "",
                    "ftruckMobile ": "",
                    "fisAbled": "-1",
                    "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
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
                if (type1 == 1) {
                    //车主信息 返回格式问题特殊
                    $.each(res.msgBody.pageObjBody, function (i, v) {
                        _dom.append("<option value='" + v[key_value] + "' fphone='" + v["fmobile"] + "'>" + v[key_name] + "</option>");
                    });
                } else if (type1 == 19) {
                    //返回驾驶员信息 名称和手机号
                    $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                        _dom.append("<option value='" + v[key_value] + "' fphone='" + v["fmobile"] + "' nname='" + v[key_name] + "'>" + v[key_name] + "-" + v["fmobile"] + "</option>");
                    });
                } else if (type1 == 20) {
                    //返回驾驶员信息
                    $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                        _dom.append("<option value='" + v[key_value] + "' fphone='" + v["fmobile"] + "'>" + v[key_name] + "</option>");
                    });
                } else if (type1 == 21) {
                    //返回驾驶员信息
                    $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                        _dom.append("<option value='" + v[key_value] + "' Nname='" + v[key_name] + "'>" + v[key_name] + "</option>");
                    });
                    $("[nname='普通货车']").after($("[nname='牵引车']"))
                } else if (type1 == 22) {
                    //货主信息
                    $.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                        _dom.append("<option value='" + v[key_value] + "' fphone='" + v['fmobile'] + "' Nname='" + v[key_name] + "'>" + v[key_name] + "-" + v['fmobile'] + "</option>");
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
//操作中包含的按钮
function getTdOperate_cyr(_type, url_add, fid, key, key_field, url_edit, url_zhuizong) {
    var _add = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-success btn-mini' href='javascript:void(0);' title='添加'>添加</a>";
    var _edit = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "&rtype=edit' class='btn btn-primary btn-mini' href='javascript:void(0);' title='修改'>修改</a>";
    var _del = "<a class='btn btn-danger btn-mini del' href='javascript:void(0);' title='删除' fid='" + fid + "' " + key + "='" + key_field + "'>删除</a>";
    var _view = "<a class='btn btn-success btn-mini view' href='javascript:void(0);' title='查看' " + key + "='" + key_field + "'>查看</a>";
    var _zuofei = "<a class='btn btn-info btn-mini zuofei' href='javascript:void(0);' title='作废' " + key + "='" + key_field + "'>作废</a>";
    var _shenhe = "<a href='" + url_add + "?" + key + "=" + key_field + "' class='btn btn-info btn-mini shenhe' href='javascript:void(0);' title='审核' " + key + "='" + key_field + "'>审核</a>";
    var _shenhe2 = "<a href='javascript:void(0);' class='btn btn-info btn-mini shenhe' title='审核' fchangeApplyNo='" + fid + "' " + key + "='" + key_field + "'>审核</a>";
    var _dayin = "<a class='btn btn-info btn-mini dayin' href='javascript:void(0);' title='打印' " + key + "='" + key_field + "'>打印</a>";
    var _view3 = "<a class='btn btn-success btn-mini view' href='javascript:void(0);' title='查看' fchangeApplyNo='" + fid + "' " + key + "='" + key_field + "'>查看</a>";
    var _view4 = "<a href='" + url_edit + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-success btn-mini view' href='javascript:void(0);' title='详情'>详情</a>";
    var _diaodu = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "&rtype=edit' class='btn btn-primary btn-mini' href='javascript:void(0);' title='调度'>调度</a>";
    var _undiaodu = "<a class='btn btn-danger btn-mini undiaodu' href='javascript:void(0);' title='取消调度' fid='" + fid + "' " + key + "='" + key_field + "'>取消调度</a>";
    var _baoxian = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-primary btn-mini' href='javascript:void(0);' title='保险'>保险</a>";
    var _trace = "<a href='" + url_zhuizong + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-inverse btn-mini trace' href='javascript:void(0);' title='详情'>追踪</a>";
    //审核
    var _shenhe3 = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "&rtype=shenhe' class='btn btn-info btn-mini shenhe' href='javascript:void(0);' title='审核'>审核</a>";
    //绑定消息通知角色
    var _role = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-primary btn-mini' href='javascript:void(0);' title='绑定角色'>绑定角色</a>";
    if (_type == 1) {
        //调度中心
        return _diaodu;
    }
    else if (_type == 2) {
        //装车单
        return _view4 + "&nbsp;" + _baoxian + "&nbsp;" + _undiaodu;
    }
    else if (_type == 3) {
        //装车单
        return _view4;
    }
    else if (_type == 4) {
        return _add + "&nbsp;" + _edit;
    }
    else if (_type == 10) {
        //绑定消息角色
        return _role;
    }
    else if (_type == 22) {
        //运单管理
        return _view4 + "&nbsp;" + _edit + "&nbsp;" + _zuofei + "&nbsp;" + _trace;
    }
    else if (_type == 23) {
        //运单管理
        return _view4 + "&nbsp;" + _trace;
    }
    else if (_type == 24) {
        //临时订单
        return _shenhe3;
    }
    else if (_type == 25) {
        //运单管理
        return _view4 + "&nbsp;" + _view4 + "&nbsp;" + _trace;
    }
}
//绑定取消调度事件
function setunDiaodu(_key, _code) {
    $(".undiaodu").on("click", function () {
        var _this = $(this);
        var _fcompanyId = getUserInfo(0).fcompanyId;
        dqq_confirm("确定要取消调度吗？", function () {
            eval("var Obj={" + _key + ":'" + _this.attr(_key) + "',fcompanyId:" + _fcompanyId + "}");
            _call(1001007104, Obj, function (res) {
                var _v = res.msgBody;
                eval("var sendObj={" + _key + ":'" + _this.attr(_key) + "',fcompanyId:'" + _fcompanyId + "',fdepartmentNo:'1',ftruckNo:'1',fstaffNo:'1',fsjyf:'1'}");
                sloading(function () {
                    _call(_code, sendObj, function (res) {
                        var notice_type = "error";
                        if (res.msgBody.sta == "ok") {
                            notice_type = "success"
                            _this.parent().parent().remove();
                        }
                        d_alert("提示", res.msgBody.staInfo, notice_type);
                    });
                }, 0);
            })
        })
    });
}
//增加一行 当前行不用隐藏 此处rowFluid为需要添加部分的id
function addRowFluid_02(addButton, wrapid, rowNumId, rowFluid, id, autoNum) {
    var _add = function () {
        var rowNumobj = $("#" + rowNumId);
        rowNumobj.val(parseInt(rowNumobj.val()) + 1);
        var rowContent = $("#" + wrapid).find("#" + id).html();
        var rowid = wrapid + "_" + rowNumobj.val();
        var delContent = "<button type='button' class='btn btn-danger span12 d_delRow' onclick='delRowFluid(\"" + rowid + "\",\"row-fluid\");' >删除</button>";

        rowContent = rowContent.replace('<delarea>', delContent);
        $("#" + wrapid).append("<div class='" + rowFluid + " " + wrapid + "' id='" + rowid + "'>" + rowContent + "</div>");
        $("#" + rowid + " .select3").select2();
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
//避免异步查询地区时间过长出现真空期 用假数据填充
function bindArea_cyrF(Province, City, County, receiverAddress, ProvinceN, CityN, CountyN, receiverAddressN) {
    $("#select2-" + Province + "-container").html(ProvinceN)
    $("#select2-" + City + "-container").html(CityN)
    $("#select2-" + County + "-container").html(CountyN)
    $("#select2-" + receiverAddress + "-container").html(receiverAddressN)
}
//查询表格  判断是否可用或者状态
function getText_fisAbled(_type, _code) {
    var _dom = "";
    var textT = "", textF = "";
    _code = _code || 0;
    switch (_code) {
        case 0:
            textT = "是";
            textF = "否";
            break;
        case 1:
            textT = "可用";
            textF = "不可用";
            break;
    }
    if (_type == 1) {
        _dom = "<span class='f_green'>" + textT + "</span>";
    }
    else {
        _dom = "<span class='f_red'>" + textF + "</span>";
    }
    return _dom;
}
//查询公司车队
function getTreeList_cyr(type1, type2, callback) {
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

        _call("1001000619", sendObj, function (res) {
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
                result = new treeMenu(res.msgBody.pageObjBody).init(0);
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

        _call("1001000619", sendObj, function (res) {
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
                result = new treeMenu(res.msgBody.pageObjBody).init(0);
                if (callback) {
                    callback(result);
                }
            }
        });
    }
    else if (type1 == 3) {
        //获取公司部门单选[公司组织机构设置用]
        sendObj = {
            "fcompanyId": _fcompanyId,
            "fdepartmentName": "",
            "pageSetBody": { "pageNo": 0, "pageSize": "-1" }
        };

        _call("1001000619", sendObj, function (res) {
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
                        console.log(a.length)
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
                result = new treeMenu(res.msgBody.pageObjBody).init(1);
                if (callback) {
                    callback(result);
                }
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

        _call("1001000619", sendObj, function (res) {
            if (res.msgBody) {
                var data_01 = new Array();
                $.each(res.msgBody.pageObjBody, function (i, v) {
                    data_01[i] = new Array();
                    data_01[i]['id'] = v.forganizationNo;
                    data_01[i]['pId'] = v.forganizationParentNo;
                    data_01[i]['fparentNo'] = v.fparentNo;
                    data_01[i]['name'] = v.fdepartmentName;
                    data_01[i]['forganizationType'] = v.forganizationType;
                    data_01[i]['fdepartmentNo'] = v.fdepartmentNo;
                });
                result = data_01;
                if (callback) {
                    callback(result);
                }
            }
        });
    }
    return result;
}
//绑定作废按钮
function setInvalid(_key, _code) {
    $(".zuofei").on("click", function () {
        var _this = $(this);
        var _fcompanyId = getUserInfo(0).fcompanyId;
        dqq_confirm("确定要作废吗？", function () {
            eval("var sendObj={" + _key + ":'" + _this.attr(_key) + "',fcompanyId:" + _fcompanyId + "}");
            sloading(function () {
                _call(_code, sendObj, function (res) {
                    var notice_type = "error";
                    if (res.msgBody.sta == "ok") {
                        notice_type = "success"
                        _this.parent().parent().remove();
                    }
                    d_alert("提示", res.msgBody.staInfo, notice_type);
                });
            }, 0);
        })
    });
}

//追踪按钮查询方法
function setTarce(_dom, msg, callback) {
    var _html = "";
    $.each(msg, function (i, v) {
        let _icon = "&#xe63f;";
        if (i == 0) {
            _icon = "&#xe643;"
        }
        switch (v.foperateTypeNo) {
            case 53:
                _html += `
                    <li class="layui-timeline-item">
                      <i class="layui-icon layui-timeline-axis">${_icon}</i>
                      <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" style="line-height:0;">${v.flatestUpdatedTime}</h3>
                        <p>
                            由
                            <span class="tarce_name">${v.flatestUpdatorName}</span>执行
                            <span class="tarce_caozuo">${v.foperateTypeName}</span>操作<br/>
                            生成运单：<span class="tarce_number">[${v.fdispatchOrderNo}]</span>
                        </p>
                      </div>
                    </li>
                `;
                break;
            default:
                _html += `
                    <li class="layui-timeline-item">
                      <i class="layui-icon layui-timeline-axis">${_icon}</i>
                      <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" style="line-height:0;">${v.flatestUpdatedTime}</h3>
                        <p>
                             由
                            <span class="tarce_name">${v.flatestUpdatorName}</span>执行
                            <span class="tarce_caozuo">${v.foperateTypeName}</span>操作
                            单号
                            <span class="tarce_number">[${v.fdispatchOrderNo}]</span>
                        </p>
                      </div>
                    </li>
                `;
        }
    })
    _dom.html(_html);
    if (callback) {
        callback();
    }
}
//设置默认时间 不增加时分秒
function setDefaultDate_cyr(_startDate, _endDate) {
    if (_startDate) {
        _startDate.val(getTime(1));
    }
    if (_endDate) {
        _endDate.val(getTime(1));
    }
}
function getParentforganizationNo3(node) {
    if (node.forganizationType == 1) {
        return node.forganizationNo;
    }
    else if (node.parent) {
        var _parentNode = node.parent;
        if (_parentNode.data.forganizationType == 1) {
            return _parentNode.data.forganizationNo;
        }
        else {
            return getParentforganizationNo3(_parentNode);
        }
    }
}
function getTdOperate_01(_type, url_add, fid, key, key_field, url_edit) {
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
    var _view4 = "<a href='" + url_edit + "?fid=" + fid + "&" + key + "=" + key_field + "' class='btn btn-success btn-mini view' href='javascript:void(0);' title='详情'>详情</a>";

    //审核
    var _shenhe3 = "<a href='" + url_add + "?fid=" + fid + "&" + key + "=" + key_field + "&rtype=shehe' class='btn btn-info btn-mini shenhe' href='javascript:void(0);' title='审核'>审核</a>";
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
        return _edit + "&nbsp;" + _view4;
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
        return _view4 + "&nbsp;" + _edit + "&nbsp;" + _zuofei;
    }
    else if (_type == 23) {
        return _view4;
    }
    else if (_type == 24) {
        return _shenhe3;
    }
}
function confirm_ok_wccyr(res, url_back, func) {
    if (res.msgBody.sta == "ok") {
        top.swal({
            title: res.msgBody.staInfo,
            type: "success",
            confirmButtonText: "确认",
            confirmButtonColor: "#49bf67",
            closeOnConfirm: false,
            allowOutsideClick: false
        }).then(function (isConfirm) {
            if (url_back != "") {
                top.swal.closeModal();
                window.location.href = url_back;
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