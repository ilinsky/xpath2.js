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
fFunctionCall_defineSystemFunction("resolve-QName",	[[cXSString, '?'], [cXTElement]],	function(oSequence1, oSequence2) {
	var sQName	= oSequence1.items[0] || '',
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	if (oSequence2.isEmpty())
		return null;

	return new cXSQName(sPrefix, sLocalName, this.staticContext.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix || ""));
});

// fn:QName($paramURI as xs:string?, $paramQName as xs:string) as xs:QName
fFunctionCall_defineSystemFunction("QName",		[[cXSString, '?'], [cXSString]],	function(oSequence1, oSequence2) {
	var sQName	= oSequence2.items[0],
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	// TODO: Implement QName type
	return new cXSQName(sPrefix, sLocalName, oSequence1.items[0] || '');
});

// 11.2 Functions Related to QNames
// fn:prefix-from-QName($arg as xs:QName?) as xs:NCName?
fFunctionCall_defineSystemFunction("prefix-from-QName",			[[cXSQName, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;

	if (oSequence1.items[0].prefix)
		return oSequence1.items[0].prefix;

	return null;
});

// fn:local-name-from-QName($arg as xs:QName?) as xs:NCName?
fFunctionCall_defineSystemFunction("local-name-from-QName",		[[cXSQName, '?']],	function(oSequence1) {
	return oSequence1.items[0].localName;
});

// fn:namespace-uri-from-QName($arg as xs:QName?) as xs:anyURI?
fFunctionCall_defineSystemFunction("namespace-uri-from-QName",	[[cXSQName, '?']],	function(oSequence1) {
	return oSequence1.items[0].namespaceURI;
});

// fn:namespace-uri-for-prefix($prefix as xs:string?, $element as element()) as xs:anyURI?
fFunctionCall_defineSystemFunction("namespace-uri-for-prefix",	[[cXSString, '?'], [cXTElement]],	function(oSequence1, oSequence2) {
	var sQName	= oSequence1.items[0] || '',
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	if (oSequence2.isEmpty())
		return null;

	return this.staticContext.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix || "");
});

// fn:in-scope-prefixes($element as element()) as xs:string*
fFunctionCall_defineSystemFunction("in-scope-prefixes",	[[cXTElement]],	function(oSequence1) {
	throw "Function '" + "in-scope-prefixes" + "' not implemented";
});
