// 创建Map实例
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
// 添加覆盖物
map.addOverlay(circle);
// circle.style.marginTop = 2rem;





// 定义一个控件类,即 screenList/筛选列表
// function screenList(){
//     // 默认停靠位置和偏移量
//     this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
//     this.defaultOffset = new BMap.Size(10, 10);
// }
// // 通过JavaScript的prototype属性继承于BMap.Control
// screenList.prototype = new BMap.Control();
// // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
// // 自定义控件.原型.初始化
// screenList.prototype.initialize = function(map){
//     // 创建一个DOM元素
//     var div = document.createElement("div");
//     // 添加文字说明
//     div.appendChild(document.createTextNode("放大2级"));
//     // 设置样式
//     div.style.cursor = "pointer";
//     div.style.border = "1px solid gray";
//     div.style.backgroundColor = "white";
//     // 绑定事件,点击一次放大两级
//     div.onclick = function(e){
//     map.setZoom(map.getZoom() + 2);
//     }
//     // 添加DOM元素到地图中
//     map.getContainer().appendChild(div);
//     // 将DOM元素返回
//     return div;
// }
// // 创建控件
// var myZoomCtrl = new screenList();
// // 添加到地图当中
// map.addControl(myZoomCtrl);








// <自定义>
// 定义一个控件类,即 screenList/筛选列表
function screenList(){
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 10);
}
// 通过JavaScript的prototype属性继承于BMap.Control
screenList.prototype = new BMap.Control();
// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
// 自定义控件.原型.初始化
screenList.prototype.initialize = function(map){
    // 创建一个DOM元素
    var ulList = document.createElement("ul");
    var liList = "hahahaha"
    ulList.id="ulList";
    ulList.appendChild(liList);
    // 添加文字说明
    // ulList.appendChild(document.createTextNode("haha"));
    // document.getElementById("myList").appendChild(newListItem);
    // 创建liList字符串
    // var liList = "<li>1</li><li>2</li>"
    // 设置样式
    ulList.style.cursor = "pointer";
    ulList.style.border = "1px solid gray";
    ulList.style.backgroundColor = "white";
    // 绑定事件,点击一次放大两级
    ulList.onclick = function(e){
    map.setZoom(map.getZoom() + 2);
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(ulList);
    // 将DOM元素返回
    return ulList;
}
// 创建控件
var myZoomCtrl = new screenList();
// 添加到地图当中
map.addControl(myZoomCtrl);





var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
local.searchNearby('公交',mPoint,1000);

// var arr = ['周边房源', '地铁/公交', '快餐','餐厅','银行','酒店'];


