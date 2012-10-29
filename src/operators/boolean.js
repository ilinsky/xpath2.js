/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	9.2 Operators on Boolean Values
		op:boolean-equal
		op:boolean-less-than
		op:boolean-greater-than
*/

// 9.2 Operators on Boolean Values
// op:boolean-equal($value1 as xs:boolean, $value2 as xs:boolean) as xs:boolean
cFunctionCall.operators["boolean-equal"]	= function(oLeft, oRight) {
	return oLeft == oRight;
};

// op:boolean-less-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
cFunctionCall.operators["boolean-less-than"]	= function(oLeft, oRight) {
	return oLeft < oRight;
};

// op:boolean-greater-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
cFunctionCall.operators["boolean-greater-than"]	= function(oLeft, oRight) {
	return oLeft > oRight;
};