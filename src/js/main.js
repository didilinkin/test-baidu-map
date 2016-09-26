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
// 创建标点,层级(15e级别)
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



////////////////////////
//// 将各个控件加入地图////
////////////////////////

// 创建自定义控件
var myUlListControl = new ulListControl();
// 将  自定义控件 添加到地图当中
map.addControl(myUlListControl);

//////////////////
//// 添加覆盖物 ////
//////////////////

map.addOverlay(circle);

var local =  new BMap.LocalSearch(map, {
    renderOptions: {map: map, autoViewport: false}
});
// 本地.搜索附近（[参数1：名称],[标点位置],[圆心距离]）
local.searchNearby('酒店',mPoint,1000);




//////////////////
////控件绑定事件////
//////////////////
// 绑定事件(附近房源)————自定义数据
document.getElementById("search-housing").onclick=function(){
    // 展示自定义坐标点
    loadPoint(buildingMarker);
    map.setViewport(buildingMarker); //让所有点在视野范围内
};

// 控件绑定点击事件(交通)
document.getElementById("search-traffic").onclick=function(){
    local.searchNearby("公交",mPoint,1000);
};
// 控件绑定点击事件(快餐)
document.getElementById("search-snack").onclick=function(){
    local.searchNearby("快餐",mPoint,1000);
};
// 控件绑定点击事件(餐厅)
document.getElementById("search-restaurant").onclick=function(){
    local.searchNearby("餐厅",mPoint,1000);
};
// 控件绑定点击事件(银行)
document.getElementById("search-bank").onclick=function(){
    local.searchNearby("银行",mPoint,1000);
};
// 控件绑定点击事件(酒店)
document.getElementById("search-hotel").onclick=function(){
    local.searchNearby("酒店",mPoint,1000);
};




///////////////
// 测试坐标点位//
///////////////

// 市政府      120.389014,36.073178
// 世贸中心    120.383566,36.06843
// 亚麦国际中心 120.383597,36.070436
// var bList1 = [{code: "B001", name: "华润大厦", lng: "120.384464", lat: "36.071681", r_count: 22},
// 				 {code: "B002", name: "福泰广场", lng: "120.392152", lat: "36.070968", r_count: 37},
// 				 {code: "B003", name: "北九水", lng: "120.60437", lat: "36.217307", r_count: 18}];
// 定义楼盘坐标点 对象
var buildingMarker = [
    // 坐标1-市政府
    {
        code: "A001",
        name: "市政府",
        lng: "120.389014",
        lat: "36.073178",
        // 套数
        r_count: 22,
        // 价格起点
        priceBeginning: 10,
        // 价格起点单位
        beginUnit: "元"
    },
    // 坐标2
    {
        code: "A002",
        name: "世贸中心",
        lng: "120.383566",
        lat: "36.06843",
        // 套数
        r_count: 22,
        // 价格起点
        priceBeginning: 10,
        // 价格起点单位
        beginUnit: "元"
    },
    // 坐标3
    {
        code: "A003",
        name: "亚麦国际中心",
        lng: "120.383597",
        lat: "36.217307",
        // 套数
        r_count: 22,
        // 价格起点
        priceBeginning: 10,
        // 价格起点单位
        beginUnit: "元"
    }
]

// 编写自定义函数,创建标注
function addMarker(point){
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);
}

// 在地图上加载自定义点
function loadPoint(list) {
	$.each(list, function(i, building) {
		var marker = new BMap.Marker(new BMap.Point(building.lng, building.lat));
        // 添加覆盖物
		map.addOverlay(marker);
        // 文字内容
		var content = "楼盘编码：" + building.code + "<br/>楼盘名称：" + building.name;
        // 信息窗口
		var infoWindow = new BMap.InfoWindow("<p style='font-size:12px;'>" + content + "</p>");
        // 添加 监听事件
		marker.addEventListener("click", function () {
            this.openInfoWindow(infoWindow);
        });
	});
}

// // 默认加载buildingMarker
// loadPoint(buildingMarker);
// map.setViewport(buildingMarker); //让所有点在视野范围内
