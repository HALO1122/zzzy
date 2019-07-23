let timer;
$(()=>{
    //默认查询
    initSearch();
    //搜索框输入
    $("#searchInput").on('input',function(){
        clearInterval(timer);
        timer = setTimeout(()=>{
            initSearch({'fplateNo':$("#searchInput").val()})
        },500);
    })
    //搜索框取消
    $("#searchCancel").click(()=>{
        $("#searchInput").val('').trigger('input');
    })
    //添加车辆
    $(".d_add").click(()=>{
        window.location.href = _path+"carInfo.html";
    })
    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"添加车辆",'url':'carInfo.html'}
        ]
    });
})
function initSearch(option={}){
    let sendObj = {
        "fplateNo":option['fplateNo'] || "",
        "ftruckMobile":option['ftruckMobile'] || "",
        "ftruckTypeNo":option['ftruckTypeNo'] || "",
        "fisAbled":option['fisAbled'] || "-1",
        "pageSetBody":{
            "pageNo":0,
            "pageSize":20
        }
    }
    _callWe_noUrl('1001006065','/Basic/TruckSearchByCz',sendObj,(res)=>{
        searchInfo(res,()=>{
            let _html = "";
            $.each(res.msgBody.pageOutBody.pageObjBody,(i,v)=>{
                _html += `
                    <a href="javascript:void(0);" truckNo="${v['ftruckNo']}" class="weui-media-box weui-media-box_appmsg carInfo">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" src="../../img/car.png">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">${v['fplateNo']}</h4>
                            <p class="weui-media-box__desc">车辆类型：${v['ftruckTypeName']}&nbsp;&nbsp;车辆长度：${v['ftruckLong']}&nbsp;&nbsp;荷载吨位：${v['floadWeight']}</p>
                        </div>
                    </a>
                `;
            })
            $(".carList .weui-panel__bd").html(_html);
            $(".carInfo").off("click").on("click",function(){
                window.location.href = _path+"carInfo.html?truckNo="+$(this).attr('truckNo');
            })
        },true)
    })
}