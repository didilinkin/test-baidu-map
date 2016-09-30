$(document).ready(function(){
    var buildingMarker = [
        // 坐标1-市政府
        {
            code: "A001",                   // 编码
            name: "市政府",                  // 楼盘名称
            longitude: "120.389014",        // 地理经度
            latitude: "36.073178",          // 地理纬度
            resourceAmount: 10,             // 套数
            priceBeginning: 11,             // 价格起点
            beginUnit: ""                   // 价格起点单位
        },
        // 坐标2-世贸中心
        {
            code: "A002",                   // 编码
            name: "世贸中心",                // 楼盘名称
            longitude: "120.383566",        // 地理经度
            latitude: "36.06843",           // 地理纬度
            resourceAmount: 20,             // 资源数量
            priceBeginning: 21,             // 价格起点
            beginUnit: ""                   // 价格起点单位
        },
        // 坐标3-亚麦国际中心
        {
            code: "A003",                   // 编码
            name: "亚麦国际中心",             // 楼盘名称
            longitude: "120.383602",        // 地理经度
            latitude: "36.070447",          // 地理纬度
            resourceAmount: 30,             // 资源数量
            priceBeginning: 31,             // 价格起点
            beginUnit: ""                   // 价格起点单位
        }
    ]

    $("#search-housing").click(function(){
        $.ajax({
            type: "POST",                               //请求方式
            url: "./js/data.json",                                   //请求的url地址
            dataType: "json",                           //返回格式为json
            async: true,                                //请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                lng : mPoint.lng,
                lat : mPoint.lat
            },
            cache:false,
            // beforeSend: function() {
            //     //请求前的处理
            // },

            success: function(backDate) {
                //请求成功时处理
                // var dataObj = eval("("+backDate+")");               // 转成对象
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
