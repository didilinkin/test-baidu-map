/*
 *声明——具体是怎样做的(具体实现)
 */
// 页面打开时执行的任务,输出list列表内容
function reloadList() {
    var allListId = [
        // 检索标题,列表ulID位置,列表pID输出位置
        {title: "公交",ulId: "List-traffic",pId: "Num-traffic"},
        {title: "快餐店",ulId: "List-snack",pId: "Num-snack"},
        {title: "餐厅",ulId: "List-restaurant",pId: "Num-restaurant"},
        {title: "银行",ulId: "List-bank",pId: "Num-bank"},
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
// list列表Btn名称
var listBtn = [$("#OutputList-traffic"),$("#OutputList-snack"),$("#OutputList-restaurant"),$("#OutputList-bank"),$("#OutputList-hotel")];
// 控件点击搜索事件（参数:检索词）
function controlLiOnclick(controlSearchLiId,index){
	clearMapAgainMarker();  // 清空地图,恢复默认调用
	map.addOverlay(circle); // 添加范围圆圈
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
function BtnSearchTraffic() {
    controlLiOnclick(controlLiId[1],1);
    btnClearClass();
    listBtn[0].attr("class","active");
}
function BtnSearchSnack() {
    controlLiOnclick(controlLiId[2],2);
    btnClearClass();
    listBtn[1].attr("class","active");
}
function BtnSearchRestaurant() {
    controlLiOnclick(controlLiId[3],3);
    btnClearClass();
    listBtn[2].attr("class","active");
}
function BtnSearchBank() {
    controlLiOnclick(controlLiId[4],4);
    btnClearClass();
    listBtn[3].attr("class","active");
}
function BtnSearchHotel() {
    controlLiOnclick(controlLiId[5],5);
    btnClearClass();
    listBtn[4].attr("class","active");
}
// 清理list列表class样式
function btnClearClass(){
    for (var i = 0; i < listBtn.length; i++) {
        listBtn[i].removeClass();
    }
}
// 加载周边房源
function loadAmbientBuildingPoint() {
	alert(1111)
}
