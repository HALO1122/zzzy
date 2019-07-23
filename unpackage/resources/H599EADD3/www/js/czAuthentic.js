$(()=>{
    new getImgData();
    $("#isDriver").change(function(){
        if($(this).is(":checked")){
            //如果认证被选中
            $(".driverInfo").show();
        }else{
            //如果没有被选中
            $(".driverInfo").hide();
        }
    })
    $(".submit").click(function(){
        if(requiredData()){
            window.location.href = `${_path}authenticResult.html`;
        }
    })
})