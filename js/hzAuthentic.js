$(function(){
    new getImgData();
    $(".submit").click(function(){
        if(requiredData()){
            window.location.href = `${_path}authenticResult.html`;
        }
    })
})