/*
 * This file contains JsUnitClient driver, which is used in order
 * to enable inclusion of required resources for tests to run.
 *
 */

var JsUnitClient	= (function() {

	var sBaseUriUnitJs	= '../../../unit.js/';
	var sBaseUriInclude	= '../../../xpath.js/';	// Source version

	function fGetUriComponents(sUri) {
		var aResult	= sUri.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?/);
		return [aResult[2], aResult[4], aResult[5], aResult[7], aResult[9]];
	};

	function fResolveUri(sUri, sBaseUri) {
		if (sUri == '' || sUri.charAt(0) == '#')
			return sBaseUri;

		var aUri = fGetUriComponents(sUri);
		if (aUri[0])	// scheme
			return sUri;

		var aBaseUri = fGetUriComponents(sBaseUri);
		aUri[0] = aBaseUri[0];	// scheme

		if (!aUri[1]) {
			// authority
			aUri[1] = aBaseUri[1];

			// path
			if (aUri[2].charAt(0) != '/') {
				var aUriSegments = aUri[2].split('/'),
					aBaseUriSegments = aBaseUri[2].split('/');
				aBaseUriSegments.pop();
				var nBaseUriStart = aBaseUriSegments[0] == '' ? 1 : 0;
				for (var nIndex = 0, nLength = aUriSegments.length; nIndex < nLength; nIndex++) {
					if (aUriSegments[nIndex] == '..') {
						if (aBaseUriSegments.length > nBaseUriStart)
							aBaseUriSegments.pop();
						else {
							aBaseUriSegments.push(aUriSegments[nIndex]);
							nBaseUriStart++;
						}
					}
					else
					if (aUriSegments[nIndex] != '.')
						aBaseUriSegments.push(aUriSegments[nIndex]);
				}
				if (aUriSegments[--nIndex] == '..' || aUriSegments[nIndex] == '.')
					aBaseUriSegments.push('');
				aUri[2]	= aBaseUriSegments.join('/');
			}
		}

		var aResult = [];
		if (aUri[0])
			aResult.push(aUri[0] + ':');
		if (aUri[1])
			aResult.push('/' + '/' + aUri[1]);
		if (aUri[2])
			aResult.push(aUri[2]);
		if (aUri[3])
			aResult.push('?' + aUri[3]);
		if (aUri[4])
			aResult.push('#' + aUri[4]);

		return aResult.join('');
	};

	// Get client base Uri
	var sBaseUriClient	= (function() {var aScripts	= document.getElementsByTagName("script"); return fResolveUri(aScripts[aScripts.length - 1].src, document.location.href)})();

	function fWriteScript(sUrl) {
		document.write('<script type="text/javascript" src="' + fResolveUri(sUrl, sBaseUriClient) + '"></script>');
	};

	function fWriteStyleSheet(sUrl) {
		document.write('<link type="text/ample+css" href="' + fResolveUri(sUrl, sBaseUriClient) + '" rel="stylesheet" />');
	};

	// JsUnit resources
	fWriteScript(sBaseUriUnitJs + 'app/jsUnitCore.js');

	// Public API
	return {
		/*
		 * Implements inclusion of Ample SDK resources
		 */
		"include":	function(sResource) {
			switch (sResource.match(/\.([a-z]+)$/)[1]) {
				case "js":
					fWriteScript(sBaseUriInclude + sResource);
					break;

				case "css":
					fWriteStyleSheet(sBaseUriInclude + sResource);
					break;
			}
		}
	};
})();
