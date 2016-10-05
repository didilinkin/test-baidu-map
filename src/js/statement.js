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
                        // li.setAttribute("onmouseover",li.style.display = 'none');
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

// 单独标记（百度方法）
function addMarker(PointLng,PointLat) {
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    var oneMarker = new BMap.Marker(new BMap.Point(PointLng,PointLat));     // 单独标记的标记坐标
	map.addOverlay(oneMarker);         // 将标注添加到地图中
}
// list列表li 鼠标经过事件
function liOnmouseover(liLng,liLat){
    // 将坐标值输入 单独标记
    addMarker(liLng,liLat);
}
// list列表ul 鼠标移出事件
function liOnmouseout(){
    clearMapAgainMarker();          // 清空地图,重新打上中心自定义标记
    customMarker.setAnimation(BMAP_ANIMATION_BOUNCE);     // 设置自定义标注 跳动
}
