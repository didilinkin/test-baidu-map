$(document).ready(function(){

    // $.ajax({
    //     type: "POST",
    //     url: url,
    //     data: data,
    //     success: success,
    //     dataType: dataType
    // });

    // 周边房源　按钮
    $("＃search-housing").click(function(){


        $.post("demo.html",function(data,status){
            // Ajax添加单个自定义覆盖物
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
        });

    });
});
