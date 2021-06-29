// ==UserScript==
// @name       TOO CLOSE HELPER
// @namespace   asdfsadvcwcwvqw
// @match          https://intel.ingress.com/*
// @author lokpro
// @updateURL  https://github.com/Ingrass/IITC-PortalTooCloseHelp/raw/master/IITC_tooCloseHelper.user.js
// @downloadURL  https://github.com/Ingrass/IITC-PortalTooCloseHelp/raw/master/IITC_tooCloseHelper.user.js
// @version     1.3
// @grant       none
// ==/UserScript==

setTimeout( function(){

var W_PANE = 500;
var W_SIDE = 30;

function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
      if ( div.children[0].tagName == 'LINK' ) {
          // Create an actual link element to append later
          style = document.createElement('link');
          style.href = div.children[0].href;
          // append your other things like rel, type, etc
          el.appendChild(style);
      }
      el.appendChild(div.children[0]);
  }
}

appendHtml( document.body, ' \
<div id="Panel_tooClose"> \
	TOO CLOSE HELPER <br> \
	<button onclick="show20mRange()">show 20m circles</button> \
	<button onclick="addTestPoint20m()">add test point 20m</button> \
	<button onclick="addTestPoint40m()">add test point 40m</button> \
	<div id="div_notification_icons" style="position:absolute; left:0; top:0; height:100%; width:'+(W_SIDE+3)+'px; overflow-wrap:break-word; text-align: center; background-color:#1a5757"><span style="font-size:20px">⦾</span></div> \
	<style> \
		#Panel_tooClose { border:1px solid #71ffff; color:#71ffff; background-color:#013030; position:fixed; z-index:99999; overflow-y:auto; bottom:100px; left: calc(100% - '+W_SIDE+'px); max-width:95%; width:'+W_PANE+'px; height:30px; padding:0px; padding-left:'+(W_SIDE+3)+'px; } \
		#Panel_tooClose:hover { right:0px; left: unset; padding-left:0px; height:100px; } \
		#Panel_tooClose:hover > #div_notification_icons { display: none;} \
		#Panel_tooClose button { height: 30px; } \
		#div_notification_icons>p { padding-bottom:4px; margin-bottom:6px; line-height:0.92em; background-color:#012020; } \
	</style>'
);


window.show20mRange = function(){
	var displayBounds = map.getBounds();
	$.each(window.portals, function(i, portal) {
		let coord = portal.getLatLng();
		if( displayBounds.contains(coord)){
			L.circle(coord, 20,
				{ fill: "#F423", color: "#F42", weight: 1, clickable: false }
			).addTo(map);
			//L.circle(coord, 30,
			//	{ fill: false, color: "#AF0", weight: 2, clickable: false }
			//).addTo(map);
		}
	});
}

window.addTestPoint20m = function(){
	var c = map.getCenter();
	addCustomPoint( c, 20, { color: "#24B", weight: 1 } );
}

window.addTestPoint40m = function(){
	var c = map.getCenter();
	addCustomPoint( c, 40, { color: "#BA4", weight: 3, opacity: 0.8, fillOpacity:0.07 } );
}

window.addCustomPoint = function( coord, meter, options ){
	var c = L.circle( coord, meter,
		options
	).addTo(map);
	
	var m = L.marker( coord ,
		{ draggable: true, icon: new L.Icon.Default() }
	).addTo(map)
	.on('dragend', function(e){
		var coords = e.target.getLatLng();
		c.setLatLng( coords );
	});
}

}, 5000);
