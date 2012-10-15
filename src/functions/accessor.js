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

// fn:string() as xs:string
// fn:string($arg as item()?) as xs:string
cFunctionCall.functions["string"]	= function(/*[*/oSequence/*]*/) {
	if (!arguments.length)
		oSequence	= new cXPath2Sequence(this.sequence.items[this.position - 1]);
	return new cXPath2Sequence(oSequence.toString());
};