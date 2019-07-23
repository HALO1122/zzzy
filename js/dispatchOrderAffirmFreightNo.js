$(()=>{
    new getImgData({"imgDelete":false});
    $(".record").click(()=>{
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
    })
})
