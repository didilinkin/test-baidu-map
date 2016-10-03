// 创建Map实例(圆形检索填充控件,关闭底图可点功能)
var map = new BMap.Map("allmap", {enableMapClick:false});
//标点位置(设置为华润大厦)
var mPoint = new BMap.Point(120.3845,36.071702);
// 添加 缩放 与 平移控件
map.addControl(new BMap.NavigationControl(
    {
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
    }));
//禁止拖拽
map.disableDragging();
setTimeout(function(){
   map.enableDragging();   //两秒后开启拖拽
}, 3500);
// 创建标点,层级(15级别)
map.centerAndZoom(mPoint,15);
// 自定义坐标
var myIcon = new BMap.Icon("./images/pt.png", new BMap.Size(65,80));
