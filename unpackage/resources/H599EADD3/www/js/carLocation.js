$(function () {
    map = new AMap.Map("map",{
        resizeEnable: true
    });
    var fplateNo = getUrlParams("fplateNo");
    var floadDate = getUrlParams("floadDate");
    var funloadDate = getUrlParams("funloadDate");
    AMapUI.load(['ui/misc/PathSimplifier','ui/overlay/SimpleMarker'], function(PathSimplifier,SimpleMarker) {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例
            getPath: function(pathData, pathIndex) {
                return pathData.path;
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {
                if (pointIndex >= 0) {
                    return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                }
                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {
                renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
            }
        });
        window.pathSimplifierIns = pathSimplifierIns;
        carSearch(1)
        //车辆定位被单击时
        $("#dingwei").click(function(){
            carSearch(2)
        })
        //查询车辆轨迹
        $("#guiji").click(function(){
            carSearch(1)
        })
        //清空table
        $(".clearAll").click(function(){
            $("#table_01 tbody").empty();
        })
        //当通过装车单页面跳转过来时
        if(fplateNo && floadDate && funloadDate){
            $("#struckTypeCode").val(fplateNo).attr("readonly","true");
            $("#sstartTime").val(floadDate).removeClass("ly_date");
            $("#sendTime").val(funloadDate).removeClass("ly_date");
            $("#fanhui").attr("href",_dir + "wccyrLoadList.html").css("display","inline-block");
            carSearch(1)
        }
        /*
        * _type 1 轨迹查询 2定位查询
        * */
        function carSearch(_type){
            if(_type == 1){
                var data = {
                    "msgBody":{
                        "carSign":filtrationNull($("#struckTypeCode").val()),
                        "startDate ":filtrationNull($("#sstartTime").val()),
                        "endDate ":filtrationNull($("#sendTime").val())
                    }
                }
                // data = JSON.stringify(data)
                // $.ajax({
                //     url:devSite+"/WccyrDispatchOrder/GetCarHistory",
                //     type:"post",
                //     data:{"msg":data},
                //     success:function(res){
                //         // res = JSON.parse(res)
                //         if(res.result){
                //             map.clearMap();
                //             //经纬度数组
                //             var lgAndLt = [];
                //             //状态栏信息拼接
                //             var trs = "";
                //             $.each(res.result,function(i,v){
                //                 var time = new Date(v.gpsTime).Format("yyyy-MM-dd hh-mm-ss");
                //                 trs += `<tr><td>${i+1}</td><td>${time}</td><td>${v.pos}</td></tr>`;
                //                 lgAndLt.push([v.lng,v.lat])
                //             })
                //             $("#tracks tbody").html(trs);
                //             //设置数据
                //             guiji(lgAndLt)
                //             //起点标识
                //             sign([lgAndLt[0][0],lgAndLt[0][1]],res.result[0].pos);
                //             //终点标识
                //             sign([lgAndLt[lgAndLt.length-1][0],lgAndLt[lgAndLt.length-1][1]],res.result[res.result.length-1].pos)
                //         }
                //     }
                // })
                _callWe_noUrl("",'/WccyrDispatchOrder/GetCarHistory',data.msgBody,res=>{
                    res = JSON.parse(res)
                    searchInfo(res,()=>{
                        map.clearMap();
                        //经纬度数组
                        var lgAndLt = [];
                        //状态栏信息拼接
                        var trs = "";
                        $.each(res.msgBody,function(i,v){
                            var time = new Date(v.gpsTime).Format("yyyy-MM-dd hh-mm-ss");
                            trs += `<tr><td>${i+1}</td><td>${time}</td><td>${v.pos}</td></tr>`;
                            lgAndLt.push([v.lng,v.lat])
                        })
                        $("#tracks tbody").html(trs);
                        //设置数据
                        guiji(lgAndLt)
                        //起点标识
                        sign([lgAndLt[0][0],lgAndLt[0][1]],res.msgBody[0].pos);
                        //终点标识
                        sign([lgAndLt[lgAndLt.length-1][0],lgAndLt[lgAndLt.length-1][1]],res.msgBody[res.msgBody.length-1].pos)
                    })
                })
            }else if(_type ==2){
                //清除地图覆盖物
                map.clearMap();
                pathSimplifierIns.setData({data:[]});
                var now= new Date(),
                    h=now.getHours(),
                    m=now.getMinutes(),
                    s=now.getSeconds(),
                    ms=now.getMilliseconds();
                var gpsTime = (h+":"+m+":"+s+ " " +ms);
                var data = {
                    "msgBody":{
                        "carSign":filtrationNull($("#struckTypeCode").val()),
                        "gpsTime":gpsTime,
                    }
                }
                // data = JSON.stringify(data)
                // $.ajax({
                //     url:devSite+"/WccyrDispatchOrder/GetCarPosition",
                //     type:"post",
                //     data:{"msg":data},
                //     success:function(res){
                //         res = JSON.parse(res)
                //         if(res.msgBody){
                //             var data = res.msgBody;
                //             //设置中心点和缩放级别
                //             map.setZoom(13);
                //             map.setCenter([data.rectifyLng, data.rectifyLat])
                //             sign([data.rectifyLng, data.rectifyLat],data.carSign)
                //         }
                //     }
                // })
                _callWe_noUrl("",'/WccyrDispatchOrder/GetCarPosition',data.msgBody,res=>{
                    res = JSON.parse(res)
                    searchInfo(res,()=>{
                        var data = res.msgBody;
                        //设置中心点和缩放级别
                        map.setZoom(13);
                        map.setCenter([data.rectifyLng, data.rectifyLat])
                        sign([data.rectifyLng, data.rectifyLat],data.carSign)
                    })
                })
            }
        }
        /*
        * 标记
        * coordinate 中心点坐标
        * title 标题文字
        * */
        function sign(coordinate,title){
            new SimpleMarker({
                //前景文字
                iconLabel: {
                    innerHTML:`<div>${title}</div>`,
                    style:{
                        "width":"100px",
                        "position":"absolute",
                        "left":"-100%",
                        "top":"100%",
                        "text-align":"center"
                    }
                },
                showPositionPoint:true,
                //图标主题
                iconTheme: 'numv2',
                //背景图标样式
                iconStyle: 'blue',
                //...其他Marker选项...，不包括content
                map: map,
                position: coordinate
            });
        }
        /*
        * 轨迹
        * lgAndLt 经纬度坐标数组
        * car 车牌号
        * */
        function guiji(lgAndLt){
            pathSimplifierIns.setData([{
                name: '路线0',
                path: lgAndLt,
                keyPointTolerance:100,
                pathLineHoverStyle:{"color":"yellow","background":"yellow"}
            }]);

            //对第一条线路（即索引 0）创建一个巡航器
            var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true, //循环播放
                speed: 10000 //巡航速度，单位千米/小时
            });
            navg1.start();
        }

    });
});



