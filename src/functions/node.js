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
		op:is-same-node
		op:node-before
		op:node-after
*/

cFunctionCall.functions["name"]	= function(oSequence) {
	throw "Not implemented";
};

cFunctionCall.functions["local-name"]	= function(oSequence) {
	throw "Not implemented";
};

cFunctionCall.functions["namespace-uri"]	= function(oSequence) {
	throw "Not implemented";
};

// fn:number() as xs:double
// fn:number($arg as xs:anyAtomicType?) as xs:double
cFunctionCall.functions["number"]	= function(/*[*/oSequence/*]*/) {
	if (!arguments.length)
		oSequence	= new cXPath2Sequence(this.context);
	return new cXPath2Sequence(oSequence.toNumber());
};

// fn:lang($testlang as xs:string?) as xs:boolean
// fn:lang($testlang as xs:string?, $node as node()) as xs:boolean
cFunctionCall.functions["lang"]	= function(oSequence) {
	throw "Not implemented";
};

cFunctionCall.functions["root"]	= function() {
	var oParent	= this.context;
	for (var oNode = oParent; oNode; oNode = cXPath2.DOMAdapter.getProperty(oParent, "parentNode"))
		oParent	= oNode;

	return new cXPath2Sequence(oParent);
};