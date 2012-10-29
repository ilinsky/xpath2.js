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

	6.4 Functions on Numeric Values
		abs
		ceiling
		floor
		round
		round-half-to-even
*/
// 6.2 Operators on Numeric Values
var rFunctionCall_numeric_regExp	= /^-?\d+?(?:\.(\d*))?(?:[eE]([+-])?(\d+))?$/;
function fFunctionCall_numeric_getPower(a, b) {
	var d	= String(a).match(rFunctionCall_numeric_regExp),
		e	= String(b).match(rFunctionCall_numeric_regExp),
		c	= cMath.max(1, (d[1] || '').length + (d[3] || 0) * (d[2] == '+' ?-1 : 1), (e[1] || '').length + (e[3] || 0) * (e[2] == '+' ?-1 : 1));
	return c + (c % 2 ? 0 : 1);
};

// op:numeric-add($arg1 as numeric, $arg2 as numeric) as numeric
cFunctionCall.operators["numeric-add"]		= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) + (oRight * c))/c;
};

// op:numeric-subtract($arg1 as numeric, $arg2 as numeric) as numeric
cFunctionCall.operators["numeric-subtract"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) - (oRight * c))/c;
};

// op:numeric-multiply($arg1 as numeric, $arg2 as numeric) as numeric
cFunctionCall.operators["numeric-multiply"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) * (oRight * c))/(c * c);
};

// op:numeric-divide($arg1 as numeric, $arg2 as numeric) as numeric
cFunctionCall.operators["numeric-divide"]	= function(oLeft, oRight) {
	var c	= cMath.pow(10, fFunctionCall_numeric_getPower(oLeft, oRight));
	return ((oLeft * c) / (oRight * c));
};

// op:numeric-integer-divide($arg1 as numeric, $arg2 as numeric) as xs:integer
cFunctionCall.operators["numeric-integer-divide"]	= function(oLeft, oRight) {
	return ~~(oLeft / oRight);
};

// op:numeric-mod($arg1 as numeric, $arg2 as numeric) as numeric
cFunctionCall.operators["numeric-mod"]	= function(oLeft, oRight) {
	return oLeft % oRight;
};

// op:numeric-unary-plus($arg as numeric) as numeric
cFunctionCall.operators["numeric-unary-plus"]	= function(oRight) {
	return oRight;
};

// op:numeric-unary-minus($arg as numeric) as numeric
cFunctionCall.operators["numeric-unary-minus"]	= function(oRight) {
	return -oRight;
};


// 6.3 Comparison Operators on Numeric Values
// op:numeric-equal($arg1 as numeric, $arg2 as numeric) as xs:boolean
cFunctionCall.operators["numeric-equal"]	= function(oLeft, oRight) {
	return oLeft == oRight;
};

// op:numeric-less-than($arg1 as numeric, $arg2 as numeric) as xs:boolean
cFunctionCall.operators["numeric-less-than"]	= function(oLeft, oRight) {
	return oLeft < oRight;
};

// op:numeric-greater-than($arg1 as numeric, $arg2 as numeric) as xs:boolean
cFunctionCall.operators["numeric-greater-than"]	= function(oLeft, oRight) {
	return oLeft > oRight;
};


// 6.4 Functions on Numeric Values
// fn:abs($arg as numeric?) as numeric?
cFunctionCall.functions["abs"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	var nValue	= oSequence1.toNumber();
	if (fIsNaN(nValue))
		throw new cXPath2Error("XPTY0004");

	return new cXPath2Sequence(cMath.abs(nValue));
};

// fn:ceiling($arg as numeric?) as numeric?
cFunctionCall.functions["ceiling"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	var nValue	= oSequence1.toNumber();
	if (fIsNaN(nValue))
		throw new cXPath2Error("XPTY0004");

	return new cXPath2Sequence(cMath.ceil(nValue));
};

// fn:floor($arg as numeric?) as numeric?
cFunctionCall.functions["floor"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	var nValue	= oSequence1.toNumber();
	if (fIsNaN(nValue))
		throw new cXPath2Error("XPTY0004");

	return new cXPath2Sequence(cMath.floor(nValue));
};

// fn:round($arg as numeric?) as numeric?
cFunctionCall.functions["round"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	var nValue	= oSequence1.toNumber();
	if (fIsNaN(nValue))
		throw new cXPath2Error("XPTY0004");

	return new cXPath2Sequence(cMath.round(nValue));
};

// fn:round-half-to-even($arg as numeric?) as numeric?
// fn:round-half-to-even($arg as numeric?, $precision as xs:integer) as numeric?
cFunctionCall.functions["round-half-to-even"]	= function(oSequence1, oSequence2) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	var nValue	= oSequence1.toNumber();
	if (fIsNaN(nValue))
		throw new cXPath2Error("XPTY0004");

	var nPrecision	= 0;
	if (arguments.length > 1) {
		nPrecision	= oSequence2.toNumber();
		if (fIsNaN(nPrecision))
			throw new cXPath2Error("XPTY0004");
	}

	//
	if (nPrecision < 0) {
		var nPower	= cMath.pow(10,-nPrecision),
			nRounded= cMath.round(cFunctionCall.operators["numeric-divide"](nValue, nPower)),
			nDecimal= cMath.abs(cFunctionCall.operators["numeric-subtract"](nRounded, cFunctionCall.operators["numeric-divide"](nValue, nPower)));
		return new cXPath2Sequence(cFunctionCall.operators["numeric-multiply"](cFunctionCall.operators["numeric-add"](nRounded, (nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), nPower));
	}
	else {
		var nPower	= cMath.pow(10, nPrecision),
			nRounded= cMath.round(cFunctionCall.operators["numeric-multiply"](nValue, nPower)),
			nDecimal= cMath.abs(cFunctionCall.operators["numeric-subtract"](nRounded, cFunctionCall.operators["numeric-multiply"](nValue, nPower)));
		return new cXPath2Sequence(cFunctionCall.operators["numeric-divide"](cFunctionCall.operators["numeric-add"](nRounded, (nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), nPower));
	}
};


