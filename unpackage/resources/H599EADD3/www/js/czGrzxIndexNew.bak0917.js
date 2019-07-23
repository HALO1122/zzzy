$(()=>{
    _callWe("1001006107","/WeChart/WxGetUserByToken",{},res => {
        if(res.msgBody.sta == "ok"){
            initPage(res.msgBody)
        }else{
            $.toast(res.msgBody.staInfo,"error")
        }
    });
    $('.d_back').click(()=>{
        window.location.href = _path + "DispatchOrderSearchByCz.html";
    })
})
function initPage(data){
    var userDataList = [],
        _type = $.request['queryString']['user'];
    if(_type){
        userDataList.push(_type);
        if(_type == '2'){
            //角色列表
            _callWe_noUrl('1001006068','/WeChart/CzIsDriver',{},_data=>{
                if(_data.msgBody && !_data.msgBody.sta){
                    if(_data.msgBody['isDriver'] != "0"){
                        userDataList.push('3')
                    }else{
                        $("#becomeDriver").removeClass('hide');
                    }
                    bindEvent(userDataList);
                }
            });
        }else{
            bindEvent(userDataList);
        }
    }else{
        bindEvent(userDataList);
    }
    //填充用户数据
    $("#userName").val(data.frealName);
    $("#telNumber").val(data.fmobile);
    $('#becomeDriver').click(()=>{
        window.location.href = _path + "jsyAuthentic.html"
    })
}
function bindEvent(data){
    //绑定后续处理事件
    $(".roleList .weui-cells").html(createUserList(data));
    $("a.weui-cell_access").click(function(){
        if($(this).hasClass('toCz')){
            window.location.href = _path + "DispatchOrderSearchByCz.html";
        }else if($(this).hasClass('toDriver')){
            window.location.href = _path + "wccyrLoadListSearch.html";
        }else if($(this).hasClass('toCar')){
            window.location.href = _path + "carList.html";
        }else if($(this).hasClass('toBankCard')){
            window.location.href = _path + "bankCardList.html";
        }else if($(this).hasClass('changePwd')){
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
                    { text: "取消", className: "default", onClick: function(){ console.log(3)} },
                ]
            });
        }
    })
}
function createUserList(data){
    //根据data数组中的值来生成跳转html
    //[1,2,3] 1货主 2车主 3驾驶员 4现场调度
    let userList = {
            'user1' : {
                'class' : 'toHz',
                'icon' : 'icon-huo',
                'name' : '货主',
            },
            'user2' : {
                'class' : 'toCz',
                'icon' : 'icon-chezhu',
                'name' : '车主',
            },
            'user3' : {
                'class' : 'toDriver',
                'icon' : 'icon-jiashiyuan',
                'name' : '驾驶员',
            },
            'user4' : {
                'class' : 'toDD',
                'icon' : 'icon-chezhu',
                'name' : '调度',
            },
        },
        _html = `<div class="text-center">未获取到用户角色列表</div>`;
    if(data.length>0){
        _html = '';
        $.each(data,(i,v)=>{
            _html += `
            <a class="weui-cell weui-cell_access ${userList['user'+v]['class']}" href="javascript:;">
                <div class="weui-cell__hd">
                    <i class="iconfont ${userList['user'+v]['icon']}"></i>
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <p class="text-right">${userList['user'+v]['name']}</p>
                </div>
                <span class="weui-cell__ft"></span>
            </a>
        `;
        })
    }
    return _html;
}