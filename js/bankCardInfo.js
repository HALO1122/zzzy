let _pageType = "add",
    config = {
        'url':'/WeChartBasic/BankCardAdd',
        'code':'1001000337'
    },
    fdepartmentNo = $.request.queryString['fdepartmentNo'],
    fbankAccountNo = $.request.queryString['cardId'] ? $.request.queryString['cardId'] : "";
$(()=>{
    //判断是增加还是修改
    if($.request.queryString['_type'] == 'edit') {
        $(".d_delete").removeClass('hide');
        _pageType='edit';
        config['url'] = '/WeChartBasic/BankCardUpdate'
        config['code'] = '1001000338';
        //查询详情
        _callWe('1001000342','/WeChartBasic/BankCardSearchById',{'fbankAccountNo':$.request.queryString['cardId']},res=>{
            if(res.msgBody && res.msgBody.fid>0){
                fbankAccountNo = res.msgBody.fbankAccountNo;
                $(".weui-cells_form").formSerialize(res.msgBody);
            }else{
                $.toast('查新详细信息失败','cancel');
            }
        })
    }
    $(".d_save").click(()=>{
        let sendObj = $(".weui-cells_form").formSerialize(),isOk = true;
        $.each(sendObj,(i,v)=>{
            if(!v){
                $.toptip($(`[name=${i}]`).attr("placeholder"),'warning');
                isOk = false;
                return false;
            }
        });
        if(isOk){
            sendObj['fbankAccountNo'] = fbankAccountNo;
            _callWe(config['code'],config['url'],sendObj,res=>{
                if(res.msgBody && res.msgBody.sta == 'ok'){
                    $.toast('保存成功！','success',()=>{
                        window.location.href = _path+"bankCardList.html";
                    });
                }else{
                    $.toast('保存失败！','success');
                }
            })
        }
    });
    $(".d_delete").click(()=>{
        _callWe('1001000339','/WeChartBasic/BankCardDelete',{'fbankAccountNo':fbankAccountNo},res=>{
            if(res.msgBody && res.msgBody.sta == 'ok'){
                $.toast(res.msgBody.staInfo,'success',()=>{
                    window.location.href = _path+"bankCardList.html";
                });
            }else{
                $.toast('删除失败！','success');
            }
        })
    })
});