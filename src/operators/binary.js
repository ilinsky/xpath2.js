/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var fStaticContext_defineSystemOperator = require('./../classes/StaticContext').defineSystemOperator;
var hTypes = require('./../types');

//
var cXSBoolean = hTypes.XSBoolean;

/*
	12.1 Comparisons of base64Binary and hexBinary Values
		op:hexBinary-equal
		op:base64Binary-equal
*/
fStaticContext_defineSystemOperator("hexBinary-equal", function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
});

fStaticContext_defineSystemOperator("base64Binary-equal", function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
});
