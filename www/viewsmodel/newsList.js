var newsScroll,contentScroll,announcementScroll,infoScroll,academicForumScroll,academicForumInfo,schoolIntroScroll;
var newsPageIndex1=1,newsPageIndex2 = 1,newsPageIndex3 = 1,newsPageIndex4 = 1,newsPageIndex5 = 1,newsPageIndex6 = 1,announcementPageIndex=1,academicForumPageIndex=1;
var newsId,announcementId,academicForumId,topID;
var newsArray = [],carouselArray=[],newsXyhdArray = [],newsYxdtArray = [],newsDwjlArray = [],newsGjjlArray = [],newsJxkyArray = [],announcementArray = [],academicForumArray=[];
var winHeight,winWidth;
var currentTab = 0;
var newsType = 1;
var isFirst = true;
var enableClick = true;
var isRoot = true;
var isNewslist;
var headClick = false;
var secs = 30;
var isNewsCount = false;
var deviceString;
var my_media = null;
var mediaTimer = null;

function loaded() {//初始化iScroll
	var pullUpEl = document.getElementById('newsPullUp');	
	var pullUpOffset = pullUpEl.offsetHeight;
	newsScroll = new iScroll('wrapper',{
						    hScrollbar: false,
						    vScrollbar: false,
							onRefresh: function () {
								if (pullUpEl.className.match('loading')) {
									pullUpEl.className = '';
								}
							},
							onScrollMove: function () {
								if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
									pullUpEl.className = 'flip';
									this.maxScrollY = this.maxScrollY;
								} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
									pullUpEl.className = '';
									this.maxScrollY = pullUpOffset;
								}
							},
                            onScrollEnd: function () {
							    if (pullUpEl.className.match('flip')) {
									pullUpEl.className = 'loading';
									switch(newsType){
										case 1: ViewModel.newsInfoLoad();
												break;
										case 2: 
												ViewModel.newsXyhdLoad();
												
												
												break;
										case 3: 
												ViewModel.newsYxdtLoad();
												
												break;
										case 4: 
												ViewModel.newsGjjlLoad();
												
												
												break;
										case 5: 
												ViewModel.newsJxkyLoad();
												
												
												break;
										case 6: 
												ViewModel.newsDwjlLoad();
												
												break;
									}
								}
                            }
						});
	contentScroll = new iScroll('contentWrapper',{
                            hScrollbar: false,
						    vScrollbar: false
						});
	var pullUpEl1 = document.getElementById('announcementPullUp');	
	var pullUpOffset1 = pullUpEl1.offsetHeight;
	announcementScroll = new iScroll('announcementWrapper',{
                            hScrollbar: false,
						    vScrollbar: false,
							onRefresh: function () {
								if (pullUpEl1.className.match('loading')) {
									pullUpEl1.className = '';
								}
							},
							onScrollMove: function () {
								if (this.y < (this.maxScrollY - 5) && !pullUpEl1.className.match('flip')) {
									pullUpEl1.className = 'flip';
									this.maxScrollY = this.maxScrollY;
								} else if (this.y > (this.maxScrollY + 5) && pullUpEl1.className.match('flip')) {
									pullUpEl1.className = '';
									this.maxScrollY = pullUpOffset1;
								}
							},
                            onScrollEnd: function () {
								if (pullUpEl1.className.match('flip')) {
									pullUpEl1.className = 'loading';
									ViewModel.announcementInfoLoad();
								}
                            }
						});
	infoScroll = new iScroll("infoScroll",{
							vScrollbar:false,
							hScrollbar:false
						});
	var pullUpEl2 = document.getElementById('academicForumPullUp');	
	var pullUpOffset2 = pullUpEl2.offsetHeight;
	academicForumScroll = new iScroll("academicForumWrapper",{
                            hScrollbar: false,
						    vScrollbar: false,
							onRefresh: function () {
								if (pullUpEl2.className.match('loading')) {
									pullUpEl2.className = '';
								}
							},
							onScrollMove: function () {
								if (this.y < (this.maxScrollY - 5) && !pullUpEl2.className.match('flip')) {
									pullUpEl2.className = 'flip';
									this.maxScrollY = this.maxScrollY;
								} else if (this.y > (this.maxScrollY + 5) && pullUpEl2.className.match('flip')) {
									pullUpEl2.className = '';
									this.maxScrollY = pullUpOffset2;
								}
							},
                            onScrollEnd: function () {
								if (pullUpEl2.className.match('flip')) {
									pullUpEl2.className = 'loading';
									ViewModel.academicForumInfoLoad();	// Execute custom function (ajax call?)
								}
                            }
						});
	academicForumInfo = new iScroll("academicForumInfo",{
							vScrollbar:false,
							hScrollbar:false
						});
	schoolIntroScroll = new iScroll("schoolIntroScroll",{
							vScrollbar:false,
							hScrollbar:false
						});
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

