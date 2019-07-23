$(function(){
    $("a.info").click(function(){
        let btnList = [{ text: "取消"}];
        if($(this).hasClass("error")){
            btnList = [
                { text: "人工认证", onClick: function(){ $.alert("已提交人工认证"); } },
                { text: "取消", className: "default"},
            ];
        }
        $.modal({
            title: "失败原因",
            text: "网络异常。",
            buttons: btnList
        });
    })
})