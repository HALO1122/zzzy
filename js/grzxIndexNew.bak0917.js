$(()=>{
    let Obj = getlocalStorage('userAuthen')
        ,userData = {
        },
        imgList = {
            'idCardFile1':"身份证文件正面",
            'idCardFile2':"身份证文件反面",
            'dljyxkzFile':"道路经营许可证文件",
            'businessParentFile':"营业执照文件",
            'drivingFile':"驾驶证文件",
            'cyzgzFile':"从业资格证文件",
        },
        imgData = {},
        _html = "",num=1;
    //判断缓存中是否有用户数据
    if(!Obj.type){
        _callWe("1001006104","/WeChart/AuthenticationQuery",{},res => {
            if(res.msgBody && res.msgBody.sta!= "err"){
                userData = res.msgBody;
                pageInit()
            }else{
                $.toast('网络异常！','cancel');
            }
        })
    }else{
        userData = Obj['dataInfo'];
        pageInit();
    }
    function pageInit(){
        //拼接图片数据
        $.each(imgList,(i,v)=>{
            if(userData[i]){
                imgData[i] = {
                    'base64' : "data:image/jpeg;base64,"+userData[i],
                    'file' : ""
                };
                if(num%2 != 0){
                    _html += `<ul>`;
                }
                _html += `
                <li imgNum="${i}">
                    <div class="weui-uploader__input-box">
                        <input class="weui-uploader__input" placeholder="请上传${v}" type="file" accept="image/*">
                    </div>
                    <div class="add_img weui-uploader__file hide"></div>
                    <p class="">${v}</p>
                </li>
            `;
                if(num%2 == 0){
                    _html += `</ul>`;
                }
                num++;
            }
        });

        if(num != 1 && num%2 != 0) _html+= "</ul>";
        _html = `
         <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">相关证件：</label></div>
            <div class="weui-cell__bd">${_html.length>0 ? _html : `<div class="text-right">未上传证件</div>`}
            </div>
        </div>
    `;
        $(".imgList").html(_html);
        var imgObj = new getImgData({"imgDelete":false});
        //填充图片
        $("li[imgNum]").each((i,v)=>{
            imgObj.setImg($(v).attr('imgNum'),imgData[$(v).attr('imgNum')]);
        });

        //填充用户数据
        $("#userName").val(userData.fuserName);
        $("#telNumber").val(userData.fmobile);
        $("#ftype").val(userData.ftype == 1 ? "货主" : (userData.ftype == 2 ? "车主" : "驾驶员"));

        switch (userData.state+""){
            case "1":
            case "3":
                $(".stateNmae").addClass('success').text("认证中");
            case "5":
                $(".stateNmae").addClass('success').text("认证成功");
                break;
            case "2":
            case "4":
            case "6":
                $(".stateNmae").addClass('error').text("认证失败");
                break;
            case "10":
                $(".stateNmae").addClass('success').text("已提交人工认证");
                break;
            case "0":
                $(".stateNmae").addClass('success').text("未认证");
                break;
        }
        //人工认证
        $(".peopleAuthen a").click(()=>{
            _callWe('1001006105','/WeChart/ApplyCustomerService',{'fmobile':userData.fmobile},res=>{
                if(res.msgBody && res.msgBody.sta == "ok"){
                    window.localStorage.setItem('peopleAuthen',true);
                    $.toast('申请已提交！');
                }else{
                    $.toast(res.msgBody.staInfo,'cancel');
                }
            })
        })
    }
})
