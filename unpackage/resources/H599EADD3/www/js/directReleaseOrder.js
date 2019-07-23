//查询函数节流
let timer=null;
$(()=>{
    //获取用户信息
    getUrlUserInfo();
    //初始化发货地查询
    $("#sendCity").cityPicker({
        title: "请选择收货地址"
    });
    $("#receiverCity").cityPicker({
        title: "请选择发货地址"
    });
    //查询货主
    _callWe('1001000314','/Basic/CustomerUserInfoSearch',{'fname':"","faddress":"","fmobile":"",'ftype':'-1','fisAbled':'-1','pageSetBody':{"pageNo":0,"pageSize":100}},(res) => {
        if(res.msgBody && res.msgBody.pageOutBody.pageObjBody.length>0){
            let data = res.msgBody.pageOutBody.pageObjBody,arr=[];
            $.each(data,(i,v)=>{
                arr.push({ title: v.frealName, value: v.fuserNo+"&"+v.fmobile });
            })
            $("#fsenderName").select({
                title: "选择货主",
                items: arr
            });
        }
    })
    //查询货物类型
    _callWe('1001002133','/Basic/GoodsTypeInfoSearch',{'fgoodsTypeName':"","fgoodsTypeCode":"",'pageSetBody':{"pageNo":0,"pageSize":100}},(res) => {
        if(res.msgBody && res.msgBody.pageOutBody.pageObjBody.length>0){
            let data = res.msgBody.pageOutBody.pageObjBody,arr=[];
            $.each(data,(i,v)=>{
                arr.push({ title: v.fgoodsTypeName, value: v.fgoodsTypeCode });
            })
            $("#fgoodsTypeCode").select({
                title: "选择货物类型",
                items: arr
            });
        }
    })
    $("#fcontractType").select({
        title: "合同类型",
        items: [
            {
                title: "长期合同",
                value: "1",
            },
            {
                title: "临时合同",
                value: "2",
            },
        ]
    });
    // $(".d_add").click(()=>{
    //     let isOk = true;
    //     $("input").each((i,v)=>{
    //         console.log($(v).val())
    //         if(!$(v).val()){
    //             isOk = false;
    //             return false;
    //         }
    //     })
    //     if(isOK){
    //         let sendObj = $(".weui-cells").formSerialize(),
    //             sendCode = $("#sendCity").attr('data-codes') ? $("#sendCity").attr('data-codes').split(",") : [],
    //             receiverCode = $("#receiverCity").attr('data-codes') ? $("#receiverCity").attr('data-codes').split(",") : [],
    //             senderUser = $("#fsenderName").attr('data-values');
    //         //发货地
    //         sendObj['fsenderProvinceCode'] = sendCode.length>0 ? sendCode[0] : "";
    //         sendObj['fsenderCityCode'] = sendCode.length>0 ? sendCode[1] : "";
    //         sendObj['fsenderCountyCode'] = sendCode.length>0 ? sendCode[2] : "";
    //         //收货地
    //         sendObj['freceiverProvinceCode'] = receiverCode.length>0 ? receiverCode[0] : "";
    //         sendObj['freceiverCityCode'] = receiverCode.length>0 ? receiverCode[1] : "";
    //         sendObj['freceiverCountyCode'] = receiverCode.length>0 ? receiverCode[2] : "";
    //         //货主信息
    //         sendObj['fsenderNo'] = senderUser ? senderUser.split("&")[0] : "";
    //         sendObj['fsenderTel'] = senderUser ? senderUser.split("&")[1] : "";
    //         sendObj['ftruckNo'] = $('#ftruckNo').data('key')?$('#ftruckNo').data('key'):"";
    //         sendObj['fstaffNo'] = $('#fstaffNo').data('key')?$('#fstaffNo').data('key'):"";
    //         //合同类型
    //         sendObj['fcontractType'] = $("#fcontractType").data('values');
    //         //货物信息
    //         sendObj['goods'] = [
    //             {
    //                 "fgoodsName":sendObj['fgoodsName'],
    //                 "fgoodsTypeCode":sendObj['fgoodsTypeCode'],
    //                 "fgoodsNum":sendObj['fgoodsNum'],
    //                 "fgoodsWeight":sendObj['fgoodsWeight'],
    //                 "fgoodsVolume":sendObj['fgoodsVolume']
    //             }
    //         ];
    //         //费用信息
    //         sendObj['orderFee'] = {
    //             "fcarriage":sendObj['fcarriage'],
    //             "fgoodsFee":sendObj['fgoodsFee']
    //         };
    //         delete sendObj['fgoodsName'];
    //         delete sendObj['fgoodsTypeCode'];
    //         delete sendObj['fgoodsNum'];
    //         delete sendObj['fgoodsWeight'];
    //         delete sendObj['fgoodsVolume'];
    //         delete sendObj['fcarriage'];
    //         delete sendObj['fgoodsFee'];
    //         _callWe('1001006106','/WeChart/DispatchOrderCreate',sendObj,res=>{
    //             console.log(res)
    //             disposeInfo(res,()=>{
    //             })
    //         })
    //     }
    // })

    //底部tobar
    new setTobar({
        'mainBtn':[
            {'name':"完成装车",'url':'wccyrLoadSearchHistory.html',onClick:function(){
                let isOk = true;
                $("input").each((i,v)=>{
                    if(!$(v).val()){
                        console.log($(v).val())
                        $.toptip($(v).attr("placeholder"), 'warning');
                        isOk = false;
                        return false;
                    }
                })
                if(isOk){
                    let sendObj = $(".weui-cells").formSerialize(),
                        sendCode = $("#sendCity").attr('data-codes') ? $("#sendCity").attr('data-codes').split(",") : [],
                        receiverCode = $("#receiverCity").attr('data-codes') ? $("#receiverCity").attr('data-codes').split(",") : [],
                        senderUser = $("#fsenderName").attr('data-values');
                    //发货地
                    sendObj['fsenderProvinceCode'] = sendCode.length>0 ? sendCode[0] : "";
                    sendObj['fsenderCityCode'] = sendCode.length>0 ? sendCode[1] : "";
                    sendObj['fsenderCountyCode'] = sendCode.length>0 ? sendCode[2] : "";
                    //收货地
                    sendObj['freceiverProvinceCode'] = receiverCode.length>0 ? receiverCode[0] : "";
                    sendObj['freceiverCityCode'] = receiverCode.length>0 ? receiverCode[1] : "";
                    sendObj['freceiverCountyCode'] = receiverCode.length>0 ? receiverCode[2] : "";
                    //货主信息
                    sendObj['fsenderNo'] = senderUser ? senderUser.split("&")[0] : "";
                    sendObj['fsenderTel'] = senderUser ? senderUser.split("&")[1] : "";
                    sendObj['ftruckNo'] = $('#ftruckNo').data('key')?$('#ftruckNo').data('key'):"";
                    sendObj['fstaffNo'] = $('#fstaffNo').data('key')?$('#fstaffNo').data('key'):"";
                    //合同类型
                    sendObj['fcontractType'] = $("#fcontractType").data('values');
                    //货物信息
                    sendObj['goods'] = [
                        {
                            "fgoodsName":sendObj['fgoodsName'],
                            "fgoodsTypeCode":sendObj['fgoodsTypeCode'],
                            "fgoodsNum":sendObj['fgoodsNum'],
                            "fgoodsWeight":sendObj['fgoodsWeight'],
                            "fgoodsVolume":sendObj['fgoodsVolume']
                        }
                    ];
                    //费用信息
                    sendObj['orderFee'] = {
                        "fcarriage":sendObj['fcarriage'],
                        "fgoodsFee":sendObj['fgoodsFee']
                    };
                    delete sendObj['fgoodsName'];
                    delete sendObj['fgoodsTypeCode'];
                    delete sendObj['fgoodsNum'];
                    delete sendObj['fgoodsWeight'];
                    delete sendObj['fgoodsVolume'];
                    delete sendObj['fcarriage'];
                    delete sendObj['fgoodsFee'];
                    _callWe('1001006106','/WeChart/DispatchOrderCreate',sendObj,res=>{
                        console.log(res)
                        disposeInfo(res,()=>{
                        })
                    })
                }
            }}
        ]
    });
})
//驾驶员或者车辆被单击时
$("#ftruckNo,#fstaffNo").click(function(){
    let _type = $(this).data("type");
    if(_type==2){
        $("#popupSearch #searchInput").attr("placeholder",'请输入驾驶员名称');
        $("#popupSearch .weui-search-bar__label span").text('请输入驾驶员名称');
    }
    //填写id 和 type
    $("#targetId").val($(this).attr("id"));
    $("#searchType").val(_type);
    //初始化显示值
    $(".search_body .weui-cells").empty();
    $("#searchInput").val("");
    if($('.weui-search-bar').hasClass('weui-search-bar_focusing')){
        $('.weui-search-bar').removeClass('weui-search-bar_focusing');
    }
    //打开搜索框
    $("#popupSearch").popup();
})
$("#searchInput").on('input',function(){
    clearInterval(timer);
    timer = setTimeout(()=>{
        searchData( $("#searchType").val(),$(this).val())
    },500);
})
//type 1：车牌号搜索 2 驾驶员搜索
function searchData(type,data){
    //默认为1
    let config = {
            "code_list" : '1001002111',
            "url_list" : '/Basic/TruckSearch',
            'sendObj' : {
                "fplateNo":data?data:"",
                "ftruckMobile":"",
                "ftruckTypeNo":"",
                "fisAbled":"1",
                "pageSetBody":{"pageNo":0,"pageSize":"-1"}
            },
            'showKey' : 'ftruckNo',
            'showVal' : 'fplateNo',
        },
        _html = "";
    if(type == 2){
        config = {
            "code_list" : '1001001313',
            "url_list" : '/Basic/StaffSearch',
            'sendObj' : {
                "frealName":data?data:"",
                "fmobile":"",
                "fidcardNo":"",
                "fstaffType":"-1",
                "fisAbled":"-1",
                "pageSetBody":{"pageNo":0,"pageSize":'-1'}
            },
            'showKey' : 'fstaffNo',
            'showVal' : 'frealName',
        }
    }
    //处理返回数据
    _callWe(config['code_list'],config['url_list'],config['sendObj'],(res)=>{
        if(res.msgBody && res.msgBody.pageOutBody.pageObjBody.length > 0){
            $.each(res.msgBody.pageOutBody.pageObjBody,(i,v)=>{
                _html += `
                    <a class="weui-cell weui-cell_access" href="javascript:;" data-val="${v[config['showVal']]}" data-key="${v[config['showKey']]}">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>${v[config['showVal']]}</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                `;
            })
        }else{
            _html += `<div class="text-center">未查询到数据！</div>`;
        }
        $(".search_body .weui-cells").html(_html);
        $("a.weui-cell_access").click(function(){
            $("#"+$("#targetId").val()).val($(this).data('val')).data('key',$(this).data('key'));
            $.closePopup();
        })
    })

}
