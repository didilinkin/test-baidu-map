// 创建Map实例(圆形检索填充控件)
var map = new BMap.Map("allmap");
//标点位置(设置为华润大厦)
var mPoint = new BMap.Point(120.3845,36.071702);
// 添加 缩放 与 平移控件
map.addControl(new BMap.NavigationControl(
    {
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
    }));
// 支持鼠标滚轮缩放操作
map.enableScrollWheelZoom();
// 创建标点,层级(15级别)
map.centerAndZoom(mPoint,15);

//////////////////
/// 圆形检索填充////
//////////////////
var circle = new BMap.Circle(mPoint,1000,{
    fillColor:"#FF2725",						// 填充色
    strokeWeight: 2,							// 画笔宽度
    strokeColor: "#FF2725",
    fillOpacity: 0.07, 							// 填充透明度
    strokeOpacity: 1							// 画笔透明度
});






































/////////////////
/// 自定义控件 ///
////////////////

// 定义一个控件类(右上角 筛选)
function ulListControl(){
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 10);
}

    // 通过JavaScript的prototype（原型）属性继承于BMap.Control
    ulListControl.prototype = new BMap.Control();
    // 自定义控件必须实现自己的initialize（初始化）方法,并且将控件的DOM元素返回
    // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
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



///////////////////////////////
//// 将6个本地检索控件 加入地图////
///////////////////////////////

// 创建自定义控件
var myUlListControl = new ulListControl();
// 将  自定义控件 添加到地图当中
map.addControl(myUlListControl);

// 赋值命名
searchHousing = document.getElementById("search-housing");
searchTraffic = document.getElementById("search-traffic");

searchSnack = document.getElementById("search-snack");
searchRestaurant = document.getElementById("search-restaurant");

searchBank = document.getElementById("search-bank");
searchHotel = document.getElementById("search-hotel");















































//////////////////
//// 添加覆盖物 ////
//////////////////

map.addOverlay(circle);

var local =  new BMap.LocalSearch(map, {
    renderOptions: {
        map: map,
        autoViewport: false
    }
});
// 本地.搜索附近（[参数1：名称],[标点位置],[圆心距离]）
local.searchNearby('酒店',mPoint,1000);

//清除覆盖物(方法)
function remove_overlay(){
	map.clearOverlays();
}

//（搜索）函数
function searchFunction(name){
    remove_overlay();
    map.addOverlay(circle);
    local.searchNearby(name,mPoint,900);
}


// 绑定事件(附近房源)————自定义房源数据
searchHousing.onclick=function(){
    remove_overlay();       //清除覆盖物
    map.addOverlay(circle);


    // 添加自定义覆盖物(多个对象)
    addBuilding(buildingMarker);
};

// 控件绑定点击事件(交通)
searchTraffic.onclick = function(){
    searchFunction("公交");
};
// 控件绑定点击事件(快餐)
searchSnack.onclick = function(){
    searchFunction("快餐");
};
// 控件绑定点击事件(餐厅)
searchRestaurant.onclick = function(){
    searchFunction("餐厅");
};
// 控件绑定点击事件(银行)
searchBank.onclick = function(){
    searchFunction("银行");
};
// 控件绑定点击事件(酒店)
searchHotel.onclick = function(){
    searchFunction("酒店");
};










/////////////////////////////
///// 定义楼盘坐标点 对象 //////
/////////////////////////////

var buildingMarker = [
    // 坐标1-市政府
    {
        code: "A001",                   // 编码
        name: "市政府",                  // 楼盘名称
        longitude: "120.389014",        // 地理经度
        latitude: "36.073178",          // 地理纬度
        resourceAmount: 10,             // 套数
        priceBeginning: 11,             // 价格起点
        beginUnit: ""                   // 价格起点单位
    },
    // 坐标2-世贸中心
    {
        code: "A002",                   // 编码
        name: "世贸中心",                // 楼盘名称
        longitude: "120.383566",        // 地理经度
        latitude: "36.06843",           // 地理纬度
        resourceAmount: 20,             // 资源数量
        priceBeginning: 21,             // 价格起点
        beginUnit: ""                   // 价格起点单位
    },
    // 坐标3-亚麦国际中心
    {
        code: "A003",                   // 编码
        name: "亚麦国际中心",             // 楼盘名称
        longitude: "120.383602",        // 地理经度
        latitude: "36.070447",          // 地理纬度
        resourceAmount: 30,             // 资源数量
        priceBeginning: 31,             // 价格起点
        beginUnit: ""                   // 价格起点单位
    }
]





































///////////////////////
//// 添加自定义覆盖物  ///
///////////////////////

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
    beginUnit
){
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

// 声明默认文字样式（可以将它放入下面生成函数）
// var txt = "银湖海岸城",（355,378 行使用过这个变量）
//     mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;（371行使用过）

// var myCompOverlay = new ComplexCustomOverlay(
//     new BMap.Point(120.383566,36.06843), "银湖海岸城",mouseoverTxt
// );

// 添加单个自定义覆盖物
function addBuilding(ObjGroup){
    for (var i = 0; i < ObjGroup.length; i++) {
        var Arr = new Object();
        Arr = ObjGroup[i];
        // 拼接属性文字内容
        var text = "￥" + Arr.priceBeginning + Arr.beginUnit +  "起",
            mouseoverTxt = Arr.name + " " + Arr.resourceAmount + "套" ;

        var myCompOverlay = new ComplexCustomOverlay(
            new BMap.Point(Arr.longitude,Arr.latitude),text,mouseoverTxt
        );
        map.addOverlay(myCompOverlay);
    }
};
