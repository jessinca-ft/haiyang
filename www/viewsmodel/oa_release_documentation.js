var winWidth;
var winHeight;
var storage = window.localStorage; 

function onDeviceReady() {
       document.addEventListener("backbutton", function(){//返回键 
		window.location.href="login_main.html";
		}, false);
}

$(function(){
	winWidth = $(window).width();
	winHeight = $(window).height();
	$('body').height(winHeight);
	$('body').width(winWidth);
	//$('body').showLoading();
	$("#release").css("left",winWidth/2-10);
	$("#dialog_content").css("left",winWidth/2-150);
	$("#dialog_content").css("top",winHeight*0.35-120);
	//viewModel.salaryInfoLoad();
	$("thead").click(function(){
        if($(this).next().css("display")=="none"){
            $(this).css("background-image","url(../img/up.png)");
            $(this).next().css("display","block")
        }else{
            $(this).css("background-image","url(../img/up_02.png)");
            $(this).next().css("display","none")
        }
	});
	document.addEventListener("deviceready", onDeviceReady, false);
});

function showSuggestionDialog(){
	$("#dialog").css("visibility","visible");
}

function closeSuggestionDialog(){
	$("#dialog").css("visibility","hidden");
}

function showDataError() {
	navigator.notification.alert(
		'获取数据失败',  // message
		null,         	// callback
		'错误',        // title
		'确定'        // buttonName
	);
}

function showNetError() {
	navigator.notification.alert(
        '网络连接错误',  // message
        null,         	// callback
        '错误',        // title
        '确定'        // buttonName
    );
}