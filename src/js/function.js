// 自定义控件(右上角 筛选)
function ulListControl(){
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 10);
}
// 通过JavaScript的prototype（原型）属性继承于BMap.Control
ulListControl.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize（初始化）方法,并且将控件的DOM元素返回
ulListControl.prototype.initialize = function(map){
    // 创建一个DOM元素
    var ul = document.createElement("ul");
    ul.id="ulList";
    // 创建一个节点
    var li = null;
    // 将li内容创建为数组
    var aText = ["周边房源", "交通","快餐","餐厅","银行","酒店"];
    var aIdName = ["housing", "traffic","snack","restaurant","bank","hotel"];
    // 循环li标签
    for (var i=0; i<6; i++){
        li = document.createElement("li");
        a = document.createElement("a");
        // 给a标签添加属性
        a.setAttribute("herf","#");
        a.appendChild(document.createTextNode(
            aText[i]
        ));
        a.id=("search-" + aIdName[i]);
        ul.appendChild(li);
        li.appendChild(a);
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(ul);
    // 将DOM元素返回
    return ul;
}
//// 将6个本地检索控件 加入地图
var myUlListControl = new ulListControl();
//清除覆盖物(方法)
function remove_overlay(){
	map.clearOverlays();
}
// 隐藏覆盖物（百度地图方法）
function hideOver(){
    circle.hide();
}
//（搜索）函数    检索功能 将在 下面API输出函数当中调用  参数相同
function searchFunction(outputKeyword){
    remove_overlay();
    map.addOverlay(circle);
    local.searchNearby(outputKeyword,mPoint,900);
}
// 单独标记函数（百度方法）
function oneAddOverlay(PointLng,PointLat) {
    // 清理地图上面所有点
    map.clearOverlays();
    var marker2 = new BMap.Marker(new BMap.Point(PointLng,PointLat),{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);              // 将标注添加到地图中
}
function OutputListBtn(BtnId){
    var aBtn = $("#"+BtnId);
    $(".output--list a").removeClass("active");
    aBtn.addClass("active");
}
// 检索关键词 本地API文字输出(将其封在一个构造函数中)
function OutputList(outputKeyword,Ul){
	var options = {
        // 搜索整个地图-(结果)
		onSearchComplete: function(results){
			// 判断状态是否正确
			if (local.getStatus() == BMAP_STATUS_SUCCESS){
				var s = [];
				for (var i = 0; i < 5; i ++){
                    var s = new Object();
                    s.title = results.getPoi(i).title;
                    s.pointLng = results.getPoi(i).point.lng;
                    s.pointLat = results.getPoi(i).point.lat;
                    var UlList = document.getElementById(Ul);
                    var LiList = document.createElement("li");
                    var text = s.title;
                    var textnode=document.createTextNode(text);
				}
			}
		}
	};
	var local = new BMap.LocalSearch(map, options);
    // 因为是搜索附近 所以不能使用local.search()方法,
	local.searchNearby(outputKeyword,mPoint,900);
    // 调用上面的 本地检索 然后在地图标记的函数 传入参数
    searchFunction(outputKeyword);
}
// 添加自定义覆盖物
function ComplexCustomOverlay(point,text,mouseoverText,code,name,longitude,latitude,resourceAmount,priceBeginning,beginUnit){
  this._point = point;
  this._text = text;
  this._overText = mouseoverText;
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
