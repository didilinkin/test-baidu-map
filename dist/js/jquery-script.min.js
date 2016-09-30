$(document).ready(function(){
    // 获取span.class下的img
    var markersImg = $(".BMap_Marker div img");
    for (var i=0; i < markersImg.length; i++){
        $(markersImg[i]).attr("src", "./img/pt.png");
    }
});