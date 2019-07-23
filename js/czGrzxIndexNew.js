//[1,2,3,4] 1货主 2车主 3驾驶员
//测试数据  实际使用userType_ + 1,2,3
let userData = {
        'userType_1':[
            {"fclassName":"基础信息管理","fclassNo":"100","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":100,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"发布订单","fmenuNo":"100","fmenuUrl":"tmpOrderAddOrChange.html","fremark":"","ftype":1,"ftypeOrderNo":1,"icon":"icon-category"},
            {"fclassName":"基础信息管理","fclassNo":"101","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":101,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"查询我的订单","fmenuNo":"100","fmenuUrl":"TempOrderSearchStatus.html","fremark":"","ftype":1,"ftypeOrderNo":1,"icon":"icon-liebiao"},
        ],
        'userType_2':[
            {"fclassName":"基础信息管理","fclassNo":"99","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":99,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"查询我的订单","fmenuNo":"100","fmenuUrl":"DispatchOrderSearchByCz.html","fremark":"","ftype":1,"ftypeOrderNo":1,"icon":"icon-viewgallery"},
            {"fclassName":"基础信息管理","fclassNo":"98","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":98,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"可用订单查询","fmenuNo":"100","fmenuUrl":"KYdispatchOrderSearch.html","fremark":"","ftype":1,"ftypeOrderNo":1,"icon":"icon-wenjianbiao"},
            {"fclassName":"基础信息管理","fclassNo":"97","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":97,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"车辆管理","fmenuNo":"100","fmenuUrl":"carList.html","fremark":"","ftype":1,"ftypeOrderNo":1,"icon":"icon-car"},
        ],
        'userType_3':[
            {"fclassName":"基础信息管理","fclassNo":"100","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":100,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"我的运单","fmenuNo":"100","fmenuUrl":"wccyrLoadListSearch.html","fremark":"","ftype":1,"ftypeOrderNo":1,"icon":"icon-viewgallery"},
        ],
        'userType_4':[
            {"fclassName":"基础信息管理","fclassNo":"100","fcompanyId":1,"fcreatedTime":"2016-04-20 00:00:00.0","fcreatorId":1,"fcreatorName":"超级管理员","fid":101,"fisDeleted":false,"flatestUpdatedTime":"2016-04-20 00:00:00.0","flatestUpdatorId":1,"flatestUpdatorName":"超级管理员","fmenuName":"直接发布运单","fmenuNo":"100","fmenuUrl":"directReleaseOrder.html","fremark":"","ftype":2,"ftypeOrderNo":1,"icon":"icon-viewgallery"},
        ],
    },
    userType=null;
