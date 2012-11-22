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
function fFunctionCall_numeric_getPower(oLeft, oRight) {
	if (fIsNaN(oLeft) || (cMath.abs(oLeft) == nInfinity) || fIsNaN(oRight) || (cMath.abs(oRight) == nInfinity))
		return 0;
	var aLeft	= cString(oLeft).match(rFunctionCall_numeric_regExp),
		aRight	= cString(oRight).match(rFunctionCall_numeric_regExp),
		nPower	= cMath.max(1, (aLeft[1] || '').length + (aLeft[3] || 0) * (aLeft[2] == '+' ?-1 : 1), (aRight[1] || '').length + (aRight[3] || 0) * (aRight[2] == '+' ?-1 : 1));
	return nPower + (nPower % 2 ? 0 : 1);
};

// op:numeric-add($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-add"]		= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) + (nRight * nPower))/nPower);
};

// op:numeric-subtract($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-subtract"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) - (nRight * nPower))/nPower);
};

// op:numeric-multiply($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-multiply"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, ((nLeft * nPower) * (nRight * nPower))/(nPower * nPower));
};

// op:numeric-divide($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-divide"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
	return fOperator_numeric_getResultOfType(oLeft, oRight, (oLeft * nPower) / (oRight * nPower));
};

// op:numeric-integer-divide($arg1 as numeric, $arg2 as numeric) as xs:integer
hStaticContext_operators["numeric-integer-divide"]	= function(oLeft, oRight) {
	return new cXSInteger(~~(oLeft / oRight));
};

// op:numeric-mod($arg1 as numeric, $arg2 as numeric) as numeric
hStaticContext_operators["numeric-mod"]	= function(oLeft, oRight) {
	var nLeft	= oLeft.valueOf(),
		nRight	= oRight.valueOf(),
		nPower	= cMath.pow(10, fFunctionCall_numeric_getPower(nLeft, nRight));
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

function fOperator_numeric_getResultOfType(oLeft, oRight, nResult) {
	return new (oLeft instanceof cXSInteger && oRight instanceof cXSInteger && nResult == cMath.round(nResult) ? cXSInteger : cXSDecimal)(nResult);
};