function screenList(){this.defaultAnchor=BMAP_ANCHOR_TOP_LEFT,this.defaultOffset=new BMap.Size(10,10)}var map=new BMap.Map("allmap"),mPoint=new BMap.Point(120.3845,36.071702);map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_SMALL})),map.enableScrollWheelZoom(),map.centerAndZoom(mPoint,15);var circle=new BMap.Circle(mPoint,1e3,{fillColor:"#FF2725",strokeWeight:2,strokeColor:"#FF2725",fillOpacity:.07,strokeOpacity:1});map.addOverlay(circle),screenList.prototype=new BMap.Control,screenList.prototype.initialize=function(e){var o=document.createElement("ul"),a="hahahaha";return o.id="ulList",o.appendChild(a),o.style.cursor="pointer",o.style.border="1px solid gray",o.style.backgroundColor="white",o.onclick=function(o){e.setZoom(e.getZoom()+2)},e.getContainer().appendChild(o),o};var myZoomCtrl=new screenList;map.addControl(myZoomCtrl);var local=new BMap.LocalSearch(map,{renderOptions:{map:map,autoViewport:!1}});local.searchNearby("公交",mPoint,1e3);