$(function(){
    //文件功能列表
    var timer,clickNum = 0;
    if(checkDate()){
        var userInfo = getlocalStorage('userInfo');
        updataUserInfo(userInfo)
    }else{
        loadUserInfo();
    }
    userType = judgeUserType();
    //用户权限列表更新
    if(userType){
        new setBtnList(userData['userType_'+userType])
    }else{
        $.toast("获取用户功能列表失败！", "forbidden");
    }
    //用户双击时更新用户信息
    $(".weui-form-preview").click(() => {
        clickNum++;
        timer = setTimeout(()=>{
            if(clickNum == 2){
                loadUserInfo();
            }
            clickNum=0;
        },300)
    })
    $(".changePwd").click(function(){
        $.modal({
            title: "修改密码",
            autoClose:false,
            text: '<p class="weui-prompt-text">请输入原始密码和新密码</p>' +
            '<input type="text" class="weui-input weui-prompt-input" id="oldPwd" value="" placeholder="输入原始密码" />' +
            '<input type="password" class="weui-input weui-prompt-input" id="password" value="" placeholder="请输入新密码" />' +
            '<input type="password" class="weui-input weui-prompt-input" id="password2" value="" placeholder="请再次输入新密码" />',
            buttons: [
                { text: "确认", className: "primary", onClick: function(){
                    let pwd = $("#password").val(),
                        pwd2 = $("#password2").val(),
                        oldPwd = $("#oldPwd").val();
						window.localStorage.setItem('userPassword',JSON.stringify(pwd));
                    if(!oldPwd || !pwd || !pwd){
                        $.alert('请输入密码！');
                        return;
                    }else if(pwd != pwd2){
                        $.alert('两次新密码不相同！');
                        return;
                    }
                    _callWe('1001000329','/Basic/PersonPassChange',{"fpassword":pwd,"foldPassword":oldPwd},(res)=>{
                        if(res.msgBody.sta=='ok'){
                            $.toast(res.msgBody.staInfo,function(){
                                $.closeModal();
                            });
                        }else{
                            $.toast(res.msgBody.staInfo,'cancel');
                        }
                    })
                }},
                { text: "取消", className: "default", onClick: function(){$.closeModal();}},
            ]
        });
    })
});
function checkDate(){
    // true 缓存未过期  false缓存过期
    var local = getlocalStorage("tokenInfo");
    if(local.datatime && (new Date().getTime() - local.datatime*1 < 60*60*1000)){
        return true;
    }
    return false;
}
function updataUserInfo(_data){
    $(".userName").text(_data.frealName);
    $(".fmobile").text(_data.fmobile);
}
function loadUserInfo(){
    _callWe("1001006107","/WeChart/WxGetUserByToken",{},res => {
        if(res.msgBody.sta == "ok"){
            updataUserInfo(res.msgBody)
        }else{
            $.toast(res.msgBody.staInfo,"error")
        }
    },true);
}
//根据跳转到的页面判断用户角色
function judgeUserType(){
    let url = window.location.href;
    //修改密码按钮
    $("#btnList").append(`
        <a href="javascript:;" class="weui-grid js_grid changePwd" >
            <div class="weui-grid__icon">
                <i class="iconfont icon-mima1"></i>
            </div>
            <p class="weui-grid__label">
                修改密码
            </p>
        </a>
    `);
    if(url.indexOf("hzGrzxIndexNew") > -1){
        //货主
        window.localStorage.setItem('userType',1);
        return 1;
    }else if(url.indexOf("czGrzxIndexNew") > -1){
		// console.log('车主')
        //车主
        // 判断车主是否是驾驶员
        let driverData = [
            {"fclassNo":"99","fmenuName":"驾驶员","fmenuNo":"100","fmenuUrl":"wccyrLoadListSearch.html","ftype":1,"icon":"icon-jiashiyuan",}
        ];
		// console.log(driverData)
        _callWe_noUrl('1001006068','/WeChart/CzIsDriver',{},_data=>{
			// console.log(_data)
            if(_data.msgBody && !_data.msgBody.sta){
                if(_data.msgBody['isDriver']*1 == 0){
                    driverData[0]['fmenuUrl'] = 'jsyAuthentic.html';
                    driverData[0]['fmenuName'] = '成为驾驶员';
                }
                $("#btnList").append(joinIconHtml(driverData,2));
            }
        });
        window.localStorage.setItem('userType',2);
        return 2;
    }else if(url.indexOf("jsyGrzxIndexNew") > -1){
        //驾驶员
        window.localStorage.setItem('userType',3);
        return 3;
    }else if(url.indexOf("xcddGrzxIndexNew") > -1){
        //现场调度
        window.localStorage.setItem('userType',4);
        return 4;
    }
    return null;
}
function joinIconHtml(data,type){
    let _html = '',
        tmpVar = $.request.queryString["tmpVar"] || 0;
    $.each(data,(i,v) => {
        //默认带有弹出框
        let _className = 'open-popup',
            _href = "javascript:;",
            _name = v['title'] ? v['title']['fmenuName'] : v['fmenuName'],
            _icon = v['title'] ? v['title']['icon'] : v['icon'],
            _fclassNo = v['title'] ? v['title']['fclassNo'] : v['fclassNo'];
        if((v.data && v.data.length == 0) || type==2){
            //如果传的数据中 data字段length大于0  或者type等于2
            _href = _path + (v['title'] ? v['title']['fmenuUrl'] : v['fmenuUrl']) +"?tmpVar="+tmpVar;
            _className = '';
        }
        _html += `
                <a href="${_href}" class="weui-grid js_grid ${_className}" fclassNo="${_fclassNo}">
                    <div class="weui-grid__icon">
                        <i class="iconfont ${_icon}"></i>
                    </div>
                    <p class="weui-grid__label">
                        ${_name}
                    </p>
                </a>
            `;
    });
    return _html;
}
//拼接页面html  后期改为ajax时直接调用该方法就行
class setBtnList{
    constructor(data){
        this.DOM = $("#btnList");
        this.initData = data;
        this.userData = '';
        this.init();
    }
    init(){
        //拼接数据
        this.formatUserData();
        //绑定事件
        this.bindEvent();
    }
    formatUserData(){
        let _data = {};
        //拼装数据
        $.each(this.initData,(i,v)=>{
            if(!_data['classNo_'+v['fclassNo']]){
                _data['classNo_'+v['fclassNo']] = {};
                _data['classNo_'+v['fclassNo']]['data'] = [];
            }
            if((v['fid']+"").length < 4){
                _data['classNo_'+v['fclassNo']]['title'] = v;
            }else{
                _data['classNo_'+v['fclassNo']]['data'].push(v);
            }
        })
        this.userData = _data;
        this.joinHtml(_data);
    }
    joinHtml(Obj){
        let _html = '';
        //拼装html
        _html += joinIconHtml(Obj);
        this.DOM.append(_html);
    }
    bindEvent(){
        let that = this;
        $(".open-popup").click(function(){
            $("#half .weui-grids").html(joinIconHtml(that.userData['classNo_'+$(this).attr("fclassNo")]['data'],2));
            $("#half").popup();
        })
    }
}
$('#hzMsglist').on('click',function(){
	window.location.href = `${_path}hzMsgList.html`;
})