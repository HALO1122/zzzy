$(()=>{
    $("body").on("touchstart",function(e){
        var $dom = $(e.target);
        e.preventDefault();
        if($dom.parents("#searchBar").length>0 || $dom.attr("id")=="searchBar" || $dom.parents(".weui-picker-container").length>0){
            if($dom.attr("id") == "searchBtn"){
                console.log($("#searchBar").height())
            }else if($dom.attr("id") == "submitBtn"){
                console.log($("#searchBar").height())
            }
        }else{
            console.log($dom)
            if($("#searchBar>div").hasClass("weui-search-bar_focusing")){
                $("#searchBar>div").removeClass("weui-search-bar_focusing")
            }
        }
    })
    $(".queren").click(()=>{
        window.location.href = _path+"dispatchOrderAffirmFreightNo.html";
    })
    $("#orderStatus").select({
        title: "运单状态",
        items: [
            {
                title: "待提款",
                value: 1,
            },
            {
                title: "已提款",
                value: 2,
            },
            {
                title: "待支付",
                value: 3,
            },
        ],
        onChange: function(d) {
            console.log(this, d);
        },
        onClose: function (d) {
            console.log('close')
        }
    });
})