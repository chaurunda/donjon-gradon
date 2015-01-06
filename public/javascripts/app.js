/*Set size for all canvas */

var canvases = document.getElementsByTagName('canvas'),
    body = document.getElementsByTagName('body');
for (var i = 0; i < canvases.length; i++) {
    canvases[i].width = 512;
    canvases[i].height = 320;
}

function getXMLHttpRequest() {
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	return xhr;
}