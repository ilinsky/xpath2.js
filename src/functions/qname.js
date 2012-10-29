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
cFunctionCall.functions["resolve-QName"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sQName	= oSequence1.toString(),
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	if (oSequence2.isEmpty())
		return new cXPath2Sequence;

	return new cXPath2Sequence(new cXSQName(sPrefix, sLocalName, cXPath2.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix || "")));
};

// fn:QName($paramURI as xs:string?, $paramQName as xs:string) as xs:QName
cFunctionCall.functions["QName"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sQName	= oSequence2.toString(),
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	// TODO: Implement QName type
	return new cXPath2Sequence(new cXSQName(sPrefix, sLocalName, oSequence1.toString()));
};

// 11.2 Functions Related to QNames
// fn:prefix-from-QName($arg as xs:QName?) as xs:NCName?
cFunctionCall.functions["prefix-from-QName"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty())
		return oSequence;

	if (!(oSequence1.items[0] instanceof cXSQName))
		throw new cXPath2Error("XPST0017");

	if (oSequence1.items[0].prefix)
		oSequence.add(oSequence1.items[0].prefix);

	return oSequence;
};

// fn:local-name-from-QName($arg as xs:QName?) as xs:NCName?
cFunctionCall.functions["local-name-from-QName"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	if (!(oSequence1.items[0] instanceof cXSQName))
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(oSequence1.items[0].localName);
};

// fn:namespace-uri-from-QName($arg as xs:QName?) as xs:anyURI?
cFunctionCall.functions["namespace-uri-from-QName"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	if (!(oSequence1.items[0] instanceof cXSQName))
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(oSequence1.items[0].namespaceURI);
};

// fn:namespace-uri-for-prefix($prefix as xs:string?, $element as element()) as xs:anyURI?
cFunctionCall.functions["namespace-uri-for-prefix"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sQName	= oSequence1.toString(),
		aQName	= sQName.split(':'),
		sLocalName	= aQName.pop(),
		sPrefix	= aQName.pop() || null;

	if (oSequence2.isEmpty())
		return new cXPath2Sequence;

	return new cXPath2Sequence(cXPath2.DOMAdapter.lookupNamespaceURI(oSequence2.items[0], sPrefix || ""));
};

// fn:in-scope-prefixes($element as element()) as xs:string*
cFunctionCall.functions["in-scope-prefixes"]	= function(oSequence1) {
	throw "Function '" + "in-scope-prefixes" + "' not implemented";
};
