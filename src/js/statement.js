/*
 *声明——具体是怎样做的(具体实现)
 */
// 页面打开时执行的任务,输出list列表内容
function reloadList() {
    var allListId = [
        // 检索标题,列表ulID位置,列表pID输出位置
        {title: "公交",ulId: "List-traffic",pId: "Num-traffic"},
        {title: "快餐",ulId: "List-snack",pId: "Num-snack"},
        {title: "餐厅",ulId: "List-restaurant",pId: "Num-restaurant"},
        {title: "银行",ulId: "List-bank",pId: "Num-bank"},
        {title: "酒店",ulId: "List-hotel",pId: "Num-hotel"}
    ];
    for (var i = 0; i < 5; i++) {
        // 输出list内容(只输出 不打点)
        outputListContent(allListId[i].title,allListId[i].ulId,allListId[i].pId);
    }
    function outputListContent(listTile,listUlId,listP){
        var options = {
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    var length = 4;
                    if ( results.getNumPois() < 4) {
                        length = results.getNumPois();
                    }
    				for (var i = 0; i < length; i ++){
                        var listUl = document.getElementById(listUlId); // 节点文字添加
                        var li = document.createElement("li");
                        var text = results.getPoi(i).title;
                        var textnode = document.createTextNode(text);
                        var liLng = results.getPoi(i).point.lng;    // 添加经纬度值
                        var liLat = results.getPoi(i).point.lat;
                        var liAddress = results.getPoi(i).address;  // 添加地址内容
                        li.setAttribute("data-title",text);
                        // li.setAttribute("onmouseenter","liOnmouseenter(" + liLng + "," + liLat + ")");
                        li.setAttribute("onclick","liOnclick("+liLng+","+liLat+","+"\""+text+"\""+","+"\""+liAddress+"\""+")");
						// li.setAttribute("onmouseleave","liOnmouseleave()");
                        li.appendChild(textnode);
                        listUl.appendChild(li);
    				}
                    var PNum = document.getElementById(listP);      // 检索数值
                    var num = results.getCurrentNumPois();   // getNumPois()全部结果数量
                    var numnode = document.createTextNode(num);
                    PNum.appendChild(numnode);
                    //listUl.setAttribute("onmouseout","liOnmouseout()");     // listUl添加鼠标移出事件
    			}
            }
        };
        var local = new BMap.LocalSearch(mPoint,options);
        local.searchNearby(listTile, mPoint,1000);
    }
}
// 默认调用
function defaultCallLoad(){
    map.addOverlay(customMarker);      // 将中心标注   重新添加到地图中
    map.addControl(myUlListControl);    // 将控件重新添加到地图中
}
// 清空地图,重新打上中心自定义标记
function clearMapAgainMarker(){
    map.clearOverlays();    // 清理地图上面所有点
    defaultCallLoad();
}
// 单独标记(只标记不输出)
function addMarker(PointLng,PointLat) {
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    var oneMarker = new BMap.Marker(new BMap.Point(PointLng,PointLat));     // 单独标记的标记坐标
	map.addOverlay(oneMarker);         // 将标注添加到地图中
}
// list列表li 鼠标经过事件
function liOnmouseenter(liLng,liLat){
    addMarker(liLng,liLat);     // 将坐标值输入 单独标记
}
// list列表ul 鼠标移出事件
function liOnmouseleave(){
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    customMarker.setAnimation(BMAP_ANIMATION_BOUNCE);     // 设置自定义标注 跳动
    if (infoWindowMarker.point != mPoint) {
        map.addOverlay(infoWindowMarker);      // 将中心标注   重新添加到地图中
    }
}
function liOnclick(liLng,liLat,text,liAddress){
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    addInfoWindow(liLng,liLat,text,liAddress);
    infoWindowMarker.setAnimation(BMAP_ANIMATION_BOUNCE);     // 设置自定义标注 跳动
}
// 添加信息窗口实例
function addInfoWindow(liLng,liLat,text,liAddress){
    var opts = {
    	width : 350,     // 信息窗口宽度
    	height: 160,     // 信息窗口高度
    	title : text , // 信息窗口标题
        offset: new BMap.Size(0,-10),      // 信息窗口偏移
    	enableMessage: true,   //设置允许信息窗发送短息S
    };
	var infoContent = liAddress;     // 地址内容
    // 信息自定义标识
    var infoIcon = new BMap.Icon("./images/pt.png", new BMap.Size(80,80));    // 自定义标注样式
    var infoWindowMarker = new BMap.Marker(new BMap.Point(liLng,liLat),{icon:infoIcon});  // 创建信息自定义标识(将样式加入)
	map.addOverlay(infoWindowMarker);      // 将标注添加到地图中
    // 去除不需要的函数嵌套后
	infoWindowMarker.addEventListener("click",function(e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(infoContent,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
    return infoWindowMarker;
}
// list列表Btn名称
var listBtn = [$("#OutputList-traffic"),$("#OutputList-snack"),$("#OutputList-restaurant"),$("#OutputList-bank"),$("#OutputList-hotel")];
// 控件点击搜索事件（参数:检索词）
function controlLiOnclick(controlSearchLiId,index){
	clearMapAgainMarker();  // 清空地图,恢复默认调用
	map.addOverlay(circle); // 添加范围圆圈
    $("#ulList li:eq(" + index + ")").addClass("active").siblings().removeClass("active");
    // 如果非"周边房源"
    if (index != 0) {
        var options = {
    		onSearchComplete: function(results){
    			// 判断状态是否正确
    			if (local.getStatus() == BMAP_STATUS_SUCCESS){
    				for (var i = 0; i < results.getCurrentNumPois(); i ++){
    					var resultPointText = results.getPoi(i).title;        // 将检索到的点位属性保存
                        var resultPointAddress = results.getPoi(i).address;
                        var resultPointLng = results.getPoi(i).point.lng;
                        var resultPointLat = results.getPoi(i).point.lat;
                        addInfoWindow(resultPointLng,resultPointLat,resultPointText,resultPointAddress);  // 添加信息窗口
    				}
    			}
    		}
    	};
    	var local = new BMap.LocalSearch(mPoint, options);
        local.searchNearby(controlSearchLiId, mPoint, 1000);    // 检索词
        btnClearClass();
        listBtn[index-1].attr("class","active");        // list列表名称
    }else{
		loadAmbientBuildingPoint();
	}
}
// 周边按钮点击
function searchNearBy(i) {
    controlLiOnclick(controlLiId[i], i);
    btnClearClass();
    listBtn[i-1].attr("class","active");
	$("#ulList li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
}
// 清理list列表class样式
function btnClearClass(){
    for (var i = 0; i < listBtn.length; i++) {
        listBtn[i].removeClass();
    }
}

// 复杂的自定义覆盖物
function ComplexCustomOverlay(
    point,
    text,
    mouseoverText,
    code,
    name,
    longitude,latitude,
    resourceAmount,
    priceBeginning,
    beginUnit)
    {
        this._point = point;
        this._text = text;
        this._overText = mouseoverText;
        // 新加
        this.code = code;                         // 楼盘编码
        this.name = name;                         // 楼盘名称
        this.longitude = longitude;               // 地理经度
        this.latitude = latitude;                 // 地理纬度
        this.resourceAmount = resourceAmount;     // 资源数量
        this.priceBeginning = priceBeginning;     // 价格起点
        this.beginUnit = beginUnit;               // 价格起点单位
    }
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "#EE5D5B";
    div.style.border = "1px solid #BC3B3A";
    div.style.color = "white";
    div.style.height = "18px";
    div.style.padding = "2px";
    div.style.lineHeight = "18px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    this.setAttribute(
        "onclick",
        "commitResourceForm(" +
            '$!{building.code}' +
        ")"
    );
    div.style.fontSize = "12px"
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "11px";
    arrow.style.height = "10px";
    arrow.style.top = "22px";
    arrow.style.left = "10px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);
    div.onmouseover = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
        this.getElementsByTagName("span")[0].innerHTML = that._overText;
        arrow.style.backgroundPosition = "0px -20px";
    }
    div.onmouseout = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.style.cursor = "pointer";
        // this.onclick = "commitResourceForm(\"" + "$!{building.code}" +"\"" + ")";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
    }
    map.getPanes().labelPane.appendChild(div);
    return div;
}
ComplexCustomOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 30 + "px";
}
// 加载周边房源
function loadAmbientBuildingPoint() {
	alert(1111)
}
$(document).ready(function(){
    $("#search-housing").click(function(){
        $.ajax({
            type: "POST",                               //请求方式
            url: "./js/data.json",                      //请求的url地址
            dataType: "json",                           //返回格式为json
            async: true,                                //请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                lng : mPoint.lng,
                lat : mPoint.lat
            },
            success: function(backDate) {
                //请求成功时处理
                var dataObj = backDate;
                $.each(dataObj,function(i, item) {
                    // 拼接属性文字内容
                    var text = "￥" + item.priceBeginning + item.beginUnit +  "起",
                        mouseoverTxt = item.name + " " + item.resourceAmount + "套" ;
                    var myCompOverlay = new ComplexCustomOverlay(
                        new BMap.Point(item.longitude,item.latitude),text,mouseoverTxt,item.code
                    );
                    map.addOverlay(myCompOverlay);
                });
            },
            error: function() {
                //请求出错处理
                alert("通信出错");
            }
        });
    });
});
