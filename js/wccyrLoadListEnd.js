$(function () {
    var params = new Object();
    let _img = new getImgData();
    $("#tel").attr("href",config.tel);
    //获取code
    var code = getUrlParams("code");
    // var fdispatchOrderNo =getUrlParams("fdispatchOrderNo");
    // var floadListNo = getUrlParams("floadListNo");
	
	var fdispatchOrderNoArr = JSON.parse(sessionStorage.getItem('LoadListDispatchorder'));
	for(var ele in fdispatchOrderNoArr){
		femptydisorder = fdispatchOrderNoArr[ele];
	}
	var fdispatchOrderNo = femptydisorder;
	var floadListNo = femptydisorder;
	
    var checkUserAu = function () {
        _callWe_noUrl('1001006040','/Wechat/WccyrLoadList/WccyrLoadListSearchByFdipatcherOrderNo',{"fdispatchOrderNo":fdispatchOrderNo},data=>{
            data = data.msgBody;
            if(data && !data.staInfoCode){
                initPageInfo(data);
            }else{
                layer.alert("异常操作",function(){
                    window.location.href = getConfig(_path + "wccyrLoadListSearch.html");
                })
            }
        })
    };
    checkUserAu();
    var loadList = $("#loadList").html();
    $("#loadList").empty();
    $("#loadList").append("未查询到数据");
    function initPageInfo(data) {
        if (data) {
            $("#orderNo").text("装车单编号："+floadListNo);
            var backOrder = "";
            //遍历货物,计算总重
            var fgoodsWeight = 0;
            if(data.dispatchOrder){
                for (var i = 0; i < data.dispatchOrder.goods.length; i++) {
                    fgoodsWeight += data.dispatchOrder.goods[i].fgoodsWeight;
                }
            }
            var fDate=null;
            if(data.floadDate==null){
                fDate="未装车"
            }else{
                fDate =filtrationNull(data.floadDate).replace(/-/g,"/").substring(0,19);
            }
            //超长超宽
            var maxLengthWidth = '';
            if(data.dispatchOrder && (data.dispatchOrder.fgoodsMaxLength != null || data.dispatchOrder.fgoodsMaxWidth != null || data.dispatchOrder.fgoodsMaxHeight)){
                if(data.dispatchOrder.fgoodsMaxLength == null){
                    maxLengthWidth += '无'
                }else {
                    maxLengthWidth += data.dispatchOrder.fgoodsMaxLength;
                }
                if(data.dispatchOrder.fgoodsMaxWidth == null){
                    maxLengthWidth += ',无,'
                }else {
                    maxLengthWidth += ','+ data.dispatchOrder.fgoodsMaxWidth + ',';
                }
                if(data.dispatchOrder.fgoodsMaxHeight == null){
                    maxLengthWidth += '无'
                }else {
                    maxLengthWidth += data.dispatchOrder.fgoodsMaxHeight;
                }
            }else {
                maxLengthWidth ='无';
            }
            var time =filtrationNull(data.dispatchOrder.fplanLoadListTime).replace(/-/g,"/").substring(0,10);
            backOrder = loadList.format( filtrationNull(data.dispatchOrder.fsenderAddress), filtrationNull(data.dispatchOrder.freceiverAddress),fDate,
                filtrationNull(data.dispatchOrder.floadListAdress),filtrationNull(data.dispatchOrder.funloadListAdress),
                filtrationNull(fgoodsWeight+'t'), filtrationNull(maxLengthWidth), filtrationNull(data.fplateNo),filtrationNull(floadListNo)
            );
            $("#loadList").empty();
            $("#loadList").append(backOrder);
        }
        $("#loadList").show();

    }
    //点击完成装车
    // $("#end").click(function(){
    //     var imgArray= $("#img img");
    //     var imgSrc = new Array();
    //     $.each(imgArray, function(index, item){
    //             imgSrc.push($(item).attr("src"));
    //     })
    //     /*for(var i =0;i < imgSrc.length;i++){
    //         if(!imgSrc[i]){
    //             $('#Dialog').css({"opacity":"1","display":"block"});
    //             $('#Dialog').fadeIn(200);
    //             return;
    //         }
    //     }*/
    //     var fdispatchOrderNo =getUrlParams("fdispatchOrderNo");
    //     var floadListNo = getUrlParams("floadListNo");
    //     upLoadImg(_img.getImg(),res=>{
    //         _callWe_noUrl('1001006036','/Wechat/WccyrLoadList/WccyrLoadListEnd',{"floadListNo":floadListNo,"fdispatchOrderNo":fdispatchOrderNo
    //             ,"fqshdzpUrl":res[''],"fzccszpUrl":res['fzccszpUrl'] ? res['fzccszpUrl'] : '',"fzccwzpUrl":res['fzccwzpUrl'] ? res['fzccwzpUrl'] : ''},res=>{
    //             if(res.msgBody.staInfoCode == '0'){
    //                 $.toast("装车完成！",function(){
    //                     jumpFunction(_path + "wccyrLoadListSearch.html",params);
    //                 })
    //             }else{
    //                 $.toast(res.msgBody.staInfo,'cancel');
    //             }
    //         })
    //     });
    // })
    //点击确定消失
    $("#dis").on('click',function(){
        $('#Dialog').css({"opacity":"1","display":"none"});
    })
    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"装车完成",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                var imgArray= $("#img img");
                var imgSrc = new Array();
                $.each(imgArray, function(index, item){
                    imgSrc.push($(item).attr("src"));
                })
                // var fdispatchOrderNo =getUrlParams("fdispatchOrderNo");
                // var floadListNo = getUrlParams("floadListNo");
				for(var ele in fdispatchOrderNoArr){
					femptydisorder = fdispatchOrderNoArr[ele];
				}
				var fdispatchOrderNo = femptydisorder;
				var floadListNo = femptydisorder;
				
                upLoadImg(_img.getImg(),res=>{
                    _callWe_noUrl('1001006036','/Wechat/WccyrLoadList/WccyrLoadListEnd',{"floadListNo":floadListNo,"fdispatchOrderNo":fdispatchOrderNo
                        ,"fqshdzpUrl":res[''],"fzccszpUrl":res['fzccszpUrl'] ? res['fzccszpUrl'] : '',"fzccwzpUrl":res['fzccwzpUrl'] ? res['fzccwzpUrl'] : ''},res=>{
                        if(res.msgBody.staInfoCode == '0'){
                            $.toast("装车完成！",function(){
                                jumpFunction(_path + "wccyrLoadListSearch.html",params);
                            })
                        }else{
                            $.toast(res.msgBody.staInfo,'cancel');
                        }
                    })
                });
            }}
        ]
    });
});