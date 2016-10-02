// // 创建标点,层级(15级别)
// map.centerAndZoom(mPoint,15);
// // 页面打开时执行的任务,输出list列表内容
// reloadList();
// // 通过JavaScript的prototype（原型）属性继承于BMap.Control
// ulListControl.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize（初始化）方法,并且将控件的DOM元素返回
// ulListControl.prototype.initialize = function(map){
//     // 创建一个DOM元素
//     var ul = document.createElement("ul");
//     ul.id="ulList";
//     // 创建一个节点
//     var li = null;
//     // 将li内容创建为数组
//     var aText = ["周边房源", "交通","快餐","餐厅","银行","酒店"];
//     var aIdName = ["housing", "traffic","snack","restaurant","bank","hotel"];
//     // 循环li标签
//     for (var i=0; i<6; i++){
//         li = document.createElement("li");
//         a = document.createElement("a");
//         // 给a标签添加属性
//         a.setAttribute("herf","#");
//         a.appendChild(document.createTextNode(
//             aText[i]
//         ));
//         a.id=("search-" + aIdName[i]);
//         ul.appendChild(li);
//         li.appendChild(a);
//     }
//     // 添加DOM元素到地图中
//     map.getContainer().appendChild(ul);
//     // 将DOM元素返回
//     return ul;
// }
// var myUlListControl = new ulListControl();
// // 将  自定义控件 添加到地图当中
// map.addControl(myUlListControl);
// //// 添加覆盖物
// map.addOverlay(circle);
// var local =  new BMap.LocalSearch(map, {
//     renderOptions: {
//         map: map,
//         autoViewport: false
//     }
// });
// // 复杂的自定义覆盖物
// function ComplexCustomOverlay(point,text,mouseoverText,code,name,longitude,latitude,resourceAmount,priceBeginning,beginUnit){
//   this._point = point;
//   this._text = text;
//   this._overText = mouseoverText;
//   this.code = code;                         // 楼盘编码
//   this.name = name;                         // 楼盘名称
//   this.longitude = longitude;               // 地理经度
//   this.latitude = latitude;                 // 地理纬度
//   this.resourceAmount = resourceAmount;     // 资源数量
//   this.priceBeginning = priceBeginning;     // 价格起点
//   this.beginUnit = beginUnit;               // 价格起点单位
// }
// ComplexCustomOverlay.prototype = new BMap.Overlay();
// ComplexCustomOverlay.prototype.initialize = function(map){
//   this._map = map;
//   var div = this._div = document.createElement("div");
//   div.style.position = "absolute";
//   div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
//   div.style.backgroundColor = "#EE5D5B";
//   div.style.border = "1px solid #BC3B3A";
//   div.style.color = "white";
//   div.style.height = "18px";
//   div.style.padding = "2px";
//   div.style.lineHeight = "18px";
//   div.style.whiteSpace = "nowrap";
//   div.style.MozUserSelect = "none";
//   div.style.fontSize = "12px"
//   var span = this._span = document.createElement("span");
//   div.appendChild(span);
//   span.appendChild(document.createTextNode(this._text));
//   var that = this;
//   var arrow = this._arrow = document.createElement("div");
//   arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
//   arrow.style.position = "absolute";
//   arrow.style.width = "11px";
//   arrow.style.height = "10px";
//   arrow.style.top = "22px";
//   arrow.style.left = "10px";
//   arrow.style.overflow = "hidden";
//   div.appendChild(arrow);
//   div.onmouseover = function(){
//     this.style.backgroundColor = "#6BADCA";
//     this.style.borderColor = "#0000ff";
//     this.getElementsByTagName("span")[0].innerHTML = that._overText;
//     arrow.style.backgroundPosition = "0px -20px";
//   }
//   div.onmouseout = function(){
//     this.style.backgroundColor = "#EE5D5B";
//     this.style.borderColor = "#BC3B3A";
//     this.getElementsByTagName("span")[0].innerHTML = that._text;
//     arrow.style.backgroundPosition = "0px 0px";
//   }
//   map.getPanes().labelPane.appendChild(div);
//   return div;
// }
// ComplexCustomOverlay.prototype.draw = function(){
//   var map = this._map;
//   var pixel = map.pointToOverlayPixel(this._point);
//   this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
//   this._div.style.top  = pixel.y - 30 + "px";
// }
//
// //
// // 点击事件
// //
// // 自定义控件点击事件(交通、快餐、餐厅、银行、酒店)
// searchTraffic.onclick = function(){OutputList("公交站","List-traffic");};
// searchSnack.onclick = function(){OutputList("快餐","List-snack");};
// searchRestaurant.onclick = function(){OutputList("餐厅","List-restaurant");};
// searchBank.onclick = function(){OutputList("银行","List-bank");};
// searchHotel.onclick = function(){OutputList("酒店","List-hotel");};
// // 绑定事件(附近房源)————自定义房源数据
// searchHousing.onclick=function(){
//     remove_overlay();       //清除覆盖物
//     map.addOverlay(circle);
//     // addBuilding(buildingMarker); // 使用ajax事件  暂时注释
// };
// // list表单"在地图上显示"按钮
// Btntraffic.onclick = function(){
//     OutputList("公交站","List-traffic");
//     OutputListBtn("OutputList-traffic");
// };
// Btnsnack.onclick = function(){
//     OutputList("快餐","List-snack");
//     OutputListBtn("OutputList-snack");
// };
// Btnrestaurant.onclick = function(){
//     OutputList("餐厅","List-restaurant");
//     OutputListBtn("OutputList-restaurant");
// };
// Btnbank.onclick = function(){
//     OutputList("银行","List-bank");
//     OutputListBtn("OutputList-bank");
// };
// Btnhotel.onclick = function(){
//     OutputList("酒店","List-hotel");
//     OutputListBtn("OutputList-hotel");
// };
