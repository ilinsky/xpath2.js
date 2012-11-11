/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	8 Functions on anyURI
		resolve-uri
*/

// fn:resolve-uri($relative as xs:string?) as xs:anyURI?
// fn:resolve-uri($relative as xs:string?, $base as xs:string) as xs:anyURI?
fFunctionCall_defineSystemFunction("resolve-uri",	[[cXSString, '?'], [cXSString, '', true]],	function(oSequence1, oSequence2) {
	var sBaseUri;
	if (arguments.length < 2) {
		if (!cXPath2.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "resolve-uri() function called when the context item is not a node"
//<-Debug
			);
		sBaseUri	= cXPath2.DOMAdapter.getProperty(this.item, "baseURI");
	}
	else
		sBaseUri	= oSequence2.items[0];

	if (oSequence1.isEmpty())
		return null;
	//
	return fFunctionCall_anyuri_resolveUri(oSequence1.items[0], sBaseUri);
});

var hFunctionCall_anyuri_cache	= {};
/*
 * Returns an array of uri components:
 * [scheme, authority, path, query, fragment]
 */
function fFunctionCall_anyuri_getUriComponents(sUri) {
	var aResult	= hFunctionCall_anyuri_cache[sUri] ||(hFunctionCall_anyuri_cache[sUri] = sUri.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/));
	return [aResult[1], aResult[3], aResult[5], aResult[6], aResult[8]];
};

function fFunctionCall_anyuri_resolveUri(sUri, sBaseUri) {
	if (sUri == '' || sUri.charAt(0) == '#')
		return sBaseUri;

	var aUri	= fFunctionCall_anyuri_getUriComponents(sUri);
	if (aUri[0])	// scheme
		return sUri;

	var aBaseUri	= fFunctionCall_anyuri_getUriComponents(sBaseUri);
	aUri[0]	= aBaseUri[0];	// scheme

	if (!aUri[1]) {
		// authority
		aUri[1]	= aBaseUri[1];

		// path
		if (aUri[2].charAt(0) != '/') {
			var aUriSegments		= aUri[2].split('/'),
				aBaseUriSegments	= aBaseUri[2].split('/');
			aBaseUriSegments.pop();

			var nBaseUriStart	= aBaseUriSegments[0] == '' ? 1 : 0;
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

	var aResult	= [];
	if (aUri[0])
		aResult.push(aUri[0]);
	if (aUri[1])	// '//'
		aResult.push(aUri[1]);
	if (aUri[2])
		aResult.push(aUri[2]);
	if (aUri[3])	// '?'
		aResult.push(aUri[3]);
	if (aUri[4])	// '#'
		aResult.push(aUri[4]);

	return aResult.join('');
};