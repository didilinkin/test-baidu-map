/*
 *声明——具体是怎样做的(具体实现)
 */
var Btntraffic = document.getElementById("OutputList-traffic"),
    Btnsnack = document.getElementById("OutputList-snack"),
    Btnrestaurant = document.getElementById("OutputList-restaurant"),
    Btnbank = document.getElementById("OutputList-bank"),
    Btnhotel = document.getElementById("OutputList-hotel");
// 圆形检索填充
var circle = new BMap.Circle(mPoint,1000,{
    fillColor:"#FF2725",						// 填充色
    strokeWeight: 2,							// 画笔宽度
    strokeColor: "#FF2725",
    fillOpacity: 0.07, 							// 填充透明度
    strokeOpacity: 1							// 画笔透明度
});
var local =  new BMap.LocalSearch(map, {
    renderOptions: {
        map: map,
        autoViewport: false
    }
});
// 页面打开时执行的任务,输出list列表内容
function reloadList() {
    var allListId = [
        // 检索标题,列表ulID位置,列表pID输出位置
        {title: "公交站",ulId: "List-traffic",pId: "Num-traffic"},
        {title: "快餐店",ulId: "List-snack",pId: "Num-snack"},
        {title: "西餐厅",ulId: "List-restaurant",pId: "Num-restaurant"},
        {title: "银行,支行",ulId: "List-bank",pId: "Num-bank"},
        {title: "大酒店",ulId: "List-hotel",pId: "Num-hotel"}
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
                        li.setAttribute("onmouseover","liOnmouseover(" + liLng + "," + liLat + ")");
                        li.setAttribute("onclick","liOnclick("+liLng+","+liLat+","+"\""+text+"\""+","+"\""+liAddress+"\""+")");
                        li.appendChild(textnode);
                        listUl.appendChild(li);
    				}
                    var PNum = document.getElementById(listP);      // 检索数值
                    var num = results.getNumPois();
                    var numnode = document.createTextNode(num);
                    PNum.appendChild(numnode);
                    listUl.setAttribute("onmouseout","liOnmouseout()");     // listUl添加鼠标移出事件
    			}
            }
        };
        var local = new BMap.LocalSearch(mPoint,options);
        local.searchNearby(listTile, mPoint,600);
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
var oneMarker = new BMap.Marker(mPoint);    // 定义全局变量
// 单独标记(只标记不输出)
function addMarker(PointLng,PointLat) {
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    var oneMarker = new BMap.Marker(new BMap.Point(PointLng,PointLat));     // 单独标记的标记坐标
	map.addOverlay(oneMarker);         // 将标注添加到地图中
}
// list列表li 鼠标经过事件
function liOnmouseover(liLng,liLat){
    addMarker(liLng,liLat);     // 将坐标值输入 单独标记
}
// list列表ul 鼠标移出事件
function liOnmouseout(){
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
//
var infoWindowMarker = new BMap.Marker(mPoint);
// 添加信息窗口实例
function addInfoWindow(liLng,liLat,text,liAddress){
    var opts = {
    	width : 350,     // 信息窗口宽度
    	height: 160,     // 信息窗口高度
    	title : text , // 信息窗口标题
    	enableMessage: true//设置允许信息窗发送短息
    };
    infoWindowMarker = new BMap.Marker(new BMap.Point(liLng,liLat));     // 创建视窗标注
	var infoContent = liAddress;     // 地址内容
	map.addOverlay(infoWindowMarker);      // 将标注添加到地图中
	addClickHandler(infoContent,infoWindowMarker);
    function addClickHandler(content,marker){
    	infoWindowMarker.addEventListener("click",function(e){
    		openInfo(content,e)
            function openInfo(content,e){
            	var p = e.target;
            	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
            	map.openInfoWindow(infoWindow,point); //开启信息窗口
            }
        });
    }
    return infoWindowMarker;
}
// 自定义控件(右上角 筛选)
var controlLiId = ["周边房源","公交站","快餐店","西餐厅","银行,支行","大酒店"];      // 检索关键词
function ulListControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;      // 默认停靠位置和偏移量
    this.defaultOffset = new BMap.Size(10, 10);
}
ulListControl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize（初始化）方法,并且将控件的DOM元素返回
ulListControl.prototype.initialize = function(map){
    var ul = document.createElement("ul");      // 创建一个DOM元素
    ul.id="ulList";
    var li = null;      // 创建一个节点
    var aText = ["周边房源", "交通","快餐","餐厅","银行","酒店"];     // 将li内容创建为数组
    var aIdName = ["housing", "traffic","snack","restaurant","bank","hotel"];
    // 循环li标签
    for (var i=0; i < controlLiId.length; i++){
        li = document.createElement("li");
        a = document.createElement("a");
        li.setAttribute("onclick","controlLiOnclick("+ "\"" + controlLiId[i] + "\"" + "," + i +")");     // 给li控件添加点击事件
        a.setAttribute("herf","#");     // 给a标签添加属性
        a.appendChild(document.createTextNode(
            aText[i]
        ));
        a.id=("search-" + aIdName[i]);
        ul.appendChild(li);
        li.appendChild(a);
    }
    map.getContainer().appendChild(ul);     // 添加DOM元素到地图中
    return ul;      // 将DOM元素返回
}
var myUlListControl = new ulListControl();
map.addControl(myUlListControl);    // 将控件重新添加到地图中
// 控件点击搜索事件（参数:检索词）
function controlLiOnclick(controlSearchLiId,index){
    // 如果 参数不等于 "周边房源"
    if (controlSearchLiId != controlLiId[0]) {
        clearMapAgainMarker();      // 清空地图,恢复默认调用
        var options = {
    		onSearchComplete: function(results){
    			// 判断状态是否正确
    			if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    var controlLength = 25;        // 设置最大检索结果值为25
                    if ( results.getNumPois() < 25) {
                        controlLength = results.getNumPois();
                    }
    				for (var i = 0; i < controlLength; i ++){
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
        local.searchNearby(controlSearchLiId, mPoint,600);    // 检索词
        map.addOverlay(circle);
        btnClearClass();
        listBtn[index - 1].setAttribute("class","active");    // list列表名称
        // console.log("1");
    }
}





Btntraffic.onclick = function(){
    controlLiOnclick(controlLiId[1]);
    btnClearClass();
    listBtn[0].setAttribute("class","active");
};
Btnsnack.onclick = function(){
    controlLiOnclick(controlLiId[2]);       // 检索关键词（关键词）
    btnClearClass();
    listBtn[1].setAttribute("class","active");
};
Btnrestaurant.onclick = function(){
    controlLiOnclick(controlLiId[3]);
    btnClearClass();
    listBtn[2].setAttribute("class","active");
};
Btnbank.onclick = function(){
    controlLiOnclick(controlLiId[4]);
    btnClearClass();
    listBtn[3].setAttribute("class","active");
};
Btnhotel.onclick = function(){
    controlLiOnclick(controlLiId[5]);
    btnClearClass();
    listBtn[4].setAttribute("class","active");
};
var listBtn = [Btntraffic,Btnsnack,Btnrestaurant,Btnbank,Btnhotel]      // list列表Btn名称
// 清理list列表class样式
function btnClearClass(){
    for (var i = 0; i < listBtn.length; i++) {
        listBtn[i].setAttribute("class","");
    }
}
