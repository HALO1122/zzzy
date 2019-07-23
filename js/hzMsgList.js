var _dataList;
var _lis = '', _htmlwd = '',_htmlyd = '';

$("#tab1 #tab1MsgList").empty();
$("#tab1 #tab1MsgList").append("<div class='weui-form-preview__bd' >"+"暂无推送消息！"+"</div>")
$(function () {
	_callWe("1001000205","/User/GetUserToDoList",{},res => {
	    if(res.msgBody != "" && res.msgBody != null){
	        _dataList = res.msgBody.pageOutBody.pageObjBody;
			$.each(_dataList,function(i,v){	
				var _fmessageStatus=v.fmessageStatus;
				if(_fmessageStatus==0){
					_htmlwd += `
					    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg jumpList" id="${v['fuserInternalMessageNo']}">
					        <div class="weui-media-box__hd">
					            <img class="weui-media-box__thumb" id="msgIconWd" src="../../img/wd.png">
					        </div>
					        <div class="weui-media-box__bd fuserMsgStatus" >
					            <h4 class="weui-media-box__title">${v['fmessageInfo']}</h4>
					            <p class="weui-media-box__desc">${v['flatestUpdatedTime']}</p>
					        </div>
					    </a>
					`;
				}else{
					_htmlyd += `
					    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg jumpList" id="${v['fuserInternalMessageNo']}">
					        <div class="weui-media-box__hd">
					            <img class="weui-media-box__thumb" id="msgIconYd" src="../../img/yd.png">
					        </div>
					        <div class="weui-media-box__bd fuserMsgStatus" >
					            <h4 class="weui-media-box__title">${v['fmessageInfo']}</h4>
					            <p class="weui-media-box__desc">${v['flatestUpdatedTime']}</p>
					        </div>
					    </a>
					`;
				}

			})
			$("#tab1 #tab1MsgList").html(_htmlwd);
			$("#tab2 #tab2MsgList").html(_htmlyd);		
	    }else{
	        $.toast("暂无数据！","error")
	    }
	},true);
})

setTimeout(function(){
	$('.jumpList').on('click',function(){
		let fuserMsgNo = $(this).attr("id");
		_callWe("1001000205","/User/GetUserToDoList",{ 'fuserInternalMessageNo':fuserMsgNo},res => {
            window.location.reload();			
		},true);
	})
},1000)

