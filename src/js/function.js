// // 页面打开时执行的任务,输出list列表内容
// function reloadList() {
//     var allUlListId = [
//         {title: "公交站",ulId: "List-traffic",pId: "Num-traffic"},
//         {title: "快餐",ulId: "List-snack",pId: "Num-snack"},
//         {title: "餐厅",ulId: "List-restaurant",pId: "Num-restaurant"},
//         {title: "银行",ulId: "List-bank",pId: "Num-bank"},
//         {title: "酒店",ulId: "List-hotel",pId: "Num-hotel"}
//     ];
//     for (var i = 0; i < allUlListId.length; i++) {
//         // 输出list内容(只输出 不打点 ，所以使用的是aOutputList函数)
//         aOutputList(allUlListId[i].title,allUlListId[i].ulId,allUlListId[i].pId);
//     }
//     // 清楚覆盖物
//     remove_overlay();
//     // hideOver();
//     // 页面加载完之后添加中心点坐标(华润大厦)
//     // 列表加载事件——检索关键词,文字输出(只输出list不打点)
//     function aOutputList(outputKeyword,Ul,Pnum){
//         var options = {
//             // 搜索整个地图-(结果)
//     		onSearchComplete: function(results){
//                 var length = 4;
//                 if (results.getCurrentNumPois < 4) {
//                     length = results.getCurrentNumPois;
//                 }
//     			// 判断状态是否正确
//     			if (local.getStatus() == BMAP_STATUS_SUCCESS){
//     				var s = [];
//                     // 结果.获取当前数字POIS  getResults() 执行4次内容
//     				for (var i = 0; i < length; i ++){
//                         var s = new Object();
//                         s.title = results.getPoi(i).title;
//                         s.pointLng = results.getPoi(i).point.lng;
//                         s.pointLat = results.getPoi(i).point.lat;
//                         s.num = results.getCurrentNumPois(i);
//                         // 获取数值节点位置
//                         var PNum = document.getElementById(Pnum);
//                         var UlList = document.getElementById(Ul);
//                         var LiList = document.createElement("li");
//                         LiList.setAttribute(
//                             "onclick",
//                             "oneAddOverlay('" + s.pointLng + "','" + s.pointLat + "')"
//                         );
//                         var text = s.title;
//                         // 将数值传给num变量
//                         var num = s.num;
//                         var textnode=document.createTextNode(text);
//                         // 数值
//                         var numnode=document.createTextNode(num);
//                         // 将　文本节点　加入到　LiList 节点
//                         LiList.appendChild(textnode);
//                         // 将　LiList 节点　加入到　UlList 节点
//     	                UlList.appendChild(LiList);
//     				}
//                     // 将数字值加入页面
//                     PNum.appendChild(numnode);
//     			}
//     		}
//     	};
//     	var local = new BMap.LocalSearch(map, options);
//         //搜索附近 不能使用local.search()方法
//     	local.searchNearby(outputKeyword,mPoint,900);
//     }
//     oneAddOverlay(120.3845,36.071702);
// }
//
// //清除覆盖物(方法)
// function remove_overlay(){
// 	map.clearOverlays();
// }
// // 隐藏覆盖物（百度地图方法）
// function hideOver(){
//     circle.hide();
// }
// //（搜索）函数    检索功能 将在 下面API输出函数当中调用  参数相同
// function searchFunction(outputKeyword){
//     remove_overlay();
//     map.addOverlay(circle);
//     local.searchNearby(outputKeyword,mPoint,900);
// }
// // 单独标记函数（百度方法）
// function oneAddOverlay(PointLng,PointLat) {
//     // 清理地图上面所有点
//     map.clearOverlays();
//     var marker = new BMap.Marker(new BMap.Point(PointLng,PointLat));
//     map.addOverlay(marker);
// }
// function OutputListBtn(BtnId){
//     var aBtn = $("#"+BtnId);
//     $(".output--list a").removeClass("active");
//     aBtn.addClass("active");
// }
// // 自定义控件(右上角 筛选)
// function ulListControl(){
//     // 默认停靠位置和偏移量
//     this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
//     this.defaultOffset = new BMap.Size(10, 10);
// }
// // 检索关键词 本地API文字输出
// function OutputList(outputKeyword,Ul){
// 	var options = {
//         // 搜索整个地图-(结果)
// 		onSearchComplete: function(results){
// 			// 判断状态是否正确
// 			if (local.getStatus() == BMAP_STATUS_SUCCESS){
// 				var s = [];
//                 // 结果.获取当前数字POIS  getResults() 执行5次内容
// 				for (var i = 0; i < 5; i ++){
//                     var s = new Object();
//                     s.title = results.getPoi(i).title;
//                     s.pointLng = results.getPoi(i).point.lng;
//                     s.pointLat = results.getPoi(i).point.lat;
//                     // 绑定输出的DIV ID
//                     var UlList = document.getElementById(Ul);
//                     var LiList = document.createElement("li");
//                     var text = s.title;
//                     var textnode=document.createTextNode(text);
// 				}
// 			}
// 		}
// 	};
// 	var local = new BMap.LocalSearch(map, options);
//     // 因为是搜索附近 所以不能使用local.search()方法,
// 	local.searchNearby(outputKeyword,mPoint,900);
//     // 调用上面的 本地检索 然后在地图标记的函数 传入参数
//     searchFunction(outputKeyword);
// }