function onDeviceReady() {
		deviceString = device.platform;
		document.addEventListener("backbutton", function(){//返回键 
		if(isRoot){
			navigator.notification.confirm( '你确定退出程序吗？', 
										function(button){ 
											if(button == '1') 
											{ 
												navigator.app.exitApp() 
											} 
										},'退出','确定,取消'); 
		}else{
			ViewModel.backList();
		}
		}, false);
		
		if(deviceString=="Android"){
			$(".footer_tab_box").height("65px");
			$("#schoolfooter").height("35px");
			$(".tab_indicate").css({"height":"32px","width":"64px"});
			var tab_indicate_left = winWidth/2 - 32;
			$(".tab_indicate").css("left",tab_indicate_left);
		}else{
			$(".footer_tab_box").height("90px");
			$("#schoolfooter").height("55px");
			$(".tab_indicate").css({"height":"50px","width":"100px"});
			var tab_indicate_left = winWidth/2 - 50;
			$(".tab_indicate").css("left",tab_indicate_left);
		}
}
//判断是否图片加载完成
function Imagess(url,imgObj,index){    
    var img=new Image();
	img.src=url;
	if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        imgObj.src = img.src;
        return; // 直接返回，不用再处理onload事件
    }
    imgObj.src = "../img/loading.png";
    img.onload = function () { //图片下载完毕时异步调用callback函数。
        imgObj.src = img.src;//将回调函数的this替换为Image对象
        if(index==1)
			contentScroll.refresh();
		else if(index==2)
			infoScroll.refresh();
		else if(index==3)
			academicForumInfo.refresh();
    };
}


function showNews() {
    isNewsCount = true;
    secs = 5;
    headClick = false;
    if (isNewslist==true) {
        ViewModel.getNewsCount();
    }
}

function hideNews() {
    if (isNewsCount==true) {
        if (secs==0) {
            $(".head_news_box").slideUp("slow");
            isNewsCount = false;
        }
        else{
            secs = secs-1;
        }
    }
}

function funcTime() {
    window.setInterval("showNews()",10*60*1000);
    window.setInterval("hideNews()",1000);
}

window.onload = funcTime;

