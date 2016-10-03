/// 圆形检索填充
var circle = new BMap.Circle(mPoint,1000,{
    fillColor:"#FF2725",						// 填充色
    strokeWeight: 2,							// 画笔宽度
    strokeColor: "#FF2725",
    fillOpacity: 0.07, 							// 填充透明度
    strokeOpacity: 1							// 画笔透明度
});
var local =  new BMap.LocalSearch(map, {
    renderOptions: {
        map: map,
        autoViewport: false
    }
});
var Btntraffic = document.getElementById("OutputList-traffic");
var Btnsnack = document.getElementById("OutputList-snack");
var Btnrestaurant = document.getElementById("OutputList-restaurant");
var Btnbank = document.getElementById("OutputList-bank");
var Btnhotel = document.getElementById("OutputList-hotel");
