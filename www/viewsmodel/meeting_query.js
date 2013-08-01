var winWidth;
var winHeight;
var storage = window.localStorage;

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
	viewModel.meetingInfoLoad();	
	// $("thead").click(function() {
		// console.log("thead");
		// if ($(this).next().css("display") == "none") {
			// $(this).css("background-image", "url(../img/up.png)");
			// $(this).next().css("display", "block")
		// } else {
			// $(this).css("background-image", "url(../img/up_02.png)");
			// $(this).next().css("display", "none")
		// }
	// });
	document.addEventListener("deviceready", onDeviceReady, false);
});

function foldAndUnfold(des){
	console.log("thead_func");
	if ($(des).next().css("display") == "none") {
		$(des).css("background-image", "url(../img/up.png)");
		$(des).next().css("display", "block")
	} else {
		$(des).css("background-image", "url(../img/up_02.png)");
		$(des).next().css("display", "none")
	}
};


var viewModel = {

	datas : ko.observableArray(),
	title : ko.observable(),

	meetingInfoLoad : function() {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", "http://202.121.64.37/meeting/?m=meeting.list", true);

		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					var dataString = xmlHttp.responseText;
					var meetingData = JSON.parse(dataString);

					if (meetingData.Code == 0) {
						var meetingArray = meetingData.Data;

						var titleStr = meetingArray[0].SchoolYear + "学年 第" + meetingArray[0].Term + "学期 第" + meetingArray[0].MeetWeekNo + "周会议通知";
						viewModel.title(titleStr);
						
						for (var i = 0; i < meetingArray.length; i++) {

							var currentTime = new Date();

							var startDate = new Date();
							var startDateStr = new String(meetingArray[i].MeetDate);
							startDateStr = startDateStr.substring(startDateStr.indexOf("(") + 1, startDateStr.indexOf(")"));
							startDate.setTime(startDateStr);

							var startTime = new Date();
							var startTimeStr = new String(meetingArray[i].MeetTime);
							startTimeStr = startTimeStr.substring(startTimeStr.indexOf("(") + 1, startTimeStr.indexOf(")"));
							startTime.setTime(startTimeStr);

							var endTime = new Date();
							var endTimeStr = new String(meetingArray[i].MeetEndTime);
							endTimeStr = endTimeStr.substring(endTimeStr.indexOf("(") + 1, endTimeStr.indexOf(")"));
							endTime.setTime(endTimeStr);

							if (startDate.getMonth() != currentTime.getMonth() || startDate.getDate() != currentTime.getDate()) {
								meetingArray[i].timeForShort = (startDate.getMonth() + 1) + "月" + startDate.getDate() + "日";
							} else {
								meetingArray[i].timeForShort = startTime.getHours() + ":" + startTime.getMinutes();
							}
							console.log(meetingArray[i].timeForShort);

							var fullTime = startDate.getFullYear() + "年" + (startDate.getMonth() + 1) + "月" + startDate.getDate() + "日";
							var week = meetingArray[i].Week;
							switch (week) {
								case 0:
									fullTime += "（周日）";
									break;
								case 1:
									fullTime += "（周一）";
									break;
								case 2:
									fullTime += "（周二）";
									break;
								case 3:
									fullTime += "（周三）";
									break;
								case 4:
									fullTime += "（周四）";
									break;
								case 5:
									fullTime += "（周五）";
									break;
								case 6:
									fullTime += "（周六）";
									break;
								case 7:
									fullTime += "（周日）";
									break;
							}
							fullTime += " " + startTime.getHours() + ":" + startTime.getMinutes() + "-" + endTime.getHours() + ":" + endTime.getMinutes();
							meetingArray[i].fullTime = fullTime;
							console.log(fullTime);
							
							
							if (meetingArray[i].Content.length > 14)
								meetingArray[i].ContentForShort = meetingArray[i].Content.substring(0, 13) + "...";
							else
								meetingArray[i].ContentForShort = meetingArray[i].Content;
							
							viewModel.datas.push(new Data(meetingArray[i]));
						}

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