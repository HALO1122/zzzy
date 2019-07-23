var _file = {};
$(function(){
    var truckNo = getUrlParams("truckNo"),
        imgList;
    if(truckNo){
        //修改车辆
        // $(".btnAdd").hide().next(".btnExit").css("display","flex").removeClass("hide");
        $(".isUse").removeClass("hide");
        $("#discern").hide();
        imgList = new getImgData({'imgDelete':false})
        let _v;
        _callWe_noUrl('1001002113','/Basic/TruckSearchByNo',{"ftruckNo":truckNo},(res)=>{
            searchInfo(res,()=>{
                 _v = res.msgBody;
                 //是否可用name
                let isAbledName = "可用";
                if(_v['fisAbled']+'' != "1") isAbledName = "停用";
                $(".weui-cells_form").formSerialize($.extend(_v,{'isAbledName':isAbledName}));
                if(_v['fclxczzpUrl']){
                    imgList.setImg('fclxczzpUrl',{'base64':_v['fclxczzpUrl']});
                }
                if(_v['fclyyzzpUrl']){
                    imgList.setImg('fclyyzzpUrl',{'base64':_v['fclyyzzpUrl']});
                }
            });
        },false)
        $(".d_add").hide();
        $(".weuiSelect").off("click");
        $(".weui-cell__bd input").attr("readonly",true);
        //修改暂时不启用
        // $(".d_add").click(()=>{
        //     let sendObj = $.extend(_v,$(".weui-cells_form").formSerialize());
        //     let sendObj1 = $.extend({
        //         'fid': _v['fid'],
        //         'ftruckNo': _v['ftruckNo'],
        //     },$(".weui-cells_form").formSerialize());
        //     _callWe('1001002109','/Basic/TruckChange',sendObj,(res) => {
        //         console.log(res)
        //     })
        // })
    }else{
        //添加车辆
        imgList = new getImgData();
        $(".d_add").click(()=>{
            let sendObj = $(".weui-cells_form").formSerialize(),isOk = true;
            $.each(sendObj,(i,v) => {
                if(!v){
                    $.toptip($(`input[name = ${i}]`).attr('placeholder'), 'warning');
                    isOk = false;
                    return false;
                }
            })
            if(isOk){
                $.confirm("信息核对无误，确认提交?", "核对信息", function() {
                    upLoadImg(imgList.getImg(),(imgData)=> {
                        $.extend(sendObj, imgData);
                        _callWe('1001002101', '/Basic/TruckInfoAdd', sendObj, (res) => {
                            disposeInfo(res, () => {
                                $.toast(res.msgBody.staInfo ? res.msgBody.staInfo : "查询成功！", function () {
                                    window.location.href = _path + "carList.html"
                                })
                            });
                        })
                    })
                });
            }
        })
    }
    $("#discern").click(() => {
        upLoadXCZ(imgList,'fclxczzpUrl');
    })
    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"保存",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                let sendObj = $(".weui-cells_form").formSerialize(),isOk = true;
                $.each(sendObj,(i,v) => {
                    if(!v){
                        $.toptip($(`input[name = ${i}]`).attr('placeholder'), 'warning');
                        isOk = false;
                        return false;
                    }
                })
                if(isOk){
                    $.confirm("信息核对无误，确认提交?", "核对信息", function() {
                        upLoadImg(imgList.getImg(),(imgData)=> {
                            $.extend(sendObj, imgData);
                            _callWe('1001002101', '/Basic/TruckInfoAdd', sendObj, (res) => {
                                disposeInfo(res, () => {
                                    $.toast(res.msgBody.staInfo ? res.msgBody.staInfo : "查询成功！", function () {
                                        window.location.href = _path + "carList.html"
                                    })
                                });
                            })
                        })
                    });
                }
            }}
        ]
    });
})
//车长
$("#ftruckLong").select({
    title: "选择车长",
    items: [{ title: "零担", value: "零担" }, { title: "4.2", value: "4.2" }, { title: "6.8", value: "6.8" }, { title: "9.6", value: "9.6" }, { title: "13", value: "13" }, { title: "16", value: "16" }, { title: "17.5", value: "17.5" }]
});
//是否可用
$("#fisAbled").select({
    title: "是否可用",
    items: [{ title: "可用", value: "1" },{ title: "停用", value: "2" }]
});
var sendObj = {
    "fcompanyId":"1",
    "ftruckTypeCode":"",
    "ftruckTypeName":"",
    "pageSetBody":{"pageNo":0,"pageSize":100}
}
_callWe('1001002124','/Basic/TruckTypeSearch',sendObj,(res) => {
    if(res.msgBody && res.msgBody.pageOutBody.pageObjBody.length>0){
        let data = res.msgBody.pageOutBody.pageObjBody,arr=[];
        $.each(data,(i,v)=>{
            arr.push({ title: v.ftruckTypeName, value: v.ftruckTypeNo });
        })
        $("#ftruckTypeNo").select({
            title: "选择车型",
            items: arr
        });
    }
},false)
function upLoadXCZ(data,name,fun){
    if(data.getImg()[name]){
        $.showLoading('正在识别！');
        _callWe("1001000335",'/WeChartBasic/GetDataByClxcz',{'imgBase64':data.getImg()[name]['base64']},(res) => {
            $.hideLoading('识别成功');
            if(res.msgBody){
                $("#fplateNo").val(res.msgBody.fplateNo);
                $("#fframeNo").val(res.msgBody.fframeNo);
                // $("#ftruckTypeNo").val(res.msgBody.ftruckTypeNo);
                if(fun) fun();
            }
        })
    }else{
        $.toptip('请上传'+$(`li[imgNum = ${name}]`).find('p').text(), 'warning');
    }
}