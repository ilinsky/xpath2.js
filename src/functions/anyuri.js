/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../classes/Exception');

var hTypes = require('./../types');

//
var cXSString = hTypes.XSString;
var cXSAnyURI = hTypes.XSAnyURI;

var fStaticContext_defineSystemFunction = require('./../classes/StaticContext').defineSystemFunction;

/*
	8 Functions on anyURI
		resolve-uri
*/

// fn:resolve-uri($relative as xs:string?) as xs:anyURI?
// fn:resolve-uri($relative as xs:string?, $base as xs:string) as xs:anyURI?
fStaticContext_defineSystemFunction("resolve-uri",	[[cXSString, '?'], [cXSString, '', true]],	function(sUri, sBaseUri) {
	if (arguments.length < 2) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "resolve-uri() function called when the context item is not a node"
//<-Debug
			);
		sBaseUri	= new cXSString(this.DOMAdapter.getProperty(this.item, "baseURI") || '');
	}

	if (sUri == null)
		return null;

	//
	if (sUri.valueOf() == '' || sUri.valueOf().charAt(0) == '#')
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
