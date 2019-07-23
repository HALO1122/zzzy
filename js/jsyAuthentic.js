$(function(){
    let imgData = new getImgData(),
        imgKey = {
            'fidCardFile1':"身份证文件正面",
            'fidCardFile2':"身份证文件反面",
            'fdljyxkzFile':"道路经营许可证文件",
            'fbusinessParentFile':"营业执照文件",
            'fdrivingFile':"驾驶证文件",
            'fcyzgzFile':"从业资格证文件",
        };
    $("#fdrivingType").select({
        title: "选择准驾车型",
        items: ['A1',"A2","A3","B1","B2","C1","C2","C3","C4"]
    });

    $(".submit").click(function(){
        let sendObj = {},imgList = imgData.getImg();
        $.each(imgKey,(i,v) => {
            sendObj[i] = null;
        });
        //拼接图片信息
        $("li[imgNum]").each((i,v) => {
            sendObj[$(v).attr('imgNum')] = imgList[$(v).attr('imgNum')] ? imgList[$(v).attr('imgNum')]['base64'] : null;
        });
        if(!sendObj['fdrivingFile']){
            $.toptip('请上传驾驶证！','warning');
            return ;
        }
        if(sendObj['fcyzgzFile'] && !$("#fcyzgzCode").val()){
            $.toptip('上传从业资格证，请输入从业资格证号！','warning');
            return ;
        }
        sendObj['fdrivingCode'] = $("#fdrivingCode").val();
        sendObj['fdrivingType'] = driverCode($("#fdrivingType").val());
        sendObj['fcyzgzCode'] = $("#fcyzgzCode").val();
        _callWe_noUrl('1001006067','/WeChart/CzRegisterDriver',sendObj,res=>{
            if(res.msgBody.sta == 'ok'){
                $.toast(res.msgBody.staInfo,()=>{
					window.location.href = `${_path}jsyGrzxIndexNew.html`;
                    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8982157bedbc8324&redirect_uri=http://zzzy.56ps.cn/WeChart/MenuPersonalCenter/wx8982157bedbc8324&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                });
            }else{
                $.toast(res.msgBody.staInfo,'cancel');
            }
        })
    })
})
function driverCode(data){
    switch (data) {
        case "A1":
            return 1;
            break;
        case "A2":
            return 2;
            break;
        case "A3":
            return 3;
            break;
        case "B1":
            return 4;
            break;
        case "B2":
            return 5;
            break;
        case "C1":
            return 6;
            break;
        case "C2":
            return 7;
            break;
        case "C3":
            return 8;
            break;
        case "C4":
            return 9;
            break;
        default:
            return "";
    }
}