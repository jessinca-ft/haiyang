var winWidth;
var winHeight;
var storage = window.localStorage;
var currentTab = 0;

function onDeviceReady() {
	document.addEventListener("backbutton", function() {//返回键
		window.location.href = "login_main.html";
	}, false);
}

// Class to represent a row in the seat reservations grid
function Data(data_) {
	var self = this;
	self.data = ko.observable(data_);
}

$(function() {
	winWidth = $(window).width();
	winHeight = $(window).height();
	$('body').height(winHeight);
	$('body').width(winWidth);
	$('body').showLoading();
	$("#meeting").css("left",winWidth/2-40);
	viewModel.busInfoLoad();
	$("thead").click(function(){
		if(currentTab==1){
			if($(this).next().css("display")=="none"){
				$(this).next().css("display","block")
			}else{
				$(this).next().css("display","none")
			}
		}
		else if(currentTab==2){
			if($(this).next().css("display")=="none"){
				$(this).css("background-image","url(../img/up.png)");
				$(this).next().css("display","block")
			}else{
				$(this).css("background-image","url(../img/up_02.png)");
				$(this).next().css("display","none")
			}
		}
	});	
	var curr = new Date().getFullYear();
	var opt = {
	}
	opt.date = {preset : 'date'};
	opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
	opt.time = {preset : 'time'};
	opt.tree_list = {preset : 'list', labels: ['Region', 'Country', 'City']};
	opt.image_text = {preset : 'list', labels: ['Cars']};
	opt.select = {preset : 'select'};
	//var demo1 = $('#demo').val();
	//if (!($("#demo_"+demo).length))
    var demo1 = 'default';
	$("#demo_" + demo1).show();
	$('#test_'+demo1).val('2013年7月26日').scroller('destroy').scroller($.extend(opt["date"], { theme: "android", mode: "scroller", display: "modal", lang: "" }));
	var demo2 = 'time';
	$("#demo_" + demo2).show();
	$('#test_'+demo2).val('16:30').scroller('destroy').scroller($.extend(opt["time"], { theme: "android", mode: "scroller", display: "modal", lang: "" }));
	document.addEventListener("deviceready", onDeviceReady, false);
});


var viewModel = {
	contentTAB : function(){
		$("#nav_menu a").removeClass("current");
		$("#nav_menu a:first").addClass("current");
		$("#contentList").css("display","block");
		$("#busReserveList").css("display","none");
		$("#myBusReserve").css("display","none");
		currentTab = 0;
	},
	busReserveTAB : function(){
		$("#nav_menu a").removeClass("current");
		$("#nav_menu li").next().children(":first").addClass("current");
		$("#contentList").css("display","none");
		$("#busReserveList").css("display","block");
		$("#myBusReserve").css("display","none");
		currentTab = 1;
	},
	myBusReserveTAB : function(){
		$("#nav_menu a").removeClass("current");
		$("#nav_menu li").next().next().children(":first").addClass("current");
		$("#contentList").css("display","none");
		$("#busReserveList").css("display","none");
		$("#myBusReserve").css("display","block");
		 currentTab = 2;
	},

	datas : ko.observableArray(),
	title : ko.observable(),

	busInfoLoad : function() {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", "http://202.121.64.37/bus/?m=bus.BusInfoList", true);

		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					var dataString = xmlHttp.responseText;
					var busData = JSON.parse(dataString);

					if (busData.Code == 0) {
						var busArray = busData.Data;
						
						for (var i = 0; i < busArray.length; i++) {
							
							viewModel.datas.push(new Data(busArray[i]));
						}
						alert(busArray[1].TrUpDesc);
						$('body').hideLoading();
					} else {
						$('body').hideLoading();
						showDataError();
					}
				} else {
					$('body').hideLoading();
					showNetError();
				}
			}
		}
		xmlHttp.send(null);
	}
};
ko.applyBindings(viewModel);

function jsfun()
{
   document.getElementById("ChildUL").style.display=(document.getElementById("ChildUL").style.display=='none')?'block':'none';
}

function showDataError() {
	navigator.notification.alert('获取数据失败', // message
	null, // callback
	'错误', // title
	'确定' // buttonName
	);
}

function showNetError() {
	navigator.notification.alert('网络连接错误', // message
	null, // callback
	'错误', // title
	'确定' // buttonName
	);
}