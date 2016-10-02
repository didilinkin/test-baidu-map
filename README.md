# 2016年9月9日 写到99行

```javascript
ulList.id="ulList";
ulList.appendChild(liList);
```

# 2016年9月13日 js部分想用通过jquery添加地图标志
发现并不能简单通过更改地标img图标修改,因为涉及到定位问题。所以还是需要通过百度API的方法来修改

# main.js 自定义名称

`buildingMarker` : 附近楼盘 坐标点 数组

`ComplexCustomOverlay` : 自定义覆盖物 对象（目标 放入addBuilding函数执行打点）

`addBuilding` : 打自定义覆盖物 程序 函数

`oneArr` : 测试一个自定义坐标对象 数组

`ObjGroup` : 多个坐标对象组成的对象集合  对象

`Arr` : 循环打坐标时 function内赋值的一个对象  对象

`OutputList` : 通过API本地输出列表文字 函数

`outputKeyword` : 输出的关键字 OutputList函数参数 变量

`s.title` : `results.getPoi(i).title` 存储result.title信息

`s.pointLng` : `results.getPoi(i).point.lng`  存储result.坐标.经度信息

`s.pointLat` : `results.getPoi(i).point.lat`  存储result.坐标.纬度信息

`reloadList()` : 自动加载事件（页面一刷新　就执行的事件，添加５个list列表等一系列任务）　函数

`OneMarker` ：自定义标记对象（坐标经度，坐标纬度） 构造函数

***

# 百度地图方法

`local.searchNearby([搜索内容对象],[中心点的坐标],[范围米数])`

`results.getCurrentNumPois(i)` : 获取本地检索后获得的可控范围内的点数数量；

以`中心点`检索附近`范围`的`内容对象`
### 示例:
```javascript
local.searchNearby(outputKeyword,mPoint,900);
```


`results.getPoi(i).point` 获取检索出来的内容坐标

[API说明地址](http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9C%8D%E5%8A%A1%E7%B1%BB/LocalResultPoi)

`resultsList` 检索出来的对象列表集合

***

开发环境js加载顺序说明:
1.  `init.js`   百度初始化内容
2.  `var.js`    声明变量部分
3.  `function`  函数部分
4.  `start`     页面开始执行

jquey-script    jQuery脚本
