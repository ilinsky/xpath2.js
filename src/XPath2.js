/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2() {

};

cXPath2.Parser		= cXPath2Parser;
cXPath2.Context		= cXPath2Context;
cXPath2.Sequence	= cXPath2Sequence;
cXPath2.DOMAdapter	= cDOMAdapter;
//
cXPath2.evaluate	= function(sExpression/*[[[*/, oNode/*[[*/, oResolver/*[*/, oScope/*]]]*/) {
	return new cXPath2Parser().parse(sExpression, oResolver || function(sPrefix) {
		if (sPrefix == "fn")
			return "http://www.w3.org/2005/xpath-functions";
		if (sPrefix == "xs")
			return "http://www.w3.org/2001/XMLSchema";
	}).evaluate(new cXPath2Context(oNode, oScope)).items;
};

cXPath2.compile		= function(sExpression/*[*/, oResolver/*]*/) {
	return new cXPath2Parser().parse(sExpression, oResolver);
};