$(function(){
    //playAudio("../root/beep.wav");
	winWidth = $(window).width();
	winHeight = $(window).height();
	$("#tc").width(winWidth);
	$("#tc").height(winHeight);
	$('body').height(winHeight);
	$('body').width(winWidth);
	$('body').showLoading();
	ViewModel.carouselLoad();
	ViewModel.newsInfoLoad();
	$("#xyxw").css("left",winWidth/2-40);
	$("#newsContent").height(winHeight-40);
	$("#announcementWrapper").css("top",$("#header").height());
	$("#academicForumWrapper").css("top",$("#header").height());
	$("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
	$("#introImg").width(winWidth/2);
    $("#leaderImg01").width("auto");
    $("#leaderImg02").width("auto");
    $("#leaderImg03").width("auto");
    $("#leaderImg04").width("auto");
    $("#leaderImg05").width("auto");
    $("#leaderImg06").width("auto");
    $("#leaderImg07").width("auto");
    $("#leaderImg01").height(winHeight/4);
    $("#leaderImg02").height(winHeight/4);
    $("#leaderImg03").height(winHeight/4);
    $("#leaderImg04").height(winHeight/4);
    $("#leaderImg05").height(winHeight/4);
    $("#leaderImg06").height(winHeight/4);
    $("#leaderImg07").height(winHeight/4);
	$(".tab_indicate").click(function(){
		$(".footer_tab_box").slideDown("fast");
		$(this).hide();
		$("#tc").show();
		enableClick = false;
	});
	$("#tc").click(function(){
		$(".footer_tab_box").slideUp("fast");
		$(".tab_indicate").show("fast");
		$("#tc").hide();
		enableClick = true;
	});
	$(".head_news_box").click(function(){
        headClick = true;
        isNewsCount = false;
		$(".head_news_box").slideUp("fast");
        newsPageIndex1=1;
        newsArray=[];
        changeTab(1);
        $("#tab_all").css("color","#69beff");
        $("#tab_all").siblings().css("color","#fff");
	});
	$(".tab_txt").click(function(){
		$(this).css("color","#69beff");
		$(this).siblings().css("color","#fff");
		$(".footer_tab_box").slideUp("fast");
		$(".tab_indicate").show("fast");
		$("#tc").hide();
		enableClick = true;
	});
	document.addEventListener("deviceready", onDeviceReady, false);
    isNewslist = true;
});

function changeTab(val){// 1 全部；2 校园活动； 3 院系动态；4 国际交流；5 教学科研；6 对外交流
	switch(val){
		case 1: newsType = 1;
				if(newsArray.length == 0){
					isFirst = true;
					ViewModel.newsInfoLoad();
					$('body').showLoading();
				}else{
				//ViewModel.carouselPic([newsArray[0],newsArray[1],newsArray[2]]);
				//$('.carousel').carousel();
				//$(".item").height(winHeight/3);
					ViewModel.newsList(newsArray);
					newsScroll.refresh();
				}
                isNewslist = true;
			    break;
		case 2: newsType = 2;
				if(newsXyhdArray.length == 0){
					//newsBoolean = true;
					isFirst = true;
					ViewModel.newsXyhdLoad();
					$('body').showLoading();
				}
				else{
					//ViewModel.carouselPic([newsXyhdArray[0],newsXyhdArray[1],newsXyhdArray[2]]);
					//$('.carousel').carousel();
					//$(".item").height(winHeight/3);
					ViewModel.newsList(newsXyhdArray);
					newsScroll.refresh();
				}
                isNewslist = true;
			    break;
		case 3: newsType = 3;
				if(newsYxdtArray.length == 0){
					//newsBoolean = true;
					isFirst = true;
					ViewModel.newsYxdtLoad();
					$('body').showLoading();
				}
				else{
					//ViewModel.carouselPic([newsYxdtArray[0],newsYxdtArray[1],newsYxdtArray[2]]);
					//$('.carousel').carousel();
					//$(".item").height(winHeight/3);
					ViewModel.newsList(newsYxdtArray);
					newsScroll.refresh();
				}
                isNewslist = true;
			    break;
		case 4: newsType = 4;
				if(newsDwjlArray.length == 0){
					//newsBoolean = true;
					isFirst = true;
					ViewModel.newsDwjlLoad();
					$('body').showLoading();
				}
				else{
					//ViewModel.carouselPic([newsDwjlArray[0],newsDwjlArray[1],newsDwjlArray[2]]);
					//$('.carousel').carousel();
					//$(".item").height(winHeight/3);
					ViewModel.newsList(newsDwjlArray);
					newsScroll.refresh();
				}
                isNewslist = true;
			    break;
		case 5: newsType = 5;
				if(newsGjjlArray.length == 0){
					//newsBoolean = true;
					isFirst = true;
					ViewModel.newsGjjlLoad();
					$('body').showLoading();
				}
				else{
					//ViewModel.carouselPic([newsGjjlArray[0],newsGjjlArray[1],newsGjjlArray[2]]);
					//$('.carousel').carousel();
					//$(".item").height(winHeight/3);
					ViewModel.newsList(newsGjjlArray);
					newsScroll.refresh();
				}
                isNewslist = true;
			    break;
		case 6: newsType = 6;
				if(newsJxkyArray.length == 0){
					//newsBoolean = true;
					isFirst = true;
					ViewModel.newsJxkyLoad();
					$('body').showLoading();
				}
				else{
					//ViewModel.carouselPic([newsJxkyArray[0],newsJxkyArray[1],newsJxkyArray[2]]);
					//$('.carousel').carousel();
					//$(".item").height(winHeight/3);
					ViewModel.newsList(newsJxkyArray);
					newsScroll.refresh();
				}
                isNewslist = true;
			    break;
	}
}

function schoolTab(val){
    switch(val){
        case 1:
            $("#schoolDZLD").hide();
            $("#schoolAbstruct").show();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").show();
            schoolIntroScroll.refresh();
            break;
        case 2:
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").show();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").show();
            schoolIntroScroll.refresh();
            break;
        case 3:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").show();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 4;
            break;
        case 4:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").show();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 5;
            break;
        case 5:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").show();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 6;
            break;
        case 6:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").show();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 7;
            break;
        case 7:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").show();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 8;
            break;
        case 8:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").show();
            $("#leaderAbstruct07").hide();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 9;
            break;
        case 9:
			isRoot = false;
            $(".footer_tab_box").hide("fast");
            $(".tab_indicate").hide("fast");
            $("#tc").hide();
            $("#schoolAbstruct").hide();
            $("#schoolDZLD").hide();
            $("#leaderAbstruct01").hide();
            $("#leaderAbstruct02").hide();
            $("#leaderAbstruct03").hide();
            $("#leaderAbstruct04").hide();
            $("#leaderAbstruct05").hide();
            $("#leaderAbstruct06").hide();
            $("#leaderAbstruct07").show();
            $("#nav_menu").hide();
            $("#nav_site_header #btn").show();
            $("#nav_site_header #logo").hide();
            $("#xyxw").text("党政领导");
            $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
            schoolIntroScroll.refresh();
            currentTab = 10;
            break;
            
	}
    isNewslist = false;
}

