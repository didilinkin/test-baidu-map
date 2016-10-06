/*
 *声明——具体是怎样做的(具体实现)
 */
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
                        li.setAttribute("data-lng",liLng);
                        li.setAttribute("data-lat",liLat);
                        li.setAttribute("data-address",liAddress);
                        li.setAttribute("onmouseover","liOnmouseover(" + liLng + "," + liLat + ")");
                        li.setAttribute("onclick","liOnclick("+liLng+","+liLat+","+"\""+text+"\""+","+"\""+liAddress+"\""+")");
                        li.appendChild(textnode);
                        listUl.appendChild(li);
    				}
                    // 检索数值
                    var PNum = document.getElementById(listP);
                    var num = results.getNumPois();
                    var numnode = document.createTextNode(num);
                    PNum.appendChild(numnode);
                    // listUl添加鼠标移出事件
                    listUl.setAttribute("onmouseout","liOnmouseout()");
                    // console.log(num);
    			}
            }
        };
        var local = new BMap.LocalSearch(mPoint,options);
        local.searchNearby(listTile, mPoint,600);
    }
}
// 清空地图,重新打上中心自定义标记
function clearMapAgainMarker(){
    map.clearOverlays();    // 清理地图上面所有点
    map.addOverlay(customMarker);      // 将中心标注   重新添加到地图中
}
var oneMarker = new BMap.Marker(mPoint);    // 定义全局变量
// 单独标记(只标记不输出)
function addMarker(PointLng,PointLat) {
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    var oneMarker = new BMap.Marker(new BMap.Point(PointLng,PointLat));     // 单独标记的标记坐标
	map.addOverlay(oneMarker);         // 将标注添加到地图中
    // return oneMarker;
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
    addInfoWindow(liLng,liLat,text,liAddress);
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
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    infoWindowMarker = new BMap.Marker(new BMap.Point(liLng,liLat));     // 创建视窗标注
	var infoContent = liAddress;     // 地址内容
	map.addOverlay(infoWindowMarker);      // 将标注添加到地图中
    infoWindowMarker.setAnimation(BMAP_ANIMATION_BOUNCE);     // 设置自定义标注 跳动
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
    console.log(opts);
}
