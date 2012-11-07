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
cFunctionCall.functions["name"]	= function(oSequence1) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	else
	if (oSequence1.isEmpty())
		return '';
	//
	var oNode	= oSequence1.items[0];
	if (!cXPath2.DOMAdapter.isNode(oNode))
		throw new cXPath2Error("XPTY0004");
	//
	var vValue	= cFunctionCall.functions["node-name"].call(this, oSequence1);
	return vValue === null ? '' : vValue.toString();
};

// fn:local-name() as xs:string
// fn:local-name($arg as node()?) as xs:string
cFunctionCall.functions["local-name"]	= function(oSequence1) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	else
	if (oSequence1.isEmpty())
		return '';
	//
	var oNode	= oSequence1.items[0];
	if (!cXPath2.DOMAdapter.isNode(oNode))
		throw new cXPath2Error("XPTY0004");
	//
	return cXPath2.DOMAdapter.getProperty(oNode, "localName");
};

// fn:namespace-uri() as xs:anyURI
// fn:namespace-uri($arg as node()?) as xs:anyURI
cFunctionCall.functions["namespace-uri"]	= function(oSequence1) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	else
	if (oSequence1.isEmpty())
		return '';
	//
	var oNode	= oSequence1.items[0];
	if (!cXPath2.DOMAdapter.isNode(oNode))
		throw new cXPath2Error("XPTY0004");
	//
	return cXPath2.DOMAdapter.getProperty(oNode, "namespaceURI");
};

// fn:number() as xs:double
// fn:number($arg as xs:anyAtomicType?) as xs:double
cFunctionCall.functions["number"]	= function(/*[*/oSequence1/*]*/) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(this.context);
	//
	return oSequence1.toNumber();
};

// fn:lang($testlang as xs:string?) as xs:boolean
// fn:lang($testlang as xs:string?, $node as node()) as xs:boolean
cFunctionCall.functions["lang"]	= function(oSequence1) {
	throw "Funciton '" + "lang" + "' not implemented";
};

// fn:root() as node()
// fn:root($arg as node()?) as node()?
cFunctionCall.functions["root"]	= function(oSequence1) {
	var oParent	= arguments.length ? oSequence1.items[0] : this.context;

	if (!cXPath2.DOMAdapter.isNode(oParent))
		throw new cXPath2Error("XPTY0004");

	// If context node is Attribute
	if (cXPath2.DOMAdapter.getProperty(oParent, "nodeType") == 2)
		oParent	= cXPath2.DOMAdapter.getProperty(oParent, "ownerElement");

	for (var oNode = oParent; oNode; oNode = cXPath2.DOMAdapter.getProperty(oParent, "parentNode"))
		oParent	= oNode;

	return oParent;
};
