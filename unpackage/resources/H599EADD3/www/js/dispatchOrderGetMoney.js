$(()=>{
    $("body").on("touchstart",function(e){
        var $dom = $(e.target);
        e.preventDefault();
        console.log($dom.parents(".weui-picker-container").length);
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
    $(".tikuan").click(()=>{
        $.modal({
            title: "运费提款确认",
            text: `
                <div class="weui-form-preview">
                  <div class="weui-form-preview__hd">
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">实结运费</label>
                      <em class="weui-form-preview__value">¥2400.00</em>
                    </div>
                  </div>
                  <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">运单号</label>
                      <span class="weui-form-preview__value">7123012</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">驾驶员</label>
                      <span class="weui-form-preview__value">老王</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">车辆</label>
                      <span class="weui-form-preview__value">豫K12345</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">货物</label>
                      <span class="weui-form-preview__value">电脑</span>
                    </div>
                  </div>
                </div>
            `,
            buttons: [
                { text: "确认提款", onClick: function(){ $.alert("确认提款"); } },
                { text: "记录查询", onClick: operationRecord},
                { text: "取消", className: "default"}
            ]
        });
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
        beforeClose: function(values, titles) {
            if(values.indexOf("6") !== -1) {
                $.toast("不能选睡觉", "cancel");
                return false;
            }
            return true;
        },
        onChange: function(d) {
            console.log(this, d);
        },
        onClose: function (d) {
            console.log('close')
        }
    });
})
function operationRecord(No){
    console.log(No);
    $.modal({
        title: "操作记录",
        text : `
           <div class="weui-cell">
                <div class="w10 timeLine">
                    <span class="line"></span>
                    <span class="triangle "></span>          
                </div>            
                <div class="weui-form-preview w90">
                  <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">7000</label>
                      <span class="weui-form-preview__value">=>8000</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">操作人</label>
                      <span class="weui-form-preview__value">老王</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">原因</label>
                      <span class="weui-form-preview__value">雨天路滑，风险大，需要增加运费。</span>
                    </div>
                  </div>
                  <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">7000</label>
                      <span class="weui-form-preview__value">=>8000</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">操作人</label>
                      <span class="weui-form-preview__value">老王</span>
                    </div>
                    <div class="weui-form-preview__item">
                      <label class="weui-form-preview__label">原因</label>
                      <span class="weui-form-preview__value">雨天路滑，风险大，需要增加运费。</span>
                    </div>
                  </div>
                </div>          
           </div>                 
        `,
        buttons : [{ text: "确认"}]
    })
}