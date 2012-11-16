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
fXPath2StaticContext_defineSystemFunction("resolve-uri",	[[cXSString, '?'], [cXSString, '', true]],	function(oSequence1, oSequence2) {
	var sBaseUri;
	if (arguments.length < 2) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "resolve-uri() function called when the context item is not a node"
//<-Debug
			);
		sBaseUri	= new cXSString(this.DOMAdapter.getProperty(this.item, "baseURI") || '');
	}
	else
		sBaseUri	= oSequence2.items[0];

	if (oSequence1.isEmpty())
		return null;

	//
	var sUri	= oSequence1.items[0];
	if (sUri.value == '' || sUri.value.charAt(0) == '#')
		return cXSAnyURI.cast(sBaseUri);

	var oUri	= cXSAnyURI.cast(sUri);
	if (oUri.scheme)
		return oUri;

	var oBaseUri	= cXSAnyURI.cast(sBaseUri);
	oUri.scheme	= oBaseUri.scheme;

	if (!oUri.authority) {
		// authority
		oUri.authority	= oBaseUri.authority;

		// path
		if (oUri.path.charAt(0) != '/') {
			var aUriSegments		= oUri.path.split('/'),
				aBaseUriSegments	= oBaseUri.path.split('/');
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
			//
			oUri.path	= aBaseUriSegments.join('/');
		}
	}

	return oUri;
});