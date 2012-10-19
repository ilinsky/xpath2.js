/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	2 Accessors
		node-name
		nilled
		string
		data
		base-uri
		document-uri

*/

// fn:node-name($arg as node()?) as xs:QName?
cFunctionCall.functions["node-name"]	= function(oSequence1) {
	var oSequence	= new cXPath2Sequence;
	if (!oSequence1.items.length)
		return oSequence;
	//
	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.isNode(oNode))
		oSequence.add(cXPath2.DOMAdapter.getProperty(oNode, "nodeName"));
	//
	return oSequence;
};

// fn:nilled($arg as node()?) as xs:boolean?
cFunctionCall.functions["nilled"]	= function(oSequence1) {
	throw "Function 'nilled' not implemented";
};

// fn:string() as xs:string
// fn:string($arg as item()?) as xs:string
cFunctionCall.functions["string"]	= function(/*[*/oSequence1/*]*/) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	return new cXPath2Sequence(oSequence1.toString());
};

// fn:data($arg as item()*) as xs:anyAtomicType*
cFunctionCall.functions["data"]		= function(oSequence1) {
	throw "Function 'data' not implemented";
};

// fn:base-uri() as xs:anyURI?
// fn:base-uri($arg as node()?) as xs:anyURI?
cFunctionCall.functions["base-uri"]		= function(oSequence1) {
	var oSequence	= new cXPath2Sequence;
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	else
	if (!oSequence1.items.length)
		return oSequence;
	//
	var oNode	= oSequence1.items[0];
	if (!cXPath2.DOMAdapter.isNode(oNode))
		throw new cXPath2Error("XPTY0004");

	oSequence.add(cXPath2.DOMAdapter.getProperty(oNode, "baseURI"));
	//
	return oSequence;
};

// fn:document-uri($arg as node()?) as xs:anyURI?
cFunctionCall.functions["document-uri"]		= function(oSequence1) {
	var oSequence	= new cXPath2Sequence;
	//
	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.isNode(oNode) && cXPath2.DOMAdapter.getProperty(oNode, "nodeType") == 9)
		oSequence.add(cXPath2.DOMAdapter.getProperty(oNode, "documentURI"));
	//
	return oSequence;
};