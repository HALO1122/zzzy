var title = "运单";
var config = {
	url_page: _dir + "/new/PC_dispatchOrderAudit.html",
	url_add: _dir + "/new/PC_dispatchOrderAuditNo.html",
	title_page: title + "审核",
	title_list: title + "列表",
	title_edit: "审核" + title,
	code_list: "1001007005",
	//保存时加入运单列表
	code_edit: "1001007020",
	code_detail: "1001007001",
	pagination_01: $("#page_01")
};
//测试端口号
// var scHttpBig = "http://192.168.1.235:9000/file/images/";
// var scHttp = "http://192.168.1.235:9000/file/images/compress/";
// //生产服务器端口号
var scHttpBig = "http://zzzy.56ps.cn/file/images/";
var scHttp = "http://zzzy.56ps.cn/file/images/compress/";
$(document).ready(function () {
	//绑定地区
	var fsenderProvinceCode = $("#fsenderProvinceCode");
	var fsenderCityCode = $("#fsenderCityCode");
	var fsenderCountyCode = $("#fsenderCountyCode");
	var fsenderAddress = $("#fsenderAddress");


	var freceiverProvinceCode = $("#freceiverProvinceCode");
	var freceiverCityCode = $("#freceiverCityCode");
	var freceiverCountyCode = $("#freceiverCountyCode");
	var freceiverAddress = $("#freceiverAddress");

	if (_page == "PC_dispatchOrderAudit") {
		setTitle_01(config['title_list'], config['title_page'], config['url_add']);
		//绑定地区
		bindArea(fsenderProvinceCode, fsenderCityCode, fsenderCountyCode);
		//设置默认时间
		setDefaultDate($("#sstartTime"), $("#sendTime"));
		//加载事件
		var _trs, _pageSize, _pageCount;
		var setData = function (pIndex, pSize) {
			pIndex = pIndex || 0;
			pSize = pSize || 20;

			var pageSetBody = { "pageNo": pIndex, "pageSize": pSize };
			var sendObj = {
				"fcompanyId": getUserInfo(0).fcompanyId,
				"ftempOrderNo": "",
				"fsenderProvinceCode": $("#fsenderProvinceCode").val() ? $("#fsenderProvinceCode").val() : "",
				"fsenderCityCode": $("#fsenderCityCode").val() ? $("#fsenderCityCode").val() : "",
				"fsenderCountyCode": $("#fsenderCountyCode").val() ? $("#fsenderCountyCode").val() : "",
				"fstartTime": $("#sstartTime").val(),
				"fendTime": $("#sendTime").val(),
				"ftempOrderStatus": "1",
				"pageSetBody": pageSetBody
			};
			_call(config['code_list'], sendObj, function (res) {
				res = {"key":"0","msgBody":{"pageOutBody":{"count":15,"pageNo":0,"pageObjBody":[{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-21 09:44:40.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10210,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-21 09:44:40.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-21 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"云南省-玉溪市-市辖区","freceiverCardType":0,"freceiverCityCode":"530400","freceiverCityName":"","freceiverCountyCode":"530401","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"530000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-21 09:44:40.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"b84e592bac124f848d5f0c2011491d1e","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":30,"fgoodsWidth":0,"fid":10212,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"0d772a9d1cd64a5c98740de5741d34e4"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-21 09:44:40.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10210,"fisDeleted":false,"flatestUpdatedTime":"2017-11-21 09:44:40.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"b84e592bac124f848d5f0c2011491d1e","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-21 09:43:32.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10209,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-21 09:43:32.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-21 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"广东省-深圳市-市辖区","freceiverCardType":0,"freceiverCityCode":"440300","freceiverCityName":"","freceiverCountyCode":"440301","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"440000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-21 09:43:32.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"b65a9a9aa9264414b20b1396735e1340","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":30,"fgoodsWidth":0,"fid":10211,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"c6f942d435644c5a97c1ff17ac1dc4ce"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-21 09:43:32.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10209,"fisDeleted":false,"flatestUpdatedTime":"2017-11-21 09:43:32.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"b65a9a9aa9264414b20b1396735e1340","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:31:17.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10186,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:31:17.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"山东省-临沂市-费县","freceiverCardType":0,"freceiverCityCode":"371300","freceiverCityName":"","freceiverCountyCode":"371325","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"370000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:31:17.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"a832b035cae94cdfa8e326e35c7b1ee9","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":20,"fgoodsWidth":0,"fid":10188,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"18f81606f2a041f6ac42b130502ef195"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:31:17.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10186,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:31:17.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"a832b035cae94cdfa8e326e35c7b1ee9","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:30:40.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10185,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:30:40.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"山东省-临沂市-费县","freceiverCardType":0,"freceiverCityCode":"371300","freceiverCityName":"","freceiverCountyCode":"371325","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"370000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:30:40.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"847e1f63730e42f08c1d0fa0bfc4d8ed","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":20,"fgoodsWidth":0,"fid":10187,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"e4c0cc534daf4579add599b5f3ee0635"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:30:40.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10185,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:30:40.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"847e1f63730e42f08c1d0fa0bfc4d8ed","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:29:40.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10184,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:29:40.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"陕西省-咸阳市-淳化县","freceiverCardType":0,"freceiverCityCode":"610400","freceiverCityName":"","freceiverCountyCode":"610430","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"610000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:29:40.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"a7914fe067a348f3ad7d72b1c41a1e40","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":32,"fgoodsWidth":0,"fid":10186,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"792be0b49fd84ed581690342a12013c3"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:29:40.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10184,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:29:40.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"a7914fe067a348f3ad7d72b1c41a1e40","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:28:25.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10183,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:28:25.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"广西壮族自治区-贺州市-市辖区","freceiverCardType":0,"freceiverCityCode":"451100","freceiverCityName":"","freceiverCountyCode":"451101","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"450000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:28:25.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"23e6889068354d97a68a2db11c6b3876","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"13","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":50,"fgoodsWidth":0,"fid":10185,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"29da99231ed14d70a4e5d8ff089af67a"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:28:25.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10183,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:28:25.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"23e6889068354d97a68a2db11c6b3876","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:27:00.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10182,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:27:00.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"山东省-菏泽市-市辖区","freceiverCardType":0,"freceiverCityCode":"371700","freceiverCityName":"","freceiverCountyCode":"371701","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"370000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:27:00.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"4268f20d3cbe4fd7824a8c0df38bf9e0","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"9.6","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":18,"fgoodsWidth":0,"fid":10184,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"49c474dd77344cba8babc64b07273146"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:27:00.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10182,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:27:00.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"4268f20d3cbe4fd7824a8c0df38bf9e0","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:25:33.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10181,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:25:33.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"陕西省-咸阳市-淳化县","freceiverCardType":0,"freceiverCityCode":"610400","freceiverCityName":"","freceiverCountyCode":"610430","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"610000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:25:33.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"83091268f13e49f8a8263ac052b0e74e","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"13","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":25,"fgoodsWidth":0,"fid":10183,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"0382a0ef090f40b4b5644c5e2b390dd0"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:25:33.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10181,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:25:33.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"83091268f13e49f8a8263ac052b0e74e","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:25:10.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10180,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:25:10.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"陕西省-咸阳市-淳化县","freceiverCardType":0,"freceiverCityCode":"610400","freceiverCityName":"","freceiverCountyCode":"610430","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"610000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:25:10.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"719af2c230474e67b599a4c3bb26f8d2","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"6.8","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":8,"fgoodsWidth":0,"fid":10182,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"e5fa6c27638b49b1882011b4cc0d4418"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:25:10.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10180,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:25:10.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"719af2c230474e67b599a4c3bb26f8d2","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:24:38.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10179,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:24:38.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"陕西省-咸阳市-淳化县","freceiverCardType":0,"freceiverCityCode":"610400","freceiverCityName":"","freceiverCountyCode":"610430","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"610000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:24:38.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"8f1181e53b014be3b8c756a8f3464a5f","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":25,"fgoodsWidth":0,"fid":10181,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"99eca6c8852441ab867fc5d4537c3fbc"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:24:38.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10179,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:24:38.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"8f1181e53b014be3b8c756a8f3464a5f","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-11-17 15:21:38.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":10178,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-11-17 15:21:38.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-11-17 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"重庆市-市辖区-渝中区","freceiverCardType":0,"freceiverCityCode":"500100","freceiverCityName":"","freceiverCountyCode":"500103","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"500000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-11-17 15:21:38.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"e8b47bf4f1cd421b8baf843bb03ec631","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"17.5","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":10,"fgoodsWidth":0,"fid":10180,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"914ef07525cf4479834c48f154962a50"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-11-17 15:21:38.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":10178,"fisDeleted":false,"flatestUpdatedTime":"2017-11-17 15:21:38.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"e8b47bf4f1cd421b8baf843bb03ec631","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-10-31 16:21:18.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":80,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-10-31 16:21:18.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-10-31 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"安徽省-六安市-市辖区","freceiverCardType":0,"freceiverCityCode":"341500","freceiverCityName":"","freceiverCountyCode":"341501","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"340000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-10-31 16:21:18.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"2262b810073140ec98910e9c4bf72a0b","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"16","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":30,"fgoodsWidth":0,"fid":81,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"b26a818a12d946dda6ff7328137259ef"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-10-31 16:21:18.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":80,"fisDeleted":false,"flatestUpdatedTime":"2017-10-31 16:21:18.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"2262b810073140ec98910e9c4bf72a0b","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-10-30 16:43:07.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":71,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-10-30 16:43:07.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-10-30 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"四川省-绵阳市-游仙区","freceiverCardType":0,"freceiverCityCode":"510700","freceiverCityName":"","freceiverCountyCode":"510704","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"510000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-10-30 16:43:07.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"6f9d09bf604e4561b257a6dc16a4fa66","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"16","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":20,"fgoodsWidth":0,"fid":72,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"a0a124abb03548f4bc0313ab2bde12c9"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-10-30 16:43:07.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":71,"fisDeleted":false,"flatestUpdatedTime":"2017-10-30 16:43:07.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"6f9d09bf604e4561b257a6dc16a4fa66","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-10-30 16:41:01.0","fcreatorId":1039,"fcreatorName":"李新阳","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":70,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-10-30 16:41:01.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-10-31 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"安徽省-亳州市-市辖区","freceiverCardType":0,"freceiverCityCode":"341600","freceiverCityName":"","freceiverCountyCode":"341601","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"340000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-10-30 16:41:01.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李新阳","fsenderNo":"9ff49063c11b46219bf2f257f5ce70dc","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"13782399321","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"45ad0b2df3cd4bce87f092b42c73f8fb","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"9.6","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"电梯","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":16,"fgoodsWidth":0,"fid":71,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"36f6c4afd4fe44c0949c5de3bd9f7b2b"}],"orderFee":{"fcarriage":0,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-10-30 16:41:03.0","fcreatorId":1039,"fcreatorName":"李新阳","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":50,"fhedgeAmount":0,"fhedgeRatio":0,"fid":70,"fisDeleted":false,"flatestUpdatedTime":"2017-10-30 16:41:03.0","flatestUpdatorId":1039,"flatestUpdatorName":"李新阳","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"45ad0b2df3cd4bce87f092b42c73f8fb","ftotalFee":0,"ftransferFee":0}},{"cod":null,"fclaimsStatus":0,"fcodstatus":0,"fcompanyId":3,"fcontractType":0,"fcontractTypeName":"","fcreatedTime":"2017-10-23 16:01:34.0","fcreatorId":1037,"fcreatorName":"李建磊","fdispatcherName":"","fdispatcherNo":"","ffeeStatus":0,"fgoodsMaxHeight":0,"fgoodsMaxLength":0,"fgoodsMaxVolume":0,"fgoodsMaxWeight":0,"fgoodsMaxWidth":0,"fid":27,"fisDeleted":false,"fisFreightOrder":0,"fisRequiredReceipt":0,"flat":"","flatestUpdatedTime":"2017-10-23 16:01:34.0","flatestUpdatorId":1037,"flatestUpdatorName":"李建磊","flng":"","floadListAdress":"","flostStatus":0,"fpicUrl":"","fplanLoadListTime":"2017-10-23 00:00:00.0","freceiveAreaCode":"","freceiveSiteName":"","freceiveSiteNo":"","freceiveStatus":0,"freceiverAddress":"贵州省-六盘水市-钟山区","freceiverCardType":0,"freceiverCityCode":"520200","freceiverCityName":"","freceiverCountyCode":"520201","freceiverCountyName":"","freceiverDate":"","freceiverIdcardNo":"","freceiverMobile":"","freceiverName":"","freceiverProvinceCode":"520000","freceiverProvinceName":"","freceiverStreetAddress":"","freceiverTel":"","fremark":"","freturnStatus":0,"fsendDate":"2017-10-23 16:01:34.0","fsendSiteName":"","fsendSiteNo":"","fsenderAddress":"河南省-许昌市-魏都区","fsenderCardType":0,"fsenderCityCode":"411000","fsenderCityName":"","fsenderCountyCode":"411002","fsenderCountyName":"","fsenderIdcardNo":"","fsenderMobile":"","fsenderName":"李建磊","fsenderNo":"71cf49fc74094dc29b65183916e653ae","fsenderProvinceCode":"410000","fsenderProvinceName":"","fsenderStreetAddress":"","fsenderTel":"15893708558","fsignType":0,"fsorterName":"","fsorterNo":"","ftempOrderNo":"c6557991f9bb4de5ad05d9dbe8cac84c","ftempOrderPjStatusName":"正常","ftempOrderStatus":1,"ftempOrderStatusName":"未处理","ftempOrderType":1,"ftempOrderTypeName":"正程","fterminalNo":"","ftransferCity":"","ftruckLong":"9.6","funloadListAdress":"","funusualStatus":0,"fvalidTime":"","fwebOrderNo":"","fwlcardNo":"","goods":[{"fcompanyId":0,"fcreatedTime":"","fcreatorId":0,"fcreatorName":"","fgoodsHeight":0,"fgoodsLong":0,"fgoodsName":"设备","fgoodsNum":0,"fgoodsStatus":0,"fgoodsTypeCode":"","fgoodsTypeName":"","fgoodsVolume":0,"fgoodsWeight":14,"fgoodsWidth":0,"fid":28,"fisDeleted":false,"flatestUpdatedTime":"","flatestUpdatorId":0,"flatestUpdatorName":"","fpacket":"","fremark":"","ftempOrderGoodsNo":"d027f0af135f4bc09a90c10301ad7616"}],"orderFee":{"fcarriage":9000,"fcheckTime":"","fcheckerName":"","fcheckerNo":"","fcompanyId":3,"fcreatedTime":"2017-10-23 16:01:34.0","fcreatorId":1037,"fcreatorName":"李建磊","fdeliveryFee":0,"ffeeStatus":0,"fgoodsActualFee":0,"fgoodsFee":30,"fhedgeAmount":0,"fhedgeRatio":0,"fid":27,"fisDeleted":false,"flatestUpdatedTime":"2017-10-23 16:01:34.0","flatestUpdatorId":1037,"flatestUpdatorName":"李建磊","fmaintenanceFee":0,"fpayType":0,"fpickFee":0,"fratioNo":0,"freceiptFee":0,"fremark":"","fsettlementTime":"","ftempOrderNo":"c6557991f9bb4de5ad05d9dbe8cac84c","ftotalFee":0,"ftransferFee":0}}],"pageSize":20}},"msgId":"1001007006","serId":"29","source":"0","tokenSta":0,"type":"1"};
				_trs = "";
				if (!res.msgBody) {
					_trs = "";
					_pageSize = 1;
					_pageCount = 1;
				}
				else {
					_pageSize = res.msgBody.pageOutBody.pageSize;
					_pageCount = res.msgBody.pageOutBody.count;
					$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
                        var goodsWeight;
                        if(v.goods.length>0){
                            goodsWeight=v.goods[0].fgoodsWeight;
                        }else{
                            goodsWeight=0;
                        }
						_trs = _trs + "<tr><td>" + (i + 1) + "</td><td><a class='linkEdit' href='" + config['url_add'] + "?fid=" + v.fid + "&" + "ftempOrderNo" + "=" + v.ftempOrderNo + "&rtype=shenhe'>" + v.ftempOrderNo + "</a></td><td>" + v.fsenderName + "</td><td>" + v.fsenderTel + "</td><td>" + v.fsenderAddress + "</td><td>" + v.freceiverAddress + "</td><td>" + (v.ftruckLong==0?"零担":v.ftruckLong) + "</td><td>" + goodsWeight + "</td><td>" + v.ftempOrderStatusName + "</td><td>" + v.fcreatedTime + "</td><td>" + getTdOperate_cyr(24, config['url_add'], v.fid, "ftempOrderNo", v.ftempOrderNo) + "</td></tr>";
					});
				}
				$("#table_01 tbody").html(_trs);

				//绑定作废事件
				setInvalid("ftempOrderNo", config['code_delete']);

				//分页方法
				setPagination(config['pagination_01'], _pageSize, _pageCount, setData);
			});
		};

		var loadingAll = function () {
			if ($(".validate-form").valid()) {
				//初始化加载数据
				setData();
			}
		}
		// loadingAll();

		//查询方法
		setSearch(config['pagination_01'], loadingAll);
	}
	else if (_page == "PC_dispatchOrderAuditNo") {
		var sendObj2 = {};

		//绑定查询货主
		bindSearch_cyr($("#fsenderName"), 22);
		setValidateForm(1);

		$("select").change(function () {
			let _this = $(this);
			if ($(this).find("option:selected").val()) {
				if ($(this).hasClass("startCargo")) {
					setAdress(fsenderProvinceCode.find("option:selected").text(), fsenderCityCode.find("option:selected").text(), fsenderCountyCode.find("option:selected").text(), fsenderAddress);
				} else if ($(this).hasClass("endCargo")) {
					setAdress(freceiverProvinceCode.find("option:selected").text(), freceiverCityCode.find("option:selected").text(), freceiverCountyCode.find("option:selected").text(), freceiverAddress);
				} else if ($(this).hasClass("fsenderName")) {

					$("#fsenderTel").val($(this).find("option:selected").attr("fphone")).change().focus();
					$("#fsenderName").val($(this).find("option:selected").val()).click();
					setTimeout(function () {
						$("#select2-fsenderName-container").text(_this.find("option:selected").attr("nname"))
					}, 1);
				}
				$("form").validate();
				$(this).valid();
			}

		})

        $("#assembleImg li,#unloadImg li").click(function(){
            var src = $(this).attr("imgsrc");
            $("#modalImg").attr("src",scHttpBig+src);
            $('#myModal').modal()
        })
		var ftruckLongTags = [{ label: "零担", value: "零担" }, { label: "4.2", value: "4.2" }, { label: "6.8", value: "6.8" }, { label: "9.6", value: "9.6" }, { label: "13", value: "13" }, { label: "16", value: "16" }, { label: "17.5", value: "17.5" }];
		$("#ftruckLong").autocomplete({
			minLength: 0, autoFocus: true,
			source: ftruckLongTags
		}).click(function () { $(this).autocomplete("search", ""); });

		//初始化
		var PageInit = function () {
			var _fid = $.trim($.request.queryString["fid"]);
			var _ftempOrderNo = $.trim($.request.queryString["ftempOrderNo"]);
			var _rtype = $.trim($.request.queryString["rtype"]);
			var _msgId = 0;
			this.get_fid = function () {
				return this._fid;
			};
			this.get_msgId = function () {
				return this._msgId;
			};
			this.set_fid = function (v) {
				this._fid = v;
			}
			this.set_msgId = function (v) {
				this._msgId = v;
			}
			this.setDefault = function (v) {
				if (_fid != "" && _ftempOrderNo != "" && _rtype == "shenhe") {
					//修改
					this.set_msgId(config['code_edit']);
					this.set_fid(_fid);
					setTitle_08(config['title_page'], config['url_page']);

					//加载数据
					var sendObj = {
						"ftempOrderNo": $.trim(_ftempOrderNo),
						"fcompanyId": getUserInfo(0).fcompanyId
					};
					_call(config['code_detail'], sendObj, function (res) {
						if (res.msgBody) {
							var _v = res.msgBody;

							var formObj = new Form();
							formObj.init(_v);
							formObj.init(_v.goods);
							if (_v.orderFee) {
								formObj.init(_v.orderFee);
								$("#fcarriage").val(_v.orderFee.fcarriage == "0" ? "" : _v.orderFee.fcarriage)
								$("#fgoodsFee").val(_v.orderFee.fgoodsFee == "0" ? "" : _v.orderFee.fgoodsFee)
							}




							$("#fremark").val(_v.fremark)
							$("#ftempOrderStatus").val(_v.ftempOrderStatus)
							$("#ftruckLong").val(_v.ftruckLong == "0" ? "零担" : _v.ftruckLong)
							sendObj2['ftempOrderStatus'] = _v.ftempOrderStatus;
							sendObj2['ftempOrderNo'] = _v.ftempOrderNo;
							sendObj2["fisDeleted"] = _v.fisDeleted;
							sendObj2["fsendDate"] = _v.fsendDate;

							//避免异步查询期间的空白期
							bindArea_cyrF("fsenderProvinceCode", "fsenderCityCode", "fsenderCountyCode", "fsenderAddress", _v.fsenderProvinceName, _v.fsenderCityName, _v.fsenderCountyName, _v.fsenderAddress);
							bindArea_cyrF("freceiverProvinceCode", "freceiverCityCode", "freceiverCountyCode", "freceiverAddress", _v.freceiverProvinceName, _v.freceiverCityName, _v.freceiverCountyName, _v.freceiverAddress);

							//绑定地区
							bindArea(fsenderProvinceCode, fsenderCityCode, fsenderCountyCode, false, _v.fsenderProvinceCode, _v.fsenderCityCode, _v.fsenderCountyCode);
							bindArea(freceiverProvinceCode, freceiverCityCode, freceiverCountyCode, false, _v.freceiverProvinceCode, _v.freceiverCityCode, _v.freceiverCountyCode);
							//下拉框的绑定
							bindSearch_cyr($("#fsenderName"), 22, 0, 0, function () {
								$("#fsenderName").val(_v.fsenderNo).change();
								$("#fsenderName").select2();
							}, 1);
							if (_v.goods[0]) {
								$("#goodsFid").val(_v.goods[0].fid)
							}


							//遍历货物信息
							if (_v.goods) {
								var _goods_length = _v.goods.length;
								$("#dist_num").val(_goods_length);
								if (_goods_length > 1) {
									addRowFluid_02($(".d_addRow"), 'body_dist', 'dist_num', 'row-fluid', "cargoHide", _goods_length - 1);
								}
								$.each(_v.goods, function (i, v) {
									//查询货物种类
									i = i + 1;
									bindSearch_cyr($("[name='fgoodsTypeCode']:eq(" + i + ")"), 23, null, null, function () {
										if(v.fgoodsTypeCode){
											$("[name='fgoodsTypeCode']:eq(" + i + ")").val(v.fgoodsTypeCode)
										}else{
											$("[name='fgoodsTypeCode']:eq(" + i + ")").val("97")
										}

										$("[name='fgoodsTypeCode']:eq(" + i + ")").select2();
									});
									$("input[name='fgoodsName']:eq(" + i + ")").val(v.fgoodsName);
									$("input[name='fgoodsNum']:eq(" + i + ")").val(v.fgoodsNum);
									$("input[name='fgoodsWeight']:eq(" + i + ")").val(v.fgoodsWeight);
									$("input[name='fgoodsVolume']:eq(" + i + ")").val(v.fgoodsVolume);
									$("input[name='fgoodsTypeCode']:eq(" + i + ")").val(v.fgoodsTypeCode);
									$("input[name='fid']:eq(" + i + ")").val(v.fid);
									$("input[name='ftempOrderGoodsNo']:eq(" + i + ")").val(v.ftempOrderGoodsNo);
								});
							}
                            if(_v.ftruckLong!=""){
                                var truckLong = _v.ftruckLong.split(",");
                                $('#ftruckLong').val(truckLong).trigger('change');
                            }

						}
					});
				}
			}
		};

		var _default = new PageInit();
		_default.setDefault();

		//提交事件
		$(".validate-form .submit").on("click", function () {
			var _this = $(this);

            var goods = [],truckLong="";
			var orderFee = {
				fgoodsFee: $.trim($("#fgoodsFee").val()),
				fcarriage: $.trim($("#fcarriage").val()),
			};
			for (var i = 1; i < $("input[name='fid']").length; i++) {
				if ($("input[name='fid']:eq(" + i + ")").val() != "") {
					goods.push({
						fgoodsName: $("input[name='fgoodsName']:eq(" + i + ")").val(),
						fgoodsNum: $("input[name='fgoodsNum']:eq(" + i + ")").val() ? $("input[name='fgoodsNum']:eq(" + i + ")").val() : "0",
						fgoodsWeight: $("input[name='fgoodsWeight']:eq(" + i + ")").val(),
						fgoodsVolume: $("input[name='fgoodsVolume']:eq(" + i + ")").val(),
						fgoodsTypeCode: $("[name='fgoodsTypeCode']:eq(" + i + ")").find("option:selected").val(),
					});
				}
			}
			if (orderFee.fgoodsFee == "" && orderFee.fcarriage == "") {
				orderFee = null;
			}
            if($("#ftruckLong").val()){
                $.each($("#ftruckLong").val(),function(i,v){
                    if(i==0){
                        truckLong+=v;
                    }else{
                        truckLong+=","+v;
                    }

                })
            }else{
                d_alert("错误","请选择车长","error")
            }

			if ($(".validate-form").valid()) {
				dqq_confirm("确定审核通过么？", function () {
					_this.attr("disabled", true);
					sendObj2["fcontractType"] = $.trim($("#fcontractType").val());
					sendObj2["fsenderProvinceCode"] = $.trim($("#fsenderProvinceCode").val());
					sendObj2["fsenderCityCode"] = $.trim($("#fsenderCityCode").val());
					sendObj2["fsenderCountyCode"] = $.trim($("#fsenderCountyCode").val());
					sendObj2["fsenderAddress"] = $.trim($("#fsenderAddress").val());
					//发货客户编号
					sendObj2["fsenderNo"] = $.trim($("#fsenderName").find("option:selected").val());
					sendObj2["fsenderName"] = $.trim($("#fsenderName").find("option:selected").text());
					sendObj2["fsenderTel"] = $.trim($("#fsenderTel").val());
					sendObj2["fsenderMobile"] = $.trim($("#fsenderMobile").val());
					sendObj2["freceiverProvinceCode"] = $.trim($("#freceiverProvinceCode").val());
					sendObj2["freceiverCityCode"] = $.trim($("#freceiverCityCode").val());
					sendObj2["freceiverCountyCode"] = $.trim($("#freceiverCountyCode").val());
					sendObj2["freceiverAddress"] = $.trim($("#freceiverAddress").val());
					sendObj2["freceiverName"] = $.trim($("#freceiverName").val());
					sendObj2["freceiverMobile"] = $.trim($("#freceiverMobile").val());
					sendObj2["floadListAdress"] = $.trim($("#floadListAdress").val());
					sendObj2["funloadListAdress"] = $.trim($("#funloadListAdress").val());
					sendObj2["fplanLoadListTime"] = $.trim($("#fplanLoadListTime").val());
					sendObj2["fvalidTime"] = $.trim($("#fvalidTime").val());
					sendObj2["fremark"] = $.trim($("#fremark").val());
					sendObj2["fgoodsMaxLength"] = $.trim($("#fgoodsMaxLength").val());
					sendObj2["fgoodsMaxWidth"] = $.trim($("#fgoodsMaxWidth").val());
					sendObj2["fgoodsMaxHeight"] = $.trim($("#fgoodsMaxHeight").val());
					sendObj2["fgoodsMaxVolume"] = $.trim($("#fgoodsMaxVolume").val());
					sendObj2["fgoodsMaxWeight"] = $.trim($("#fgoodsMaxWeight").val());
					sendObj2["ftruckLong"] = $.trim($("#ftruckLong").val() == "零担" ? "0" : $("#ftruckLong").val());
					sendObj2["goods"] = goods;
					sendObj2["orderFee"] = orderFee;

					sendObj2["fcountyCode"] = $.trim($("#fcountyCode").val()) == "" ? "0" : $.trim($("#fcountyCode").val());
					sendObj2["fparentNo"] = $("#fparentNo").val();
					sendObj2["forganizationNo"] = $("#forganizationNo").val();

					sendObj2["fcompanyId"] = getUserInfo(0).fcompanyId;

					sloading(function () {
						_call(_default.get_msgId(), sendObj2, function (res) {
							confirm_ok_wccyr(res, config['url_page'])
                            if(res.msgBody.sta !== "ok"){
                                _this.attr("disabled",false)
                            }
						});
					}, 0);
				})
			}

		});
	}
	$(".select2").select2();
})
function upfilesuccess(res) {
	if (res.msgBody.sta == "ok") {
		top.swal("提示", res.msgBody.staInfo, "success");
	} else {
		top.swal("错误!", res.msgBody.staInfo, "error");
	}
}
function showMenu() {
	$("#tree_wrap_01").slideDown("fast");
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#tree_wrap_01").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "fparentNo" || event.target.id == "tree_wrap_01" || $(event.target).parents("#tree_wrap_01").length > 0)) {
		hideMenu();
	}
}
function selectNode(e, treeId, treeNode) {
	$("#fparentNo").val(treeNode.fparentNo);
	$("#fparentNo_text").val(treeNode.name);
	$("#forganizationNo").val(treeNode.id);
	hideMenu();
}
//设置地址
function setAdress(Province, City, County, adress) {
	adress.val(Province + "-" + City + "-" + County);
}
