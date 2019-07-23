$(function() {
    let _img = new getImgData();
	let femptydisorder = '';
    $("#tel").attr("href",config.tel);
    var code = getUrlParams("code");
    // var fdispatchOrderNo = getUrlParams("fdispatchOrderNo");
	// var floadListNo = getUrlParams("floadListNo");
	
	var fdispatchOrderNoArr = JSON.parse(sessionStorage.getItem('LoadListDispatchorder'));
	for(var ele in fdispatchOrderNoArr){
		femptydisorder = fdispatchOrderNoArr[ele];
	}
	var fdispatchOrderNo = femptydisorder;
	var floadListNo = femptydisorder;

    _callWe_noUrl('1001006040','/Wechat/WccyrLoadList/WccyrLoadListSearchByFdipatcherOrderNo',{"fdispatchOrderNo":fdispatchOrderNo},data=>{
        data = data.msgBody
        if(data && !data.staInfoCode){
            initPageInfo(data);
        }else{
            $.toast("异常操作",'cancel',function(){
                window.location.href = getConfig(_path + "wccyrLoadListSearch.html");
            })
        }
    })
    var loadList = $("#loadList").html();
    var goods = $("#goods").html();0 
    $("#loadList").empty();
    $("#goods").empty();

    function initPageInfo(data) {
        if (data) {
            $("#orderNo").text("装车单编号："+floadListNo)
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
                if( data.dispatchOrder && (data.dispatchOrder.fgoodsMaxLength != null || data.dispatchOrder.fgoodsMaxWidth != null || data.dispatchOrder.fgoodsMaxHeight)){
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
                backOrder = loadList.format(filtrationNull(data.dispatchOrder.fsenderAddress), filtrationNull(data.dispatchOrder.freceiverAddress),time,
                    filtrationNull(data.dispatchOrder.floadListAdress),filtrationNull(data.dispatchOrder.funloadListAdress),
                    filtrationNull(fgoodsWeight+'t'), filtrationNull(maxLengthWidth), filtrationNull(data.fplateNo),filtrationNull(floadListNo)
                );
              var backGoods ="";
                if(data.dispatchOrder.goods){
                    for(var i=0;i<data.dispatchOrder.goods.length;i++){
                        backGoods += goods.format(filtrationNull(data.dispatchOrder.goods[i].fgoodsName),filtrationNull(data.dispatchOrder.goods[i].fgoodsNum),
                            filtrationNull(data.dispatchOrder.goods[i].fgoodsVolume),filtrationNull(data.dispatchOrder.goods[i].fgoodsWeight)+'t');
                    }
                }
                $("#loadList").append(backOrder);
                $("#goods").append(backGoods);
        } else {
            $("#loadList").append("未查询到数据");
            $("#goods").append("未查询到数据");
        }
        $("#loadList").show();
        $("#goods").show();
    }

    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"完成装车",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                var code = getUrlParams("code");
                // var fdispatchOrderNo = getUrlParams("fdispatchOrderNo");
                // var floadListNo = getUrlParams("floadListNo");
				for(var ele in fdispatchOrderNoArr){
					femptydisorder = fdispatchOrderNoArr[ele];
				}
				var fdispatchOrderNo = femptydisorder;
				var floadListNo = femptydisorder;
                var param = new Object();
                upLoadImg(_img.getImg(),res=>{
                    _callWe_noUrl('1001006035','/Wechat/WccyrLoadList/WccyrLoadListStart',{"floadListNo":floadListNo,"fdispatchOrderNo":fdispatchOrderNo},data => {
                        //确认无误装车 与 装车完成合并
                        _callWe_noUrl('1001006036',"/Wechat/WccyrLoadList/WccyrLoadListEnd",{"floadListNo":floadListNo,"fdispatchOrderNo":fdispatchOrderNo
                            ,"fqshdzpUrl":res['fzcctzpUrl'] ? res['fzcctzpUrl'] : '',"fzccszpUrl":res['fzccszpUrl'] ? res['fzccszpUrl'] : '',"fzccwzpUrl":res['fzccwzpUrl'] ? res['fzccwzpUrl'] : ''},_res=>{
                            jumpFunction(_path + "wccyrLoadListSearch.html",param)
                        })
					
                    })
                });
            }}
        ]
    });
});

