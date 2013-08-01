var winWidth;
var winHeight;
var storage = window.localStorage; 
var myDate;
var myYear;
var myMonth;
var salaryFArray = [],salarySArray=[],cutFArray = [],taxFArray = [];
var w=220;
var h;
var dataCount;

function onDeviceReady() {
       document.addEventListener("backbutton", function(){//返回键 
		window.location.href="login_main.html";
		}, false);
}

$(function(){
	winWidth = $(window).width();
	winHeight = $(window).height();
	myDate = new Date();
	myYear = myDate.getFullYear();
	myMonth = myDate.getMonth() + 1;
	$('body').height(winHeight);
	$('body').width(winWidth);
	$("#salary").css("left",winWidth/2-40);
	$("#test_default").css("width","120px");
    $('body').showLoading();
	viewModel.salaryInfoLoad();
	$("thead").click(function(){
		if($(this).index("thead") == 0){
			if($(this).next().css("display")=="none"){
				$(this).css("background-image","url(../img/up.png)");
				$(this).next().css("display","block")
			}else{
				$(this).css("background-image","url(../img/up_02.png)");
				$(this).next().css("display","none")
			}
		}else{
			if($(this).next().css("display")=="none"){
				$(this).css("background-image","url(../img/down_02.png)");
				$(this).next().css("display","block")
			}else{
				$(this).css("background-image","url(../img/down.png)");
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
	var demo = $('#demo').val();
	if (!($("#demo_"+demo).length))
        demo = 'default';
	$("#demo_" + demo).show();
	$('#test_'+demo).val('').scroller('destroy').scroller($.extend(opt["date"], { theme: "android", mode: "scroller", display: "modal", lang: "" }));
	document.addEventListener("deviceready", onDeviceReady, false);
});

var viewModel = {
					salary: ko.observable(),
					salaryA: ko.observable(),
					salaryF: ko.observable(),
					salaryS: ko.observable(),
					cutA: ko.observable(),
					cutF: ko.observable(),
					cutS: ko.observable(),
					taxA: ko.observable(),
					taxF: ko.observable(),
					taxS: ko.observable(),
					deliverdate: ko.observable(),
					yearmonth: ko.observable(),
					salaryInfoLoad: function(){
						
						var xmlHttp = new XMLHttpRequest();
						xmlHttp.open("GET","http://202.121.64.37/salary/?m=salary.get&staffNo="+storage.getItem("user")+"&year="+myYear+"&month="+myMonth,true);
						xmlHttp.onreadystatechange = function () {
							if (xmlHttp.readyState == 4) {
                                if (xmlHttp.status == 200) {
                                    var data = xmlHttp.responseText;
                                    var sala = eval("(" + data + ")");
                                    if (sala.Code==0) {
                                        viewModel.salary((sala.Data.ShiFaGongZi).toFixed(2));
                                        viewModel.salaryA((sala.Data.YingFaGongZi).toFixed(2));
                                        viewModel.salaryF((sala.Data.CaiZhengGongZi).toFixed(2));
                                        viewModel.salaryS((sala.Data.XueXiaoGongZi).toFixed(2));
                                        viewModel.cutA((sala.Data.YingKouKuanXiang).toFixed(2));
                                        viewModel.cutF((sala.Data.CaiZhengKouKuan).toFixed(2));
                                        viewModel.cutS((sala.Data.XueXiaoKouKuan).toFixed(2));
                                        viewModel.taxA((sala.Data.YingJiaoShuiShou).toFixed(2));
                                        viewModel.taxF((sala.Data.CaiZhengShuiShou).toFixed(2));
                                        viewModel.taxS((sala.Data.XueXiaoShuiShou).toFixed(2));
                                        if (sala.Data.DeliverDate != null) {
                                        	var dlvdate = sala.Data.DeliverDate;
                                        	var dlvDate = dlvdate.replace("-", ".").replace("-", ".");
                                        	viewModel.deliverdate(dlvDate);
                                        }
                                        else {
                                        	viewModel.deliverdate("");
                                        }
                                        var date=sala.Data.YearMonth;
                                        var Date=date.replace("-", "年") + "月";
                                        viewModel.yearmonth(Date);
                                        $('body').hideLoading();
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
					salaryList : ko.observableArray(),
					salaryFInfoLoad : function(){//加载全部新闻列表
						viewModel.salaryList('');
						var xhr = new XMLHttpRequest();
						xhr.open("GET"," http://202.121.64.37/salary/?m=salary.CaiZhengGongZi&staffNo="+storage.getItem("user")+"&year="+myYear+"&month="+myMonth,true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											salaryFArray.push({prjName:data.Data[i].PrjName,number:(data.Data[i].Number).toFixed(2)+"元"});
											dataCount = data.Data.length + 1;
										}
										viewModel.salaryList(salaryFArray);
										// $('body').hideLoading();
									}
									else {
										// $('body').hideLoading();
										showDataError();
									}
								}
								else {
									// $('body').hideLoading();
									showNetError();
								}
							}
						};
						xhr.send(null);
					},
					salarySInfoLoad : function(){//加载全部新闻列表
						viewModel.salaryList('');
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/salary/?m=salary.XueXiaoGongZi&staffNo="+storage.getItem("user")+"&year="+myYear+"&month="+myMonth,true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											salarySArray.push({prjName:data.Data[i].PrjName,number:(data.Data[i].Number).toFixed(2)+"元"});
											dataCount = data.Data.length + 1;
										}
										viewModel.salaryList(salarySArray);
										// $('body').hideLoading();
									}
									else {
										// $('body').hideLoading();
										showDataError();
									}
								}
								else {
									// $('body').hideLoading();
									showNetError();
								}
							}
						};
						xhr.send(null);
					},
					cutFInfoLoad : function(){//加载全部新闻列表
						viewModel.salaryList('');
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/salary/?m=salary.CaiZhengKouKuan&staffNo="+storage.getItem("user")+"&year="+myYear+"&month="+myMonth,true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											cutFArray.push({prjName:data.Data[i].PrjName,number:(data.Data[i].Number).toFixed(2)+"元"});
											dataCount = data.Data.length + 1;
										}
										viewModel.salaryList(cutFArray);
										// $('body').hideLoading();
									}
									else {
										// $('body').hideLoading();
										showDataError();
									}
								}
								else {
									// $('body').hideLoading();
									showNetError();
								}
							}
						};
						xhr.send(null);
					},
					taxFInfoLoad : function(){//加载全部新闻列表
						viewModel.salaryList('');
						var xhr = new XMLHttpRequest();
						xhr.open("GET","http://202.121.64.37/salary/?m=salary.CaiZhengShuiShou&staffNo="+storage.getItem("user")+"&year="+myYear+"&month="+myMonth,true);
						xhr.onreadystatechange = function(){
							if (xhr.readyState==4){
								if (xhr.status==200){
									var data = JSON.parse(xhr.responseText);
									if(data.Code==0)
									{
										for(var i = 0; i < data.Data.length; i++)
										{
											taxFArray.push({prjName:data.Data[i].PrjName,number:(data.Data[i].Number).toFixed(2)+"元"});
											dataCount = data.Data.length + 1;
										}
										viewModel.salaryList(taxFArray);
										// $('body').hideLoading();
									}
									else {
										// $('body').hideLoading();
										showDataError();
									}
								}
								else {
									// $('body').hideLoading();
									showNetError();
								}
							}
						};
						xhr.send(null);
					}
				};
