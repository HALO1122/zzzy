var user_msg,user_type,userPassword,quiteState;
var imei='',
	nowImei = '',
	fTelAsImei,
	fTrueTelAsImei;

// document.addEventListener('plusready',onReady,false);
// function onReady(){
// 	var readyImei = plus.device.imei;
// 	imei = readyImei;
// }
// setTimeout(function(){
// 	nowImei = imei;
// 	alert(nowImei)
// }, 1000 );
		
(function(){
	fTelAsImei  = JSON.parse(localStorage.getItem('fTelAsImei'));
	if(fTelAsImei != '' && fTelAsImei != undefined){
		fTrueTelAsImei = fTelAsImei;
	}
	// console.log(fTrueTelAsImei,'**********')
	user_msg = JSON.parse(localStorage.getItem('userMsg'));
	// 判断缓存中是否有注册过的信息
	if(user_msg == null){
		_callWe('1001006104','/WeChart/AuthenticationQuery',{'IMEI':fTrueTelAsImei},res=>{
			let Obj = {
				type:false
			}
			localStorage.setItem('userAuthen',JSON.stringify(Obj));
			if(res.msgBody && JSON.stringify(res.msgBody) != "{}" && res.msgBody.fid && res.msgBody.fid != ""){
				Obj['type'] = true;
				Obj['dataInfo'] = res.msgBody;
				window.localStorage.setItem('userAuthen',JSON.stringify(Obj));
				// window.location.href = `${__path}grzxIndexNew.html`;
			}else{
				window.localStorage.setItem('userAuthen',JSON.stringify(Obj));
			}
		},false)
	} else {
		login()
	}
}())
	
function flatReg(){
	window.location.href = `${__path}userAuthentic.html`;
}

function flatMsg(){
	alert('账号为注册时的用户名，初始密码为123456');	
	// alert(plus.device.imei)
}
	
function login(){
	userPassword = JSON.parse(localStorage.getItem('userPassword'));
	let sendObj = {
		"fusername":$("#fusername").val(),
		"fpassword":$("#fpassword").val(),
		"fdeadTime":'0',
		"IMEI":fTrueTelAsImei
	}
	let newSendMsg = {
		"fusername":$("#fusername").val(),
		"fpassword":$("#fpassword").val(),
		"fdeadTime":'0',
		"IMEI":fTrueTelAsImei
	}
	if(user_msg != null){
		if(userPassword != null && user_msg.fpassword != userPassword){
			sendObj = newSendMsg
		} else {
			sendObj = user_msg;
		}
	}
	user_type = JSON.parse(localStorage.getItem('user_type'));
	_callWe("1001000104","/Login/VerificationWithOutCheckCode",sendObj,function(res){
		let fuserType = res.msgBody.ftype;
		if(res.msgBody.sta != 'ok'){
			$.toast(res.msgBody.staInfo)
		} else {
			if(res.msgBody.IMEI != '' && res.msgBody.IMEI != null){
				localStorage.setItem('userMsg',JSON.stringify(sendObj));
				if(user_type == '1' || fuserType == '1'){
					location.href = `${__path}hzGrzxIndexNew.html`;
				} else if(user_type == '2'|| fuserType == '2'){
					location.href = `${__path}czGrzxIndexNew.html`;
				} else if(user_type == '3'|| fuserType == '3'){
					location.href = `${__path}jsyGrzxIndexNew.html`;
				}
				$.toast(res.msgBody.staInfo)		
			} else {
				$.toast('请进行注册绑定','cancel',function(){
					// location.href = `${__path}wccyrUserBind.html`;
				})
			}
		}
	});
}