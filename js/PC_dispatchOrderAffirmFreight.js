var title = "运费确认";
var config = {
	url_page: _dir + "PC_dispatchOrderAffirmFreight.html",
	url_add: _dir + "PC_dispatchOrderAffirmFreightNo.html",
	title_page: title + "管理",
	title_list: "运单列表",
	title_detail: title + "详情",
	title_add: "确认运单费用",
	code_list: "1001007025",
	code_delete: "1001007022",
	code_add: "1001007020",
	code_edit: "1001007100",
	code_detail: "1001007023",
	pagination_01: $("#page_01"),
};
$(document).ready(function () {
	if (_page == "PC_dispatchOrderAffirmFreight") {
		setTitle_01(config['title_list'], config['title_page'], config['url_add']);
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
				"fdispatchOrderNo": $("#fdispatchOrderNo").val(),
                "fstartTime": $("#sstartTime").val(),
                "fendTime": $("#sendTime").val(),
				"pageSetBody": pageSetBody
			};
			_call(config['code_list'], sendObj, function (res) {
				// _trs = "";
				// if (!res.msgBody) {
				// 	_trs = "";
					_pageSize = 1;
					_pageCount = 1;
				// }
				// else {
				// 	_pageSize = res.msgBody.pageOutBody.pageSize;
				// 	_pageCount = res.msgBody.pageOutBody.count;
				// 	$.each(res.msgBody.pageOutBody.pageObjBody, function (i, v) {
						_trs = _trs + "<tr><td>" + 1 + "</td><td>1212312</td><td>豫K12345</td><td>老司机</td><td>西瓜</td><td>郑州</td><td>2018-05-11 00:00:00</td><td>1212312</td><td><a class='btn btn-success btn-mini affirm' href='javascript:void(0);' title='运费确认'>运费确认</a></td></tr>";
				// 	});
				// }
				$("#table_01 tbody").html(_trs);

				$(".affirm").click(function(){
					window.location.href = _path+"PC_dispatchOrderAffirmFreightNo.html";
				})
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
	else if(_page == "PC_dispatchOrderAffirmFreightNo"){
        setTitle_02(config['title_add'],true,config['url_page']);

	}
	$(".select2").select2();
})


