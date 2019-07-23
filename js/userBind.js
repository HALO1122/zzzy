$(function(){
    var imgData = new getImgData();
    $(".submit").click(()=>{
        console.log(imgData.getImg())
        $.alert("绑定成功，您已获得货主角色！","绑定结果")
    })
    $(".discern").click(()=>{
        $.showLoading("正在识别");
        setTimeout(()=>{
            $.toptip('识别成功','success');
            $.hideLoading();
        },2000)
    })
});