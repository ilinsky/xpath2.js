/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

(function() {

	var source	= [],
		scripts	= document.getElementsByTagName("script"),
		path	= scripts[scripts.length-1].src.replace(/\/?[^\/]+$/, '/'),
		cXMLHttpRequest	= window.XMLHttpRequest || function() {
			return new ActiveXObject("Microsoft.XMLHTTP");
		};

	// get files list
	var oRequest	= new cXMLHttpRequest;
	oRequest.open("GET", path + ".files", false);
	oRequest.send(null);
	var files	= oRequest.responseText.split(/\n/g);

	// Add export
	files.push("export.js");

	// load files
	for (var n = 0, file; n < files.length; n++) {
		if ((file = files[n].replace(/^\s+/, "").replace(/\s+$/, "")) != '' && file.substr(0, 1) != "#") {
			var oRequest	= new cXMLHttpRequest;
			oRequest.open("GET", path + file, false);
			oRequest.send(null);
			source[source.length]	= oRequest.responseText;
		}
	}
	var oScript	= document.getElementsByTagName("head")[0].appendChild(document.createElement("script"));
	oScript.type	= "text/javascript";
	oScript.text	= 	"" +
						"(function(){" +
							source.join("\n") +
						"})()" +
						"";
	oScript.parentNode.removeChild(oScript);
})();
