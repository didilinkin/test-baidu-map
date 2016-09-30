$(document).ready(function(){

    // 周边房源　按钮
    // $("＃search-housing").click(function(){
    //     $.post("demo.html",{
    //             lng : mPoint.lng,
    //             lat : mPoint.lat
    //     },function(data,status){
    //         for (var i = 0; i < data.length; i++) {
    //             var Arr = new Object();
    //             Arr = data[i];
    //             // 拼接属性文字内容
    //             var text = "￥" + Arr.priceBeginning + Arr.beginUnit +  "起",
    //                 mouseoverTxt = Arr.name + " " + Arr.resourceAmount + "套" ;
    //             var myCompOverlay = new ComplexCustomOverlay(
    //                 new BMap.Point(Arr.longitude,Arr.latitude),text,mouseoverTxt
    //             );
    //             map.addOverlay(myCompOverlay);
    //         }
    //     });
    //
    // });

    $.ajax({
        type: "POST",
        url: url,
        data: mPoint,
        success: function(backDate){
            $( "＃search-housing" ).each(function ( i, domEle) {
                
            });
        },
        dataType: dataType
    });
});
