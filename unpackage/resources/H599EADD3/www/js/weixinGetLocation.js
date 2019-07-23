function getLocations() {
    // getJsJdk(["getLocation"],()=>{
    //    
    // })
	 // 获取当前地理位置
	wx.getLocation({
	    success: function (res) {
	        AMap.service('AMap.Geocoder', function () {//回调函数
	            //实例化Geocoder
	            geocoder = new AMap.Geocoder();
	            var lnglatXY = [res.longitude, res.latitude];//地图上所标点的坐标
	            geocoder.getAddress(lnglatXY, function (status, result) {
	                if (status === 'complete' && result.info === 'OK') {
	                    //获得了有效的地址信息,即 result.regeocode.formattedAddress
	                    var data=result.regeocode.addressComponent,
	                        province = data.province,
	                        city = data.city,
	                        district = data.district;
	                    $("#fsenderAddress").val(province+"-"+city+"-"+district).trigger("change");
	                    $("#fsenderCountyCode").val(data.adcode);
	                } else {
	                    //获取地址失败
	                }
	            });
	        })
	    },
	    cancel: function (res) {
	        alert('用户拒绝授权获取地理位置');
	    }
	});
	
	
	// var map = new BMap.Map("allmap");
	// var point = new BMap.Point();
	// map.centerAndZoom(point, 16)
	// 
	// // 定位对象方案1 : 百度获取经纬度
	// var geoc = new BMap.Geocoder();
	// var geolocation = new BMap.Geolocation();
	// geolocation.getCurrentPosition(function(r){
	// 	console.log(r)
	// 　　if(this.getStatus() == BMAP_STATUS_SUCCESS){
	// 　　　　var mk = new BMap.Marker(r.point);
	// 　　　　map.addOverlay(mk);
	// 　　　　map.panTo(r.point);
	// 　　　　console.log("当前位置经度为:"+r.point.lng+"纬度为:"+r.point.lat);
	// 　　　　setLocation(r.point);
	// 　　} else {
	// 　　　　console.log('无法定位到您的当前位置，导航失败，请手动输入您的当前位置！'+this.getStatus());
	// 　　}
	// },{enableHighAccuracy: true});
	//  
	//  
	// //获取地理位置的函数
	// function setLocation(point){
	// 　　geoc.getLocation(point, function(rs){
	// 	console.log(rs)
	// 　　	var addComp = rs.addressComponents;
	// 	$("#fsenderAddress").val(addComp.province+"-"+addComp.city+"-"+addComp.district).trigger("change");
	// 　　});
	// }
	
};