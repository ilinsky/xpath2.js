/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	14 Functions and Operators on Nodes
		name
		local-name
		namespace-uri
		number
		lang
		root

*/

// 14 Functions on Nodes
// fn:name() as xs:string
// fn:name($arg as node()?) as xs:string
fFunctionCall_defineSystemFunction("name",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.staticContext.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "name() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return '';
	//
	var vValue	= cFunctionCall.functions["node-name"].call(this, oSequence1);
	return vValue === null ? '' : vValue.toString(this);
});

// fn:local-name() as xs:string
// fn:local-name($arg as node()?) as xs:string
fFunctionCall_defineSystemFunction("local-name",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.staticContext.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "local-name() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return '';
	//
	return this.staticContext.DOMAdapter.getProperty(oSequence1.items[0], "localName") || '';
});

// fn:namespace-uri() as xs:anyURI
// fn:namespace-uri($arg as node()?) as xs:anyURI
fFunctionCall_defineSystemFunction("namespace-uri",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.staticContext.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "namespace-uri() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return '';
	//
	return this.staticContext.DOMAdapter.getProperty(oSequence1.items[0], "namespaceURI") || '';
});

// fn:number() as xs:double
// fn:number($arg as xs:anyAtomicType?) as xs:double
fFunctionCall_defineSystemFunction("number",	[[cXSAnyAtomicType, '?', true]],	function(/*[*/oSequence1/*]*/) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.item);

	// If input item cannot be cast to xs:decimal, a NaN should be returned
	var vValue	= nNaN;
	if (!oSequence1.isEmpty()) {
		try {
			vValue	= cXSDouble.cast(oSequence1.items[0]);
		}
		catch (e) {

		}
	}
	return vValue;
});

// fn:lang($testlang as xs:string?) as xs:boolean
// fn:lang($testlang as xs:string?, $node as node()) as xs:boolean
fFunctionCall_defineSystemFunction("lang",	[[cXSString, '?'], [cXTNode, '?', true]],	function(oSequence1) {
	throw "Funciton '" + "lang" + "' not implemented";
});

// fn:root() as node()
// fn:root($arg as node()?) as node()?
fFunctionCall_defineSystemFunction("root",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.staticContext.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "root() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return null;

	var oParent	= oSequence1.items[0];

	// If context node is Attribute
	if (this.staticContext.DOMAdapter.getProperty(oParent, "nodeType") == 2)
		oParent	= this.staticContext.DOMAdapter.getProperty(oParent, "ownerElement");

	for (var oNode = oParent; oNode; oNode = this.staticContext.DOMAdapter.getProperty(oParent, "parentNode"))
		oParent	= oNode;

	return oParent;
});
