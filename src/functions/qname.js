/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	11.1 Additional Constructor Functions for QNames
		resolve-QName
		QName

	11.2 Functions and Operators Related to QNames
		prefix-from-QName
		local-name-from-QName
		namespace-uri-from-QName
		namespace-uri-for-prefix
		in-scope-prefixes

*/

// 11.1 Additional Constructor Functions for QNames
// fn:resolve-QName($qname as xs:string?, $element as element()) as xs:QName?
fStaticContext_defineSystemFunction("resolve-QName",	[[cXSString, '?'], [cXTElement]],	function(oSequence1, oSequence2) {
	if (oSequence1.isEmpty())
		return null;

	var sQName	= oSequence1.items[0].valueOf(),
		aMatch	= sQName.match(cXSQName.RegExp);
	if (!aMatch)
		throw new cException("FOCA0002"
//->Debug
				, "Invalid QName '" + sQName + "'"
//<-Debug
		);

	var sPrefix	= aMatch[1] || null,
		sLocalName	= aMatch[2],
		sNameSpaceURI;
	if (sPrefix == null)
		sNameSpaceURI = this.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix);
	else {
		sNameSpaceURI = this.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix);
		if (!sNameSpaceURI)
			throw new cException("FONS0004"
//->Debug
					, "Namespace prefix '" + sPrefix + "' has not been declared"
//<-Debug
			);
	}

	return new cXSQName(sPrefix, sLocalName, sNameSpaceURI || null);
});

// fn:QName($paramURI as xs:string?, $paramQName as xs:string) as xs:QName
fStaticContext_defineSystemFunction("QName",		[[cXSString, '?'], [cXSString]],	function(oSequence1, oSequence2) {
	var sQName	= oSequence2.items[0].valueOf(),
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	return new cXSQName(sPrefix, sLocalName, oSequence1.isEmpty() ? '' : oSequence1.items[0].valueOf());
});

// 11.2 Functions Related to QNames
// fn:prefix-from-QName($arg as xs:QName?) as xs:NCName?
fStaticContext_defineSystemFunction("prefix-from-QName",			[[cXSQName, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;

	if (oSequence1.items[0].prefix)
		return new cXSNCName(oSequence1.items[0].prefix);

	return null;
});

// fn:local-name-from-QName($arg as xs:QName?) as xs:NCName?
fStaticContext_defineSystemFunction("local-name-from-QName",		[[cXSQName, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;

	return new cXSNCName(oSequence1.items[0].localName);
});

// fn:namespace-uri-from-QName($arg as xs:QName?) as xs:anyURI?
fStaticContext_defineSystemFunction("namespace-uri-from-QName",	[[cXSQName, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;

	return cXSAnyURI.cast(new cXSString(oSequence1.items[0].namespaceURI || ''));
});

// fn:namespace-uri-for-prefix($prefix as xs:string?, $element as element()) as xs:anyURI?
fStaticContext_defineSystemFunction("namespace-uri-for-prefix",	[[cXSString, '?'], [cXTElement]],	function(oSequence1, oSequence2) {
	var sQName	= oSequence1.isEmpty() ? '' : oSequence1.items[0].valueOf(),
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix		= aQName.pop() || null,
		sNameSpaceURI	= this.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix || null);

	return sNameSpaceURI == null ? null : cXSAnyURI.cast(new cXSString(sNameSpaceURI));
});

// fn:in-scope-prefixes($element as element()) as xs:string*
fStaticContext_defineSystemFunction("in-scope-prefixes",	[[cXTElement]],	function(oSequence1) {
	throw "Function '" + "in-scope-prefixes" + "' not implemented";
});
