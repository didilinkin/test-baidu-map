// 将  自定义控件 添加到地图当中
map.addControl(myUlListControl);
//// 添加覆盖物
map.addOverlay(circle);
// 绑定列表上的按钮按键
Btntraffic.onclick = function(){
    OutputList("公交站","List-traffic");
    OutputListBtn("OutputList-traffic");
};
Btnsnack.onclick = function(){
    OutputList("快餐","List-snack");
    OutputListBtn("OutputList-snack");
};
Btnrestaurant.onclick = function(){
    OutputList("餐厅","List-restaurant");
    OutputListBtn("OutputList-restaurant");
};
Btnbank.onclick = function(){
    OutputList("银行","List-bank");
    OutputListBtn("OutputList-bank");
};
Btnhotel.onclick = function(){
    OutputList("酒店","List-hotel");
    OutputListBtn("OutputList-hotel");
};
// 赋值命名
searchHousing = document.getElementById("search-housing");
searchTraffic = document.getElementById("search-traffic");
searchSnack = document.getElementById("search-snack");
searchRestaurant = document.getElementById("search-restaurant");
searchBank = document.getElementById("search-bank");
searchHotel = document.getElementById("search-hotel");
// 绑定事件(附近房源)————自定义房源数据
searchHousing.onclick=function(){
    remove_overlay();       //清除覆盖物
    map.addOverlay(circle);
};
// 控件绑定点击事件(交通,快餐,餐厅,银行,酒店)
searchTraffic.onclick = function(){OutputList("公交站","List-traffic");};
searchSnack.onclick = function(){OutputList("快餐","List-snack");};
searchRestaurant.onclick = function(){OutputList("餐厅","List-restaurant");};
searchBank.onclick = function(){OutputList("银行","List-bank");};
searchHotel.onclick = function(){OutputList("酒店","List-hotel");};
// 页面打开时执行的任务,输出list列表内容
function reloadList() {
    var allUlListId = [
        {
            title: "公交站",
            ulId: "List-traffic",
            pId: "Num-traffic"

        },
        {
            title: "快餐",
            ulId: "List-snack",
            pId: "Num-snack"
        },
        {
            title: "餐厅",
            ulId: "List-restaurant",
            pId: "Num-restaurant"
        },
        {
            title: "银行",
            ulId: "List-bank",
            pId: "Num-bank"
        },
        {
            title: "酒店",
            ulId: "List-hotel",
            pId: "Num-hotel"
        }
    ];
    for (var i = 0; i < allUlListId.length; i++) {
        // 输出list内容(只输出 不打点 ，所以使用的是aOutputList函数)
        aOutputList(allUlListId[i].title,allUlListId[i].ulId,allUlListId[i].pId);
    }
    // 清楚覆盖物
    remove_overlay();
    // 列表加载事件——检索关键词,文字输出(只输出list不打点)
    function aOutputList(outputKeyword,Ul,Pnum){
        var options = {
            // 搜索整个地图-(结果)
    		onSearchComplete: function(results){
                var length = 4;
                if (results.getCurrentNumPois < 4) {
                    length = results.getCurrentNumPois;
                }
    			// 判断状态是否正确
    			if (local.getStatus() == BMAP_STATUS_SUCCESS){
    				var s = [];
                    // 结果.获取当前数字POIS  getResults() 执行4次内容
    				for (var i = 0; i < length; i ++){
                        var s = new Object();
                        s.title = results.getPoi(i).title;
                        s.pointLng = results.getPoi(i).point.lng;
                        s.pointLat = results.getPoi(i).point.lat;
                        s.num = results.getCurrentNumPois(i);
                        // 获取数值节点位置
                        var PNum = document.getElementById(Pnum);
                        var UlList = document.getElementById(Ul);
                        var LiList = document.createElement("li");
                        LiList.setAttribute(
                            "onclick",
                            "oneAddOverlay('" + s.pointLng + "','" + s.pointLat + "')"
                        );
                        var text = s.title;
                        var num = s.num;
                        var textnode=document.createTextNode(text);
                        // 数值
                        var numnode=document.createTextNode(num);
                        // 将　文本节点　加入到　LiList 节点
                        LiList.appendChild(textnode);
                        // 将　LiList 节点　加入到　UlList 节点
    	                UlList.appendChild(LiList);
    				}
                    // 将数字值加入页面
                    PNum.appendChild(numnode);
    			}
    		}
    	};
    	var local = new BMap.LocalSearch(map, options);
        // 因为是搜索附近 所以不能使用local.search()方法,
        // 而应该是local.searchNearby();方法加以控制
    	local.searchNearby(outputKeyword,mPoint,900);
    }
    oneAddOverlay(120.3845,36.071702);
}
reloadList();
