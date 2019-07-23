/**
 * Created by Administrator on 2017/8/17.
 */
$(function(){
    //获取url里的参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //获取code
    var code = getUrlParams("code");
    var ftempOrderNo= getUrlParams("ftempOrderNo");
    var token= getUrlParams("token");
    var temp = $("#chaxunbyNo").html();
    $("#chaxunbyNo").empty();
    // $.ajax({
    //     url: "/Wechat/TempOrder/TempOrderSearchByNo",
    //     type: "post",
    //     dataType: "json",
    //     data: {"code": code, "type": 1, "token": token, "ftempOrderNo": ftempOrderNo},
    //     success: function (data) {
    //         initPageInfo(data);
    //     }
    // });
    _callWe_noUrl('1001006011','/Wechat/TempOrder/TempOrderSearchByNo',{"ftempOrderNo": ftempOrderNo},data=>{
        searchInfo(data,()=>{
            initPageInfo(data.msgBody);
        })
    })
    var initPageInfo = function (data) {
        if (data) {
            var backHtml = "";
            var fgoodsWeight = 0;
            for (var i = 0; i < data.goods.length; i++) {
                fgoodsWeight += data.goods[i].fgoodsWeight;
            }
            //超长超宽
            var maxLengthWidth = '';
            if(data.fgoodsMaxLength != null || data.fgoodsMaxWidth != null || data.fgoodsMaxHeight){
                if(data.fgoodsMaxLength == null){
                    maxLengthWidth += '无'
                }else {
                    maxLengthWidth += data.fgoodsMaxLength;
                }
                if(data.fgoodsMaxWidth == null){
                    maxLengthWidth += ',无,'
                }else {
                    maxLengthWidth += ','+ data.fgoodsMaxWidth + ',';
                }
                if(data.fgoodsMaxHeight == null){
                    maxLengthWidth += '无'
                }else {
                    maxLengthWidth += data.fgoodsMaxHeight;
                }
            }else {
                maxLengthWidth ='无';
            }
            if (data != null) {
                backHtml = temp.format(filtrationNull(data.ftempOrderNo),
                    filtrationNull(data.fremark), filtrationNull(data.fsenderAddress),
                    filtrationNull(data.freceiverAddress), filtrationNull(data.fplanLoadListTime),
                    filtrationNull(fgoodsWeight),filtrationNull(maxLengthWidth),filtrationNull(data.orderFee.fgoodsFee))
            } else {
                alert("您查询的数据不存在");
            }
            $("#chaxunbyNo").append(backHtml)
        } else {
            $("#chaxunbyNo").append("未查询到数据")
        }
        $("#chaxunbyNo").show();
    }

    $(".weui-form-preview__btn_primary").on('click', function(){
        var r=confirm("您确定要取消运单么");
        if (r==true)
        {
            // $.ajax({
            //     url: "/Wechat/TempOrder/TempOrderChange",
            //     type: "post",
            //     dataType: "json",
            //     data: {"code":code, "type": 1, "token": token,"ftempOrderNo":ftempOrderNo,"fremark":"已作废"},
            //     success: function (data) {
            //         if(data!=null){
            //             var params = {
            //                 "token":token
            //             };
            //             var param = JSON.stringify(params);
            //             window.location.href = getConfig(_path + "TempOrderSearchStatus.html?param=" + param);
            //         }else{
            //             alert("data为空");
            //         }
            //     }
            // });
            _callWe_noUrl('1001007005','/Wechat/TempOrder/TempOrderChange',{"ftempOrderNo":ftempOrderNo,"fremark":"已作废"},data=>{
                disposeInfo(data,()=>{
                    window.location.href = getConfig(_path + "TempOrderSearchStatus.html");
                })
            })
        }
        else{
            alert("取消修改！");
        }
    });
});