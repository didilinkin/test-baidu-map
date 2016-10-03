$(document).ready(function(){
    $("#search-housing").click(function(){
        $.ajax({
            type: "POST",                               //请求方式
            url: "./js/data.json",                      //请求的url地址
            dataType: "json",                           //返回格式为json
            async: true,                                //请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                lng : mPoint.lng,
                lat : mPoint.lat
            },
            success: function(backDate) {
                //请求成功时处理
                var dataObj = backDate;
                $.each(dataObj,function(i, item) {
                    // 拼接属性文字内容
                    var text = "￥" + item.priceBeginning + item.beginUnit +  "起",
                        mouseoverTxt = item.name + " " + item.resourceAmount + "套" ;
                    var myCompOverlay = new ComplexCustomOverlay(
                        new BMap.Point(item.longitude,item.latitude),text,mouseoverTxt
                    );
                    map.addOverlay(myCompOverlay);
                });
            },
            error: function() {
                //请求出错处理
                alert("出错");
            }
        });
    });
});
