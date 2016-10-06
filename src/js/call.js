/*
 *调用——页面加载中按顺序做的内容
 */
var map = new BMap.Map("allmap", {enableMapClick:false});   // 创建Map实例(关闭底图可点功能)
var mPoint = new BMap.Point(120.405475,36.086421);    // 标点位置(华润大厦)
var myIcon = new BMap.Icon("./images/pt.png", new BMap.Size(65,80));    // 自定义标注样式
var customMarker = new BMap.Marker(mPoint,{icon:myIcon});  // 创建自定义标注(将样式加入)
    customMarker.setAnimation(BMAP_ANIMATION_BOUNCE);     // 设置自定义标注 跳动
map.centerAndZoom(mPoint,15);   // 创建地图中心点,层级15级（并不显示标记）
map.disableDragging();  //禁止拖拽
// 添加 缩放 与 平移控件
map.addControl(new BMap.NavigationControl(
 {
     anchor: BMAP_ANCHOR_TOP_RIGHT,
     type: BMAP_NAVIGATION_CONTROL_SMALL
 }));
//两秒后开启拖拽
setTimeout(function(){
    map.enableDragging();
}, 3500);
// 输出list列表内容
reloadList();
// 将自定义标注、自定义控件添加到地图中
defaultCallLoad()
