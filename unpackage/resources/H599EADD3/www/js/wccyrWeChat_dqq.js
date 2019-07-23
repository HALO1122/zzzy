"use strict"
/*
* 设置微信端上传图片
* option 配置参数
* imgDelete  照片是否可以删除
*
* */
class getImgData{
    constructor(option){
        this.defaultOption = {
            imgDelete : true
        }
        this.imgData = {};
        this.option = $.extend({},this.defaultOption,option)
        this.init();
    }
    init(){
        let that = this;
        //拼接所需DOM
        that.joinDom();
        //绑定选择
        that.bingChange();
        //绑定显示图片
        that.viewImg();
        //绑定删除图片
        if(that.option.imgDelete){
            that.deleteImg();
        }else{
            $(".weui-gallery__del").remove();
        }
        //点击span时缩小
        $("#modal span").click(()=>{
            $("#modal").hide();
        })
    }
    joinDom(){
        if($("#modal").length == 0 && $(".weui-gallery__img").length == 0){
            $("body").append(`
                 <div class="weui-gallery" id="modal">
                    <!--照片查看-->
                    <span class="weui-gallery__img" ></span>
                    <input type="hidden">
                    <div class="weui-gallery__opr">
                        <a href="javascript:" class="weui-gallery__del">
                            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                        </a>
                    </div>
                </div>
            `);
        }
    }
    bingChange(){
        let that = this;
        $("input[type=file]").change(function(){
            let reader = new FileReader();
            reader.onload = evt => {
                //如果文件大于200K压缩图片
                console.log("压缩前"+that.showSize(evt.target.result)+"kb")
                if(this.files[0].size > 200*1024){
                    that.dealImage(evt.target.result,{w:"500",h:"500",quality:0.3},res => {
                        console.log("压缩后"+that.showSize(res)+"kb，比例：0.1")
                        that.setImg($(this).parents("li").attr("imgNum"),{
                            "base64":res,
                            "file":this.files[0]
                        });
                    })
                }else{
                    that.setImg($(this).parents("li").attr("imgNum"),{
                        "base64":evt.target.result,
                        "file":this.files[0]
                    });
                }
            }
            reader.readAsDataURL(this.files[0]);
        })
    }
    viewImg(){
        $("div.add_img").click(function(){
            $("#modal").show().find("span").css("backgroundImage",$(this).css("backgroundImage")).attr("imgNum",$(this).parents("li").attr("imgNum"));
        })
    }
    deleteImg(){
        let that = this;
        $(".weui-gallery__del").click(()=>{
            $.confirm("您确定要删除该张照片吗", "确认删除?", function() {
                that.setImg($("#modal span").attr("imgNum"))
                $("#modal").hide();
                $.toast("图片已经删除!");
            }, function() {
                //取消操作
            });
        })
    }
    setImg(imgNum,data){
        // imgNum 每个li的imgNum标识  data 图片路径
        if(data && data['base64']){
            this.imgData[imgNum] = {
                'base64' : data.base64?data.base64:"",
                'file' : data.file?data.file:""
            };
            $("li[imgNum = "+ imgNum +"]").find(".weui-uploader__input-box").hide().next(".add_img").removeClass("hide").css("backgroundImage",`url(${data['base64']})`);
        }else if(imgNum in this.imgData){
            delete this.imgData[imgNum]
            $("li[imgNum = "+ imgNum +"]").find(".weui-uploader__input-box").show().next(".add_img").css("backgroundImage","").addClass("hide");
        }
    }
    getImg(){
        return this.imgData
    }
    dealImage(path, obj, callback){
        //压缩img  path 图片路径 obj{w:压缩后图片宽,h:压缩后图片高,quality:图片质量}
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.5;  // 默认图片质量为0.5
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality );
            // 回调函数返回base64的值
            callback(base64);
        }
    }
    showSize(base64url) {
        //获取base64图片大小，返回KB数字
        var str = base64url.replace('data:image/png;base64,', '');
        var equalIndex = str.indexOf('=');
        if(str.indexOf('=')>0) {
            str=str.substring(0, equalIndex);
        }
        var strLength=str.length;
        var fileLength=((strLength-(strLength/8)*2)/1024).toFixed(1);
        return fileLength;
    }
}
//调用后台接口识别图片数据
function recognizeImg(Dom,sendObj){
    Dom.click(()=>{

    })
}