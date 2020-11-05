/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var hStaticContext_operators = require('./../classes/StaticContext').operators;
var hTypes = require('./../types');

var cXSBoolean = hTypes.XSBoolean;

/*
	9.2 Operators on Boolean Values
		op:boolean-equal
		op:boolean-less-than
		op:boolean-greater-than
*/

// 9.2 Operators on Boolean Values
// op:boolean-equal($value1 as xs:boolean, $value2 as xs:boolean) as xs:boolean
hStaticContext_operators["boolean-equal"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

// op:boolean-less-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
hStaticContext_operators["boolean-less-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
};

// op:boolean-greater-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
hStaticContext_operators["boolean-greater-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
};
