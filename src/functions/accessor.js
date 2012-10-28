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
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (!oSequence1.items.length)
		return oSequence;
	//
	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.isNode(oNode)) {
		switch (cXPath2.DOMAdapter.getProperty(oNode, "nodeType")) {
			case 1:	// ELEMENT_NAME
			case 2:	// ATTRIBUTE_NODE
				oSequence.add(new cXSQName(cXPath2.DOMAdapter.getProperty(oNode, "prefix"), cXPath2.DOMAdapter.getProperty(oNode, "localName"), cXPath2.DOMAdapter.getProperty(oNode, "namespaceURI")));
				break;
			case 5:	// ENTITY_REFERENCE_NODE
				throw "Not implemented";
			case 6:	// ENTITY_NODE
				throw "Not implemented";
			case 7:	// PROCESSING_INSTRUCTION_NODE
				oSequence.add(new cXSQName(null, cXPath2.DOMAdapter.getProperty(oNode, "target"), null));
				break;
			case 10:// DOCUMENT_TYPE_NODE
				oSequence.add(new cXSQName(null, cXPath2.DOMAdapter.getProperty(oNode, "name"), null));
				break;
		}
	}
	//
	return oSequence;
};

// fn:nilled($arg as node()?) as xs:boolean?
cFunctionCall.functions["nilled"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (!oSequence1.items.length)
		return oSequence;

	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.isNode(oNode) && cXPath2.DOMAdapter.getProperty(oNode, "nodeType") == 1)
		oSequence.add(false);	// TODO: Detrmine if node is nilled

	return oSequence;
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
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return cXPath2Sequence.atomize(oSequence1);
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
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	//
	var oNode	= oSequence1.items[0];
	if (cXPath2.DOMAdapter.isNode(oNode) && cXPath2.DOMAdapter.getProperty(oNode, "nodeType") == 9)
		oSequence.add(cXPath2.DOMAdapter.getProperty(oNode, "documentURI"));
	//
	return oSequence;
};