ko.applyBindings(viewModel);


function showDlg(val)
{
	//显示遮盖的层
	var objDeck = document.getElementById("deck");
	if(!objDeck)
	{
		objDeck = document.createElement("div");
		objDeck.id="deck";
		document.body.appendChild(objDeck);
	}
	objDeck.className="showDeck";
	objDeck.style.filter="alpha(opacity=50)";
	objDeck.style.opacity=40/100;
	objDeck.style.MozOpacity=40/100;
	//显示遮盖的层end
	
	//禁用select
	hideOrShowSelect(true);
	
	//改变样式
	document.getElementById('divBox').className='showDlg';
	
	//调整位置至居中
	adjustLocation();
	alert(val);
	switch(val){
		case 1: salarySArray=[];
				cutFArray=[];
				taxFArray=[];
				if(salaryFArray.length == 0) {
					viewModel.salaryFInfoLoad();
				}
				else{
					viewModel.salaryList(salaryFArray);
				}
				h = 30*dataCount;
				$("#table1").css("height",h);
				$("#salaryInfo").text("财政工资");
				break;
		case 2: salaryFArray=[];
				cutFArray=[];
				taxFArray=[];
				if(salarySArray.length == 0) {
					viewModel.salarySInfoLoad();
				}
				else{
					viewModel.salaryList(salarySArray);
				}
				h = 30*dataCount;
				$("#table1").css("height",h);
				$("#salaryInfo").text("学校工资");
				break;
		case 3: salaryFArray=[];
				salarySArray=[];
				taxFArray=[];
				if(cutFArray.length == 0) {
					viewModel.cutFInfoLoad();
				}
				else{
					viewModel.salaryList(cutFArray);
				}
				h = 30*dataCount;
				$("#table1").css("height",h);
				$("#salaryInfo").text("财政扣款");
				break;
		case 4: salaryFArray=[];
				salarySArray=[];
				cutFArray=[];
				if(taxFArray.length == 0) {
					viewModel.taxFInfoLoad();
				}
				else{
					viewModel.salaryList(taxFArray);
				}
				h = 30*dataCount;
				$("#table1").css("height",h);
				$("#salaryInfo").text("财政税收");
				break;
	}

	
}

function cancel()
{
	document.getElementById('divBox').className='hideDlg';
	document.getElementById("deck").className="hideDeck";
	hideOrShowSelect(false);
	dataCount = 0;
	salarySArray=[];
	salaryFArray=[];
	cutFArray=[];
	taxFArray=[];
}

function hideOrShowSelect(v)
{
	var allselect = document.getElementsByTagName("select");
	for (var i=0; i<allselect.length; i++)
	{
		//allselect[i].style.visibility = (v==true)?"hidden":"visible";
		allselect[i].disabled =(v==true)?"disabled":"";
	}
}

function adjustLocation()
{
	var obox=document.getElementById('divBox');
	if (obox !=null && obox.style.display !="none")
	{
		var w=260;
		var h=240;
		var oLeft,oTop;
		
		if (window.innerWidth)
		{
			oLeft=window.pageXOffset+(window.innerWidth-w)/2 +"px";
			oTop=window.pageYOffset+(window.innerHeight-h)/2 +"px";
		}
		else
		{
			var dde=document.documentElement;
			oLeft=dde.scrollLeft+(dde.offsetWidth-w)/2 +"px";
			oTop=dde.scrollTop+(dde.offsetHeight-h)/2 +"px";
		}
		
		obox.style.left=oLeft;
		obox.style.top=oTop;
	}
}

function forChange(ele){  
	//alert(ele.value);
	var date = ele.value;
	myYear = date.substring(0,4);
	myMonth = date.substring(5,7);
	if (myMonth[0]==0){
		myMonth = myMonth.substring(1);
	}
	$('body').showLoading();
	viewModel.salaryInfoLoad();	
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
