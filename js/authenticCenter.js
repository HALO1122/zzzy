$(function(){
    $(".groupBtn").html(`
        <ul>
            <li>选择您要认证的角色</li>
            <li>
                <div>
                    <a href="${_path}hzAuthentic.html" class="weui-btn weui-btn_plain-default">货主</a>
                </div>
            </li>
            <li>
                <div>
                    <a href="${_path}czAuthentic.html" class="weui-btn weui-btn_plain-default">公司车队</a>
                </div>
            </li>
            <li>
                <div>
                    <a href="${_path}jsyAuthentic.html" class="weui-btn weui-btn_plain-default">驾驶员</a>
                </div>
            </li>
            <li>
                <div>
                    <a href="${_path}userBind.html" class="weui-btn weui-btn_plain-default">账号绑定</a>
                </div>
            </li>
        </ul>
    `)
})
