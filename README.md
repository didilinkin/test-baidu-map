## 目录介绍
    项目目录:baidu-map/
    |
    |--node_modules/            插件安装包(不进行版本管理,自行安装)
    |
    |--src/                     开发源码
    |   |
    |   |--images/              图片源文件(未经过Gulp插件无损压缩的源文件)
    |   |
    |   |--js/                  js脚本(有jquery脚本)
    |   |
    |   |--sass/                Sass样式文件(Gulp自动控制编译)
    |   |  |
    |   |  |--map.sass          地图样式文件
    |   |
    |   |--test.html            HTML页面
    |
    |--backup/                  测试代码备份(未版本管理,用于放置测试代码)
    |
    |--dist/                    打包完成的项目目录(Gulp 与 Webpack同时管理)
    |   |
    |   |--css/                 Sass编译后样式(map.css)
    |   |
    |   |--images/              经过Gulp无损压缩的图片文件
    |   |
    |   |--js/                  经过Gulp处理的js文件(将多个js文件打包)
    |   |
    |   |--test.html            HTML页面(Gulp未处理)
    |
    |--.gitignore               非git管理内容标注
    |
    |--gulpfile.js              Gulp构建-入口文件
    |
    |--package.json             npm配置记录
    |
    |--README.md                项目描述文件
    |
    |--LICENSE                  MIT开源协议
***

# 变量名
`mPoint` :  标点位置

`myIcon` :  自定义标注样式

# 函数名
`outputListContent` (新名称) = `aOutputList` (旧名称)

`results.getNumPois()` :  检索结果的全部数值(原生方法——LocalResult周边检索)

`results.getCurrentNumPois()` : 返回当前页的结果数(原生方法——LocalResult周边检索)

`addMarker` (新名称) = `oneAddOverlay` (旧名称)
