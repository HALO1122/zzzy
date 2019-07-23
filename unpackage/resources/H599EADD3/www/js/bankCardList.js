let _pageType = "add",
    config = {
        'url':'/WeChartBasic/BankCardListSearch',
        'code':'1001000340'
    },
    fdepartmentNo = $.request.queryString['fdepartmentNo'] ? $.request.queryString['fdepartmentNo'] : "f4db623c1986437f9306131ecbbe69fd";
$(()=>{
    _callWe(config['code'],config['url'],{'fdepartmentNo':fdepartmentNo},res=>{
        let _html = "";
        if(res.msgBody && res.msgBody.pageOutBody.pageObjBody.length>0){
            $.each(res.msgBody.pageOutBody.pageObjBody,(i,v)=>{
                _html += `
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg bankCardInfo" cardId="${v.fbankAccountNo}">
                    <div class="weui-media-box__hd">
                        <i class="iconfont icon-yinxingqia"></i>
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">${v.fbankName}</h4>
                        <p class="weui-media-box__desc">${v.fbankCardNo}</p>
                    </div>
                </a>
            `;
            })
        }else{
            _html += `<div class="text-center">暂无数据！</div>`;
        }
        $(".bankCardList .weui-panel__bd").html(_html);
        $(".bankCardInfo").off('click').on('click',function(){
            window.location.href = _path+"bankCardInfo.html?_type=edit&cardId="+$(this).attr('cardId');
        })
    })
    $(".addCard button").click(()=>{
        window.location.href = _path+"bankCardInfo.html?fdepartmentNo="+fdepartmentNo;
    })
})