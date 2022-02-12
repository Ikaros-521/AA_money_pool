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

var event_id = 0;
var username = "A";

// 显示页面
function showPage(pageId, data) {
    var idArr = ["homepage_div", "add_div", "use_div", "join_div"];

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
    } else if(pageId == "join_div") {
        event_id = data;
        console.log("event_id:" + event_id);
        $("#event_name_join_div").html(event_list["event"][event_id].name);
        $("#all_money_join_div").html(event_list["event"][event_id].all_money);
        $("#once_money_join_div").html(event_list["event"][event_id].once_money);
        $("#end_time_join_div").html(event_list["event"][event_id].end_time);

        $('#storeBtn_join_div').on('click', function(){
            var data = {name: $("#name_join_div").val(), use: 0};
            event_list["event"][event_id]["participants"].push(data);
            event_list["event"][event_id]["all_money"] = parseInt(event_list["event"][event_id]["all_money"]) + 
                parseInt(event_list["event"][event_id].once_money);
            console.log("加入成功!");
            show_hide_tip("成功加入 " + event_list["event"][event_id].name, 3000);
            // 更新新的总金额
            $("#all_money_join_div").html(event_list["event"][event_id].all_money);
            console.log(event_list);
        });
    }
}

// 显示隐藏tip_div 提示框 str为显示的字符串,time为显示时长
function show_hide_tip(str, time) {
    $("#tip_div").show(1000);
    $("#tip_span").text(str);
    setTimeout(function(){$("#tip_div").hide(1000);}, time);
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
        var once_money = document.createElement("span");
        var all_money = document.createElement("span");

        ico.src = "../img/" + event_list["event"][i].ico;
        ico.style.width = "30%";
        event_name.innerHTML = event_list["event"][i].name;
        event_name.style.width = "30%";
        once_money.innerHTML = "单存" + event_list["event"][i].once_money;
        once_money.style.width = "20%";
        all_money.innerHTML = "总额" + event_list["event"][i].all_money;
        all_money.style.width = "20%";

        event_li.id = event_list["event"][i].id;
        event_li.style.border = "1px solid #cfcfcf";
        event_li.style.borderRadius = "3px";
        event_li.style.height = "20%";
        event_li.style.display = "flex";
        event_li.style.background = "aliceblue";
        event_li.style.padding = "10px";
        event_li.style.margin = "10px";

        event_li.appendChild(ico);
        event_li.appendChild(event_name);
        event_li.appendChild(once_money);
        event_li.appendChild(all_money);

        event_li.onclick = function() {
            console.log(this.id);
            showPage("join_div", this.id);
        };

        $("#event_list").append(event_li);

        $("#event_select").append("<option>"+event_list["event"][i].name+"</option>");
    }
}

// 使用AA蓄钱池
function useAA(id) {
    console.log(id);

    $("#surplus_money_use_div").html(event_list["event"][id].surplus_money);
    
    var use_money = 0;
    for(var i = 0; i < event_list["event"][id]["participants"].length; i++) {
        console.log("name[" + i + "]:" + event_list["event"][id]["participants"][i].name);

        if(event_list["event"][id]["participants"][i].name == username) {
            use_money = event_list["event"][id]["participants"][i].use;
            
            break;
        }
    }

    $("#use_money_use_div").html(use_money);
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

    show_hide_tip("成功发起 " + event_name, 3000);

    showPage("homepage_div");
}