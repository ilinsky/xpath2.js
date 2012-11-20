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
fStaticContext_defineSystemFunction("node-name",		[[cXTNode, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;
	//
	var oNode	= oSequence1.items[0];
	switch (this.DOMAdapter.getProperty(oNode, "nodeType")) {
		case 1:		// ELEMENT_NAME
		case 2:		// ATTRIBUTE_NODE
			return new cXSQName(this.DOMAdapter.getProperty(oNode, "prefix"), this.DOMAdapter.getProperty(oNode, "localName"), this.DOMAdapter.getProperty(oNode, "namespaceURI"));
		case 5:		// ENTITY_REFERENCE_NODE
			throw "Not implemented";
		case 6:		// ENTITY_NODE
			throw "Not implemented";
		case 7:		// PROCESSING_INSTRUCTION_NODE
			return new cXSQName(null, this.DOMAdapter.getProperty(oNode, "target"), null);
		case 10:	// DOCUMENT_TYPE_NODE
			return new cXSQName(null, this.DOMAdapter.getProperty(oNode, "name"), null);
	}
	//
	return null;
});

// fn:nilled($arg as node()?) as xs:boolean?
fStaticContext_defineSystemFunction("nilled",	[[cXTNode, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;

	var oNode	= oSequence1.items[0];
	if (this.DOMAdapter.getProperty(oNode, "nodeType") == 1)
		return new cXSBoolean(false);	// TODO: Determine if node is nilled

	return null;
});

// fn:string() as xs:string
// fn:string($arg as item()?) as xs:string
fStaticContext_defineSystemFunction("string",	[[cXTItem, '?', true]],	function(/*[*/oSequence1/*]*/) {
	if (!arguments.length)
		oSequence1	= new cSequence(this.item);
	return oSequence1.isEmpty() ? new cXSString('') : cXSString.cast(fXTItem_atomize(oSequence1.items[0], this));
});

// fn:data($arg as item()*) as xs:anyAtomicType*
fStaticContext_defineSystemFunction("data",	[[cXTItem, '*']],		function(oSequence1) {
	return fSequence_atomize(oSequence1, this);
});

// fn:base-uri() as xs:anyURI?
// fn:base-uri($arg as node()?) as xs:anyURI?
fStaticContext_defineSystemFunction("base-uri",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "base-uri() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cSequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return null;
	//
	return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oSequence1.items[0], "baseURI") || ''));
});

// fn:document-uri($arg as node()?) as xs:anyURI?
fStaticContext_defineSystemFunction("document-uri",	[[cXTNode, '?']],	function(oSequence1) {
	if (oSequence1.isEmpty())
		return null;
	//
	var oNode	= oSequence1.items[0];
	if (this.DOMAdapter.getProperty(oNode, "nodeType") == 9)
		return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oNode, "documentURI") || ''));
	//
	return null;
});