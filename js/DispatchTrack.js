var initPageInfo;
$(function () {
    $("#tel").attr("href",config.tel);
	
	var urlParams =  JSON.parse(sessionStorage.getItem('./dispatchTrack.html'));
    var ftempOrderNo = urlParams.ftempOrderNo;
    var temp = $("#content").html();
    $("#content").empty();
    var initPageInfo = function (data) {
        if (data.dataInfo) {
            $.each(data.dataInfo, function (index, node) {
                var backHtml = "";
                var time = filtrationNull(node.fcreatedTime).replace(/-/g, "/").substring(0, 19);
                if (index == 0) {
                    backHtml = temp.format("first", time,
                        filtrationNull(node.fcreatorName), filtrationNull(node.foperateTypeName));
                } else {
                    backHtml = temp.format(" ", time,
                        filtrationNull(node.fcreatorName), filtrationNull(node.foperateTypeName));
                }
                $("#content").append(backHtml)
            })
        } else {
            $("#content").append("未查询到数据")
        }
        $("#content").show();
    }
    $("#tempNo").text(ftempOrderNo);
    _callWe_noUrl("1001006016",'/WeChat/OrderTrack',{"ftempOrderNo": ftempOrderNo},data=>{
        if (data.msgBody.staInfoCode == "0") {
            initPageInfo(data.msgBody);
        } else {
            $.toast(data.msgBody.staInfo, 'cancel', function () {
                if (data.msgBody.redirectUrl) {
                    var reUrl = data.msgBody.redirectUrl;
                    if (data.msgBody.token) {
                        var params = {
                            "token": data.msgBody.token
                        }
                        var param = JSON.stringify(params);
                        reUrl = reUrl + "?param=" + param
                    }
                    window.location.href = getConfig(reUrl);
                }
            });
        }
    })
})