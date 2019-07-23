(function ($) {
    var WXUploadlugin = function (element, options) {
        this.element = element;
        this.options = options;

    }
    WXUploadlugin.initFlag = false;
    WXUploadlugin.readyFlag = false;
    WXUploadlugin.configInfo = null;
    WXUploadlugin.nodeArray = [];
    WXUploadlugin.getConfigAndInit = function () {
        var enncodeUri =location.href.split('#')[0];
        var $this = this;
        if (!WXUploadlugin.initFlag) {
            // $.ajax({
            //     url: "/WeChat/GetSdkInfo",
            //     type: "post",
            //     dataType: "json",
            //     data: {"url": enncodeUri},
            //     async: false,
            //     success: function (data) {
            //         if (data) {
            //             WXUploadlugin.initFlag = true;
            //             WXUploadlugin.configInfo = data;
            //             WXUploadlugin.checkAuth(data);
            //         }
            //     },
            //     error: function () {
            //         $.attr("微信初始化失败");
            //     }
            // });
            _callWe_noUrl("","/WeChat/GetSdkInfo",{},(data)=>{
                if (data.msgBody) {
                    WXUploadlugin.initFlag = true;
                    WXUploadlugin.configInfo = data.msgBody;
                    WXUploadlugin.checkAuth(data.msgBody);
                }
            })
        }
    };
    WXUploadlugin.checkAuth = function (data) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appidInfo, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ['chooseImage', 'uploadImage','getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    WXUploadlugin.prototype = {
        create: function () {
            var $this = this;
            if (!WXUploadlugin.initFlag || !WXUploadlugin.readyFlag) {
                WXUploadlugin.getConfigAndInit();
                if (WXUploadlugin.initFlag) {
                    if (!WXUploadlugin.readyFlag) {
                        WXUploadlugin.nodeArray.push($this);
                    } else {
                        $this.options.init();
                    }

                }
            } else {
                $this.options.init();
            }
        }
    };
    wx.ready(function () {
        WXUploadlugin.readyFlag = true;
        if (WXUploadlugin.nodeArray.length > 0) {
            $.each(WXUploadlugin.nodeArray, function (index, node) {
                node.options.init();

            })
        }
    });

    wx.checkJsApi({
        jsApiList: ['chooseImage', 'uploadImage','getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            $.alert(res);
        }
    });
    wx.error(function (res) {
        $.attr("微信初始化失败");
    });
    $.fn.wechatUpload = function (option) {
        var defaultInfo = {
            complate: function (data) {
            },
            beforUpload: function () {
                return true;
            },
            afterUpload: function (dataArray) {

            },
            init: null,
            self: $(this),
            chooseCount: 1, //一次选择几张图片
            sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
            sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
        };
        return this.each(function () {

            var myOption = $.extend(defaultInfo, option);

            var initAction = function () {
                $(myOption.self).bind("click", function () {
                    // wx.checkJsApi({
                    //     jsApiList: ['chooseImage', 'uploadImage','getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    //     success: function(res) {
                    //
                    //     }
                    // });
                    var dataArray ={
                        serverIds:[],
                        localIds:[]
                    }
                        wx.chooseImage({
                            count: myOption.chooseCount, // 默认9
                            sizeType: myOption.sizeType,
                            sourceType: myOption.sourceType,
                            success: function (res) {
                                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                //循环调用
                                if(localIds&&localIds.length>0){
                                    for(var i =0;i<localIds.length;i++){
                                        wx.uploadImage({
                                            localId: localIds[i].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                                            isShowProgressTips: 1, // 默认为1，显示进度提示
                                            success: function (resInfo) {
                                                var serverId = resInfo.serverId; // 返回图片的服务器端ID
                                                dataArray.serverIds.push(serverId);

                                                // dataArray.localIds.push(demoSplitId);
                                                // var localData = resInfo.localData; // localData是图片的base64数据，可以用img标签显示

                                                var demoSplitId = resInfo.localId;//.split(":").replace("///g","");
                                                if(window.__wxjs_is_wkwebview){
                                                    wx.getLocalImgData({
                                                        localId: demoSplitId, // 图片的localID
                                                        success: function (getRes) {
                                                            dataArray.localIds.push(getRes.localData);
                                                            myOption.afterUpload(dataArray);
                                                        }
                                                    });

                                                }else{
                                                    dataArray.localIds =localIds;
                                                    myOption.afterUpload(dataArray);
                                                }

                                            }
                                        });
                                    }
                                }
                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                })
            }
            myOption.init = function () {
                initAction();
            }
            var wxUploadlugin = new WXUploadlugin(this, myOption);
            wxUploadlugin.create();


        })
    }
})(jQuery);