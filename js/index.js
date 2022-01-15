// 页面加载完毕
$(document).ready(function(){
    browserRedirect();
    showPage("homepage_div");
})

// 浏览器css检测匹配
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsMQQ =  sUserAgent.match(/mqqbrowser/i) == "mqqbrowser";
    var bIsWeChat =  sUserAgent.match(/MicroMessenger/i)=="micromessenger";

	if (!(bIsMQQ || bIsWeChat || bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
		//电脑端
		//加载css
		var linkNode = document.createElement("link");
		linkNode.setAttribute("rel","stylesheet");
		linkNode.setAttribute("type","text/css");
		linkNode.setAttribute("href","css/index.css");
		document.head.appendChild(linkNode);
		//加载js
		//var scriptNode = document.createElement("script");
		//scriptNode.setAttribute("type", "text/javascript");
		//scriptNode.setAttribute("src", "../../js/index.min.js");
		//document.head.appendChild(scriptNode);
	} else {
		//手机端
		//加载css
		var oMeta = document.createElement('meta');
		oMeta.name = 'viewport';
		oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no';
		document.getElementsByTagName('head')[0].appendChild(oMeta);
		var linkNode = document.createElement("link");
		linkNode.setAttribute("rel","stylesheet");
		linkNode.setAttribute("type","text/css");
        linkNode.setAttribute("href","css/index_phone.css");
		//linkNode.setAttribute("href","css/index_phone.css");
		document.head.appendChild(linkNode);
	}
}

// 显示页面
function showPage(pageId) {
    var idArr = ["homepage_div", "add_div", "use_div"];

    for(var i = 0; i < idArr.length; i++) {
        if(idArr[i] == pageId) {
            $("#" + pageId).show();
        } else {
            $("#" + idArr[i]).hide();
        }
    }

    if(pageId == "homepage_div") {
        showEventList();
    } else if(pageId == "use_div") {
        useAA(0);
        $('#event_select').on('change', function(){
            var index = $("#event_select").get(0).selectedIndex;
            console.log("index:" + index);
            useAA(index);
        });
    }
}

// 显示已经存在的AA事件列表
function showEventList() {
    // 清空
    $("#event_list").text("");
    $("#event_select").text("");

    for(var i = 0; i < event_list["event"].length; i++) {
        var event_li = document.createElement("div");
        var ico = document.createElement("img");
        var event_name = document.createElement("span");

        ico.src = "../img/" + event_list["event"][i].ico;
        ico.style.width = "30%";
        event_name.innerHTML = event_list["event"][i].name;

        event_li.id = event_list["event"][i].id;
        event_li.style.border = "1px solid #cfcfcf";
        event_li.appendChild(ico);
        event_li.appendChild(event_name);
        event_li.onclick = function() {
            console.log(this.id);
            joinAA(this.id);
        };

        $("#event_list").append(event_li);

        $("#event_select").append("<option>"+event_list["event"][i].name+"</option>");
    }
}

// 加入AA事件
function joinAA(id) {
    console.log(id);
}

// 使用AA蓄钱池
function useAA(id) {
    console.log(id);
}

// 发起AA
function launchAA() {
    var event_name = $("#event_name_add_div").val();
    var once_money = $("#once_money_add_div").val();
    var end_time = $("#end_time_add_div").val();
    console.log(once_money);

    var data = {
        "id": event_list["event"].length,
        "name": event_name,
        "ico": "ico.png",
        "once_money": once_money,
        "all_money": 0,
        "surplus_money": 0,
        "end_time": end_time,
        "participants": [
        ]
    };

    event_list["event"].push(data);
}