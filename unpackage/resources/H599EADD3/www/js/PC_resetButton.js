var title = "";
var config = {
	url_page: _dir + "",
	url_add: _dir + "",
	title_page: title + "管理",
	title_list: title + "列表",
	title_detail: title + "详情",
	title_add: "增加" + title ,
	code_list: "",
	code_delete: "",
	code_add: "",
	code_edit: "",
	code_detail: "",
	pagination_01: $("#page_01"),
};
$(document).ready(function () {
	if (_page == "PC_resetButton") {
		setTitle_01(config['title_list'], "重置微信按钮", config['url_add']);
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
	$(".select2").select2();
})


