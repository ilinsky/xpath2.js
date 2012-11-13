/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	6.2 Operators on Numeric Values
		op:numeric-add
		op:numeric-subtract
		op:numeric-multiply
		op:numeric-divide
		op:numeric-integer-divide
		op:numeric-mod
		op:numeric-unary-plus
		op:numeric-unary-minus

	6.3 Comparison Operators on Numeric Values
		op:numeric-equal
		op:numeric-less-than
		op:numeric-greater-than
*/

// 6.2 Operators on Numeric Values
var rFunctionCall_numeric_regExp	= /^-?\d+?(?:\.(\d*))?(?:[eE]([+-])?(\d+))?$/;
function fFunctionCall_numeric_getPower(a, b) {
	if (fIsNaN(a) || (cMath.abs(a) == nInfinity) || fIsNaN(b) || (cMath.abs(b) == nInfinity))
		return 0;
	var d	= cString(a).match(rFunctionCall_numeric_regExp),
		e	= cString(b).match(rFunctionCall_numeric_regExp),
		c	= cMath.max(1, (d[1] || '').length + (d[3] || 0) * (d[2] == '+' ?-1 : 1), (e[1] || '').length + (e[3] || 0) * (e[2] == '+' ?-1 : 1));
	return c + (c % 2 ? 0 : 1);
};

// op:numeric-add($arg1 as numeric, $arg2 as numeric) as numeric
hXPath2StaticContext_operators["numeric-add"]		= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) + (oRight * c))/c;
};

// op:numeric-subtract($arg1 as numeric, $arg2 as numeric) as numeric
hXPath2StaticContext_operators["numeric-subtract"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) - (oRight * c))/c;
};

// op:numeric-multiply($arg1 as numeric, $arg2 as numeric) as numeric
hXPath2StaticContext_operators["numeric-multiply"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) * (oRight * c))/(c * c);
};

// op:numeric-divide($arg1 as numeric, $arg2 as numeric) as numeric
hXPath2StaticContext_operators["numeric-divide"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return (oLeft * c) / (oRight * c);
};

// op:numeric-integer-divide($arg1 as numeric, $arg2 as numeric) as xs:integer
hXPath2StaticContext_operators["numeric-integer-divide"]	= function(oLeft, oRight) {
	return ~~(oLeft / oRight);
};

// op:numeric-mod($arg1 as numeric, $arg2 as numeric) as numeric
hXPath2StaticContext_operators["numeric-mod"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) % (oRight * c)) / c;
};

// op:numeric-unary-plus($arg as numeric) as numeric
hXPath2StaticContext_operators["numeric-unary-plus"]	= function(oRight) {
	return oRight;
};

// op:numeric-unary-minus($arg as numeric) as numeric
hXPath2StaticContext_operators["numeric-unary-minus"]	= function(oRight) {
	return -oRight;
};


// 6.3 Comparison Operators on Numeric Values
// op:numeric-equal($arg1 as numeric, $arg2 as numeric) as xs:boolean
hXPath2StaticContext_operators["numeric-equal"]	= function(oLeft, oRight) {
	return oLeft == oRight;
};

// op:numeric-less-than($arg1 as numeric, $arg2 as numeric) as xs:boolean
hXPath2StaticContext_operators["numeric-less-than"]	= function(oLeft, oRight) {
	return oLeft < oRight;
};

// op:numeric-greater-than($arg1 as numeric, $arg2 as numeric) as xs:boolean
hXPath2StaticContext_operators["numeric-greater-than"]	= function(oLeft, oRight) {
	return oLeft > oRight;
};