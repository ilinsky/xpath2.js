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

var rXSNumericLiteral = require('./../types').rXSNumericLiteral;

var cMath = Math;
var fIsNaN = isNaN;
var fIsFinite = global.isFinite;
var cString = String;

//
var cXSBoolean = hTypes.XSBoolean;
var cXSInteger = hTypes.XSInteger;
var cXSDecimal = hTypes.XSDecimal;

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
// op:numeric-add($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-add"]		= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fOperator_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) + (nRight * nPower))/nPower);
};

// op:numeric-subtract($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-subtract"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fOperator_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) - (nRight * nPower))/nPower);
};

// op:numeric-multiply($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-multiply"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fOperator_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) * (nRight * nPower))/(nPower * nPower));
};

// op:numeric-divide($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-divide"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fOperator_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, (oLeft * nPower) / (oRight * nPower));
};

// op:numeric-integer-divide($arg1 as numeric, $arg2 as numeric) as xs:integer
hStaticContext_operators["numeric-integer-divide"]	= function(oLeft, oRight) {
	var oValue = oLeft / oRight;
	return new cXSInteger(cMath.floor(oValue) + (oValue < 0));
};

// op:numeric-mod($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-mod"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fOperator_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) % (nRight * nPower)) / nPower);
};

// op:numeric-unary-plus($arg as numeric) as numeric
hStaticContext_operators["numeric-unary-plus"]	= function(oRight) {
	return oRight;
};

// op:numeric-unary-minus($arg as numeric) as numeric
hStaticContext_operators["numeric-unary-minus"]	= function(oRight) {
	oRight.value	*=-1;
	return oRight;
};


// 6.3 Comparison Operators on Numeric Values
// op:numeric-equal($arg1 as numeric, $arg2 as numeric) as xs:boolean
hStaticContext_operators["numeric-equal"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

// op:numeric-less-than($arg1 as numeric, $arg2 as numeric) as xs:boolean
hStaticContext_operators["numeric-less-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
};

// op:numeric-greater-than($arg1 as numeric, $arg2 as numeric) as xs:boolean
hStaticContext_operators["numeric-greater-than"]	= function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
};

function fOperator_numeric_getPower(oLeft, oRight) {
	// FIXME: remove 	if (fIsNaN(oLeft) || (cMath.abs(oLeft) == nInfinity) || fIsNaN(oRight) || (cMath.abs(oRight) == nInfinity))
	// FIXME: implement if (!fIsRealNumber(oLeft) || !fIsRealNumber(oRight))
	if (fIsNaN(oLeft) || !fIsFinite(cMath.abs(oLeft)) || fIsNaN(oRight) || !fIsFinite(cMath.abs(oRight)))
		return 0;
	var aLeft	= cString(oLeft).match(rXSNumericLiteral),
		aRight	= cString(oRight).match(rXSNumericLiteral),
		nPower	= cMath.max(1, (aLeft[2] || aLeft[3] || '').length + (aLeft[5] || 0) * (aLeft[4] == '+' ?-1 : 1), (aRight[2] || aRight[3] || '').length + (aRight[5] || 0) * (aRight[4] == '+' ?-1 : 1));
	return nPower + (nPower % 2 ? 0 : 1);
};

function fOperator_numeric_getResultOfType(oLeft, oRight, nResult) {
	return new (oLeft instanceof cXSInteger && oRight instanceof cXSInteger && nResult == cMath.round(nResult) ? cXSInteger : cXSDecimal)(nResult);
};
