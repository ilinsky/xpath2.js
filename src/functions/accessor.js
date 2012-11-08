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
fFunctionCall_defineSystemFunction("node-name",		[[cXTNode, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;
	//
	var oNode	= oSequence1.items[0];
	switch (cXPath2.DOMAdapter.getProperty(oNode, "nodeType")) {
		case 1:	// ELEMENT_NAME
		case 2:	// ATTRIBUTE_NODE
			return new cXSQName(cXPath2.DOMAdapter.getProperty(oNode, "prefix"), cXPath2.DOMAdapter.getProperty(oNode, "localName"), cXPath2.DOMAdapter.getProperty(oNode, "namespaceURI"));
		case 5:	// ENTITY_REFERENCE_NODE
			throw "Not implemented";
		case 6:	// ENTITY_NODE
			throw "Not implemented";
		case 7:	// PROCESSING_INSTRUCTION_NODE
			return new cXSQName(null, cXPath2.DOMAdapter.getProperty(oNode, "target"), null);
		case 10:// DOCUMENT_TYPE_NODE
			return new cXSQName(null, cXPath2.DOMAdapter.getProperty(oNode, "name"), null);
	}
	//
	return null;
});

// fn:nilled($arg as node()?) as xs:boolean?
fFunctionCall_defineSystemFunction("nilled",	[[cXTNode, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;

	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.getProperty(oNode, "nodeType") == 1)
		return false;	// TODO: Determine if node is nilled

	return null;
});

// fn:string() as xs:string
// fn:string($arg as item()?) as xs:string
fFunctionCall_defineSystemFunction("string",	[[cXTItem, '?', true]],	function(/*[*/oSequence1/*]*/) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	return oSequence1.toString();
});

// fn:data($arg as item()*) as xs:anyAtomicType*
fFunctionCall_defineSystemFunction("data",	[[cXTItem, '*']],		function(oSequence1) {
	return cXPath2Sequence.atomize(oSequence1);
});

// fn:base-uri() as xs:anyURI?
// fn:base-uri($arg as node()?) as xs:anyURI?
fFunctionCall_defineSystemFunction("base-uri",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!cXPath2.DOMAdapter.isNode(this.context))
			throw new cXPath2Error("XPTY0004", "base-uri() function called when the context item is not a node");
		oSequence1	= new cXPath2Sequence(this.context);
	}
	else
	if (oSequence1.isEmpty())
		return null;
	//
	return cXPath2.DOMAdapter.getProperty(oSequence1.items[0], "baseURI");
});

// fn:document-uri($arg as node()?) as xs:anyURI?
fFunctionCall_defineSystemFunction("document-uri",	[[cXTNode, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;
	//
	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.getProperty(oNode, "nodeType") == 9)
		return cXPath2.DOMAdapter.getProperty(oNode, "documentURI");
	//
	return null;
});