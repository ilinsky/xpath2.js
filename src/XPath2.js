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
cXPath2.evaluate	= function(oNode, sExpression/*[[*/, oResolver/*],*/, oScope/*]*/) {
	return new cXPath2Parser().parse(sExpression, oResolver).evaluate(new cXPath2Context(oNode, oScope)).items;
};