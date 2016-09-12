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
// 创建标点,层级
map.centerAndZoom(mPoint,15);

// 圆形检索填充
var circle = new BMap.Circle(mPoint,1000,{
    fillColor:"#FF2725",						// 填充色
    strokeWeight: 2,							// 画笔宽度
    strokeColor: "#FF2725",
    fillOpacity: 0.07, 							// 填充透明度
    strokeOpacity: 1							// 画笔透明度
});


// 自定义控件

// 定义一个控件类,即ulListControl
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





    // 成功触发 检索本地事件
    // a.onclick = function(){
    //     local.searchNearby("饭店",mPoint,1000);
    // }
    // 循环点击事件


    // 添加DOM元素到地图中
    map.getContainer().appendChild(ul);
    // 将DOM元素返回
    return ul;
}




// 创建自定义控件
var myUlListControl = new ulListControl();
// 将  自定义控件 添加到地图当中
map.addControl(myUlListControl);


// 添加覆盖物
map.addOverlay(circle);
// circle.style.marginTop = 2rem;

var local =  new BMap.LocalSearch(map, {
    renderOptions: {map: map, autoViewport: false}
});
// 本地.搜索附近（[参数1：名称],[标点位置],[圆心距离]）
local.searchNearby('酒店',mPoint,1000);




// 绑定事件(房源)
document.getElementById("search-housing").onclick=function(){
    local.searchNearby("写字楼",mPoint,1000);
};
// 绑定事件(交通)
document.getElementById("search-traffic").onclick=function(){
    local.searchNearby("公交",mPoint,1000);
};
// 绑定事件(快餐)
document.getElementById("search-snack").onclick=function(){
    local.searchNearby("快餐",mPoint,1000);
};
// 绑定事件(餐厅)
document.getElementById("search-restaurant").onclick=function(){
    local.searchNearby("餐厅",mPoint,1000);
};
// 绑定事件(银行)
document.getElementById("search-bank").onclick=function(){
    local.searchNearby("银行",mPoint,1000);
};
// 绑定事件(酒店)
document.getElementById("search-hotel").onclick=function(){
    local.searchNearby("酒店",mPoint,1000);
};
