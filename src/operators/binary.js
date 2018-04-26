/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../classes/StaticContext');
var hTypes = require('./../types');

//
var hStaticContext_operators = cStaticContext.operators;
var cXSBoolean = hTypes.XSBoolean;

/*
	12.1 Comparisons of base64Binary and hexBinary Values
		op:hexBinary-equal
		op:base64Binary-equal
*/
hStaticContext_operators["hexBinary-equal"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

hStaticContext_operators["base64Binary-equal"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};