var ViewModel = {
					newsTAB : function(){//新闻 tab
						$(".footer_tab_box").hide("fast");
						$(".tab_indicate").show("fast");
						$("#tc").hide();
						enableClick = true;
						$("#bottomBar").show();
						$("#nav_menu a").removeClass("current");
						$("#nav_menu a:first").addClass("current");
						$("#newsList").show();
						$("#announcementList").hide();
						$("#academicForumList").hide();
						$("#schoolIntro").hide();
						$("#xyxw").text("校园新闻");
                        isNewslist = true;
						currentTab = 0;
						//$('.carousel').carousel();
						newsScroll.refresh();
					},
					announcementTAB : function(){//公告 tab
						if(announcementArray.length == 0)
						{
							isFirst = true;
							$('body').showLoading();
							$("#announcementPullUp").hide();
							ViewModel.announcementInfoLoad();
						}
						$("#bottomBar").hide();
						$("#nav_menu a").removeClass("current");
						$("#nav_menu li").next().children(":first").addClass("current");
						$("#newsList").hide();
						$("#announcementList").show();
						$("#academicForumList").hide();
						$("#schoolIntro").hide();
						$("#xyxw").text("校园公告");
                        isNewslist = false;
						currentTab = 1;
						announcementScroll.refresh();
					},
					academicForumTAB : function(){//学术讲坛 tab
						if(academicForumArray.length == 0){
							isFirst = true;
							$('body').showLoading();
							$("#academicForumPullUp").hide();
							ViewModel.academicForumInfoLoad();
						}
						$("#bottomBar").hide();
						$("#nav_menu a").removeClass("current");
						$("#nav_menu li").next().next().children(":first").addClass("current");
						$("#academicForumList").show();
						$("#newsList").hide();
						$("#announcementList").hide();
						$("#schoolIntro").hide();
						$("#xyxw").text("学术讲坛");
                        isNewslist = false;
						currentTab = 2;
						academicForumScroll.refresh();
					},
					schoolIntroTAB : function(){// 学校概况 tab
						$(".footer_tab_box").hide("fast");
						$(".tab_indicate").show("fast");
						$("#tc").hide();
						enableClick = true;
						$("#bottomBar").hide();
						$("#nav_menu a").removeClass("current");
						$("#nav_menu li").next().next().next().children(":first").addClass("current");
						$("#newsList").hide();
						$("#announcementList").hide();
						$("#academicForumList").hide();
						$("#schoolIntro").show();
						$("#xyxw").text("校园简介");
                        isNewslist = false;
						currentTab = 3;
						schoolIntroScroll.refresh();
					},
					//新闻部分开始
					newsList : ko.observableArray(),
					carouselPic : ko.observableArray(),
					newsInfoLoad : function(){//加载全部新闻列表
						if(!isFirst){
                            $("#newsPullUp").show();
                            if(deviceString=="Android"){
                                newsScroll.scrollTo(0, 40, 50,true);
                                newsScroll.refresh();
                            }
                            else{
                                newsScroll.scrollTo(0, 60, 500,true);
                            }
						}
                        isNewslist = true;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/News/?m=news.page&p="+newsPageIndex1+"&s=20",true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;
											if(data.Data[i].TitlePic != '' &&  data.Data[i].TitlePic != null){
												newsArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}else{
												newsArray.push({id:data.Data[i].Id,titlePic:"",title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}
										}
										newsPageIndex1++;
										isFirst = false;
										ViewModel.newsList(newsArray);
										$('body').hideLoading();
										$("#newsPullUp").hide();
										newsScroll.refresh();
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					carouselLoad : function(){//加载轮播
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/news/?m=news.index&c=3",true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;
											
											carouselArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle});
											
										}
										
										ViewModel.carouselPic(carouselArray);
										$("#carousel img").each(function(i){
											Imagess(this.src,this,0);
										 });
										//$('.carousel').carousel();
										//$(".carousel-indicators").css("top",winHeight/3-20);
										//$(".carousel-caption").css({"position":"absolute","top":winHeight/3-30,});
										$("#wrapper").css("top",winHeight/3+80);
										$('#carousel').slideBox({
											duration : 0.3,//滚动持续时间，单位：秒
											easing : 'linear',//swing,linear//滚动特效
											delay : 4,//滚动延迟时间，单位：秒
											hideClickBar : false,//不自动隐藏点选按键
											clickBarRadius : 10
										});
										$("#carousel a").css({"height":winHeight/3,"width":winWidth});
										$("#carousel img").css({"height":winHeight/3,"width":"auto"});
										
									}
								}
							}
						};
						xhr.send(null);
					},
					newsXyhdLoad : function(){//加载校园活动列表
						if(newsType == 2 && !isFirst){
							$("#newsPullUp").show();
							newsScroll.scrollTo(0, 40, 50,true);
							newsScroll.refresh();
						}
                        isNewslist = true;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/News/?m=news.page&p="+newsPageIndex2+"&s=20&newsType="+encodeURIComponent('校园活动'),true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;

											//newsXyhdArray = [],newsYxdtArray = [],newsDwjlArray = [],newsGjjlArray = [],newsJxkyArray = []
											if(data.Data[i].TitlePic != '' &&  data.Data[i].TitlePic != null){
												newsXyhdArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}else{
												newsXyhdArray.push({id:data.Data[i].Id,titlePic:"",title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}
											
										}
										newsPageIndex2++;
										isFirst = false;
										if(newsType == 2){
											ViewModel.newsList(newsXyhdArray);
											$('body').hideLoading();
											$("#newsPullUp").hide();
											newsScroll.refresh();
										}
										
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					newsYxdtLoad : function(){//加载院系动态列表
						if(newsType == 3 && !isFirst){
							$("#newsPullUp").show();
							newsScroll.scrollTo(0, 40, 50,true);
							newsScroll.refresh();
						}
                        isNewslist = true;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/News/?m=news.page&p="+newsPageIndex3+"&s=20&newsType="+encodeURIComponent('院系动态'),true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;

											//newsXyhdArray = [],newsYxdtArray = [],newsDwjlArray = [],newsGjjlArray = [],newsJxkyArray = []
											if(data.Data[i].TitlePic != '' &&  data.Data[i].TitlePic != null){
												newsYxdtArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}else{
												newsYxdtArray.push({id:data.Data[i].Id,titlePic:"",title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}
										}
										newsPageIndex3++;
										isFirst = false;
										if(newsType == 3){
											ViewModel.newsList(newsYxdtArray);
											$('body').hideLoading();
											$("#newsPullUp").hide();
											newsScroll.refresh();
										}
										
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					newsDwjlLoad : function(){//加载对外交流列表
                        isNewslist = true;
						if(newsType == 4 && !isFirst){
							$("#newsPullUp").show();
							newsScroll.scrollTo(0, 40, 50,true);
							newsScroll.refresh();
						}
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/News/?m=news.page&p="+newsPageIndex4+"&s=20&newsType="+encodeURIComponent('对外交流'),true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;
											if(data.Data[i].TitlePic != '' &&  data.Data[i].TitlePic != null){
												newsDwjlArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}else{
												newsDwjlArray.push({id:data.Data[i].Id,titlePic:"",title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}
											
										}
										newsPageIndex4++;
										isFirst = false;
										if(newsType == 4){
											ViewModel.newsList(newsDwjlArray);
											$('body').hideLoading();
											$("#newsPullUp").hide();
											newsScroll.refresh();
										}
										
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					newsGjjlLoad : function(){//加载国际交流列表
						if(newsType == 5 && !isFirst){
							$("#newsPullUp").show();
							newsScroll.scrollTo(0, 40, 50,true);
							newsScroll.refresh();
						}
                        isNewslist = true;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/News/?m=news.page&p="+newsPageIndex5+"&s=20&newsType="+encodeURIComponent('国际交流'),true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;

											//newsXyhdArray = [],newsYxdtArray = [],newsDwjlArray = [],newsGjjlArray = [],newsJxkyArray = []
											if(data.Data[i].TitlePic != '' &&  data.Data[i].TitlePic != null){
												newsGjjlArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}else{
												newsGjjlArray.push({id:data.Data[i].Id,titlePic:"",title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}
											
										}
										newsPageIndex5++;
										isFirst = false;
										if(newsType == 5){
											ViewModel.newsList(newsGjjlArray);
											$('body').hideLoading();
											$("#newsPullUp").hide();
											newsScroll.refresh();
										}
										
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					newsJxkyLoad : function(){//加载教学科研列表
						if(newsType == 6 && !isFirst){
							$("#newsPullUp").show();
							newsScroll.scrollTo(0, 40, 50,true);
							newsScroll.refresh();
						}
                        isNewslist = true;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/News/?m=news.page&p="+newsPageIndex6+"&s=20&newsType="+encodeURIComponent('教学科研'),true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].DisplayTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var displayTime = date.getFullYear() + "-" + month + "-" + currentDate;

											//newsXyhdArray = [],newsYxdtArray = [],newsDwjlArray = [],newsGjjlArray = [],newsJxkyArray = []
											if(data.Data[i].TitlePic != '' &&  data.Data[i].TitlePic != null){
												newsJxkyArray.push({id:data.Data[i].Id,titlePic:"http://www.shou.edu.cn/news_images/"+data.Data[i].TitlePic,title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}else{
												newsJxkyArray.push({id:data.Data[i].Id,titlePic:"",title:data.Data[i].NewsTitle,newsContent:data.Data[i].NewsContent,newsInscribe:data.Data[i].NewsInscribe,displayTime:displayTime});
											}
											
										}
										newsPageIndex6++;
										isFirst = false;
										if(newsType == 6){
											ViewModel.newsList(newsJxkyArray);
											$('body').hideLoading();
											$("#newsPullUp").hide();
											newsScroll.refresh();
										}
										
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					title: ko.observable(),
					content: ko.observable(),
					publishtime: ko.observable(),
					getData: function(){//获取新闻详细信息
                        isNewslist = false;
						$('body').showLoading();	
						ViewModel.title('');
						ViewModel.content('');
						ViewModel.publishtime('');
						contentScroll.refresh();
						var xmlHttp = new XMLHttpRequest();

						xmlHttp.open("GET","http://202.121.64.37/news/?m=news.get&id="+newsId,true);
				
						xmlHttp.onreadystatechange = function () {
							if (xmlHttp.readyState == 4) {
								if (xmlHttp.status == 200) {
									var data = xmlHttp.responseText;
									var newses = eval("(" + data + ")");
									if(newses.Code==0){
										ViewModel.title(newses.Data.NewsTitle);
										var sTest = newses.Data.NewsContent;
										ViewModel.content(sTest);
										var url;
										$("#contentScroller img[class!='image']").each(function(i){
											if(!(this.src.indexOf("http")>-1)){
												url = "http://www.shou.edu.cn/"+(this.src.replace("file:///",""));
											}else{
												url = this.src;
											}
											Imagess(url,this,1);
										 });
										$("#contentScroller img[class!='image']").css({"float":"left","width":winWidth,"height":"auto"});
										
										var jsondate = newses.Data.PublsihTime;
										var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
										if (jsondate.indexOf("+") > 0) {
											jsonDate = jsonDate.substring(0,jsonDate.indexOf("+"));
										}
										else if (jsondate.indexOf("-") > 0) {
											jsonDate = jsonDate.substring(0,jsonDate.indexOf("-"));
										}
										var date = new Date(parseInt(jsonDate, 10));
										var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
										var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
										var publishTime = "发布日期：" + date.getFullYear() + "-" + month + "-" + currentDate;
										ViewModel.publishtime(publishTime); 
										$(".blueBlock").css("height",$("#newsContentTitle").height());
										$("#contentWrapper").css("top",$("#newsContentTitle").height()+80);
										$("#contentWrapper").height(winHeight-$("#newsContentTitle").height()-80);
										$('body').hideLoading();	
										contentScroll.refresh();
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xmlHttp.send(null);
					},
                    newscount:ko.observable(),
                    getNewsCount:function(){
                        ViewModel.newscount('');
                        topID=newsArray[0].id;
                        var xmlHttp = new XMLHttpRequest();
						xmlHttp.open("GET","http://202.121.64.37/news/?m=news.count&id="+topID,true);
                        xmlHttp.onreadystatechange = function () {
							if (xmlHttp.readyState == 4) {
								if (xmlHttp.status == 200) {
									var data = xmlHttp.responseText;
                                    var newsCount = eval("(" + data + ")");
                                    if(newsCount.Code==0){
                                        var count = newsCount.Data + "条最新新闻";
                                        ViewModel.newscount(count);
                                        if (newsCount.Data > 0) {
                                            if(deviceString=="Android"){
                                                playAudio("file:///android_asset/www/beep.wav");
                                            }
                                            else{
                                                playAudio("beep.wav");
                                            }
                                            $(".head_news_box").slideDown("fast");
                                        }
                                    }
                                    else {
                                        showDataError();
                                    }
                                }
                                else {
                                    showNetError();
                                }
                            }
                        };
                        xmlHttp.send(null);
                    },//新闻部分结束
					//公告部分开始
					announcementList : ko.observableArray(),
					announcementTitle : ko.observable(),
					announcementReleaseTime : ko.observable(),
					announcementContent : ko.observable(),
					announcementInfoLoad : function(){//公告列表
						if(!isFirst){
							$("#announcementPullUp").show();
							announcementScroll.scrollTo(0, 40, 50,true);
							announcementScroll.refresh();
						}
                        isNewslist = false;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/bulletin/?m=bulletin.page&p="+announcementPageIndex+"&s=20",true);
						xhr.onreadystatechange=function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].ReleaseTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var releaseTime = date.getFullYear() + "-" + month + "-" + currentDate;
											announcementArray.push({id:data.Data[i].Id,title:data.Data[i].Title,content:data.Data[i].Content,releaseTime:releaseTime});
										}
										announcementPageIndex++;
										isFirst = false;
										ViewModel.announcementList(announcementArray);
										$('body').hideLoading();
										$("#announcementPullUp").hide();
										announcementScroll.refresh();
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					getAnnouncementInfo : function(){//公告详情
						$('body').showLoading();	
						ViewModel.announcementTitle('');
						ViewModel.announcementReleaseTime('');
						ViewModel.announcementContent('');
						infoScroll.refresh();
                        isNewslist = false;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/bulletin/?m=bulletin.get&id="+announcementId,true);
						xhr.onreadystatechange=function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										var jsondate = data.Data.ReleaseTime;
										var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
										var date = new Date(parseInt(jsonDate, 10));
										var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
										var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
										var releaseTime = date.getFullYear() + "-" + month + "-" + currentDate;
										ViewModel.announcementTitle(data.Data.Title);
										ViewModel.announcementReleaseTime(releaseTime);
										ViewModel.announcementContent(data.Data.Content);
										var url;
										$("#infoScroll img").each(function(i){
											if(!(this.src.indexOf("http")>-1)){
												url = "http://www.shou.edu.cn/"+(this.src.replace("file:///",""));
											}else{
												url = this.src;
											}
											Imagess(url,this,2);
										});
										$("#infoScroll img").css({"float":"left","width":winWidth,"height":"auto"});
										
										$(".blueBlock").css("height",$("#announcementContentTitle").height());
										$("#infoScroll").css("top",$("#announcementContentTitle").height()+80);
										$('body').hideLoading();	
										infoScroll.refresh();
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					//公告部分结束
					//学术讲坛开始  academicForum
					academicForumList : ko.observableArray(),
					academicForumTitle : ko.observable(),
					academicForumReleaseTime : ko.observable(),
					academicForumContent : ko.observable(),
					academicForumInfoLoad : function(){//学术讲坛列表
						if(!isFirst){
							$("#academicForumPullUp").show();
							academicForumScroll.scrollTo(0, 40, 50,true);
							academicForumScroll.refresh();
						}
                        isNewslist = false;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/xsjt/?m=xsjt.page&p="+academicForumPageIndex+"&s=20",true);
						xhr.onreadystatechange=function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											var jsondate = data.Data[i].ReleaseTime;
											var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
											var date = new Date(parseInt(jsonDate, 10));
											var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
											var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
											var releaseTime = date.getFullYear() + "-" + month + "-" + currentDate;
											academicForumArray.push({id:data.Data[i].Id,title:data.Data[i].Title,content:data.Data[i].Content,releaseTime:releaseTime,newsInscribe:data.Data[i].NewsInscribe});
										}
										academicForumPageIndex++;
										isFirst = false;
										ViewModel.academicForumList(academicForumArray);
										$('body').hideLoading();	
										$("#academicForumPullUp").hide();
										academicForumScroll.refresh();
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					getAcademicForumInfo : function(){//学术讲坛详情
						$('body').showLoading();	
						ViewModel.academicForumTitle('');
						ViewModel.academicForumReleaseTime('');
						ViewModel.academicForumContent('');
						academicForumInfo.refresh();
                        isNewslist = false;
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/xsjt/?m=xsjt.get&id="+academicForumId,true);
						xhr.onreadystatechange=function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										var jsondate = data.Data.ReleaseTime;
										var jsonDate = jsondate.replace("/Date(", "").replace(")/", "");
										var date = new Date(parseInt(jsonDate, 10));
										var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
										var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
										var releaseTime = date.getFullYear() + "-" + month + "-" + currentDate;
										ViewModel.academicForumTitle(data.Data.Title);
										ViewModel.academicForumReleaseTime(releaseTime);

										ViewModel.academicForumContent(data.Data.Content);
										var url;
										$("#academicForumInfo img").each(function(i){
											if(!(this.src.indexOf("http")>-1)){
												url = "http://www.shou.edu.cn/"+(this.src.replace("file:///",""));
											}else{
												url = this.src;
											}
											Imagess(url,this,3);
										});
										$("#academicForumInfo img").css({"float":"left","width":winWidth,"height":"auto"});
										
										$(".blueBlock").css("height",$("#academicForumContentTitle").height());
										$("#academicForumInfo").css("top",$("#academicForumContentTitle").height()+80);
										$('body').hideLoading();	
										academicForumInfo.refresh();
									}
									else {
                                        $('body').hideLoading();
                                        showDataError();
                                    }
								}
								else {
                                    $('body').hideLoading();
                                    showNetError();
                                }
							}
						};
						xhr.send(null);
					},
					//学术讲坛结束
					clickLi : function(){//点击iScroll的li事件
						isRoot = false;	
						switch(currentTab){
						case 0:
							if(enableClick){
								newsId = this.id;
								$("#bottomBar").hide();
								$("#nav_menu").hide();
								$("#newsList").hide();
								$("#newsContent").show();
								$("#nav_site_header #logo").hide();
								$("#nav_site_header #btn").show();
                                isNewslist = false;
								ViewModel.getData();
							}else{
								$(".footer_tab_box").slideUp("fast");
								$(".tab_indicate").show("fast");
								enableClick = true;
								$("#tc").hide();
							}
							break;
						case 1:
							announcementId = this.id;
							$("#nav_menu").hide();
							$("#announcementList").hide();
							$("#announcementContent").show();
							$("#nav_site_header #logo").hide();
							$("#nav_site_header #btn").show();
							$("#announcementContent").height(winHeight-$("#header").height());
                            isNewslist = false;
							ViewModel.getAnnouncementInfo();
							break;
						case 2:
							academicForumId = this.id;
							$("#nav_menu").hide();
							$("#academicForumList").hide();
							$("#academicForumContent").show();
							$("#nav_site_header #logo").hide();
							$("#nav_site_header #btn").show();
							$("#academicForumContent").height(winHeight-$("#header").height());
                            isNewslist = false;
							ViewModel.getAcademicForumInfo();
							break;
						case 3:
							break;
						}
						
					},
					backList : function(){//返回按钮事件
						isRoot = true;	
						$('body').hideLoading();
						switch(currentTab){
							case 0:
								$("#nav_menu").show();
								$("#newsList").show();
								$("#bottomBar").show();
								$("#newsContent").hide();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide();
								//$('.carousel').carousel();
                                isNewslist = true;
								break;
							case 1:
								$("#nav_menu").show();
								$("#announcementList").show();
								$("#announcementContent").hide();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide();
                                isNewslist = false;
								break;
							case 2:
								$("#nav_menu").show();
								$("#academicForumList").show();
								$("#academicForumContent").hide();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                isNewslist = false;;
								break;
							case 3:
								break;
                            case 4:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct01").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
                            case 5:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct02").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
                            case 6:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct03").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
                            case 7:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct04").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
                            case 8:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct05").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
                            case 9:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct06").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
                            case 10:
								isRoot = true;
                                $("#nav_menu").show();
								$("#leaderAbstruct07").hide();
                                $("#schoolDZLD").show();
								$("#nav_site_header #logo").show();
								$("#nav_site_header #btn").hide()
                                $("#schoolIntroScroll").css({"top":$("#header").height(),"width":winWidth-20});
                                $(".footer_tab_box").hide("fast");
                                $(".tab_indicate").show("fast");
                                $("#tc").hide();
								schoolIntroScroll.refresh();
                                isNewslist = false;;
								break;
						}
						
					},
					login : function(){
						window.location.href="login_main.html";
					}
			};
ko.applyBindings(ViewModel);

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

function playAudio(src) {
    // 从目标文件创建Media对象
    my_media = new Media(src);
    
    // 播放音频
    my_media.play();
} 
