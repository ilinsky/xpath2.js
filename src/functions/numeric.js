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
	return new cXPath2Sequence(cMath.ceiling(nValue));
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
		var nPower	= cMath.pow(10, fFunctionCall_number_subtract(0, nPrecision)),
			nRounded= cMath.round(fFunctionCall_number_divide(nValue, nPower)),
			nDecimal= cMath.abs(fFunctionCall_number_subtract(nRounded, fFunctionCall_number_divide(nValue, nPower)));
		return new cXPath2Sequence(fFunctionCall_number_multiply(fFunctionCall_number_plus(nRounded, (nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), nPower));
	}
	else {
		var nPower	= cMath.pow(10, nPrecision),
			nRounded= cMath.round(fFunctionCall_number_multiply(nValue, nPower)),
			nDecimal= cMath.abs(fFunctionCall_number_subtract(nRounded, fFunctionCall_number_multiply(nValue, nPower)));
		return new cXPath2Sequence(fFunctionCall_number_divide(fFunctionCall_number_plus(nRounded, (nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), nPower));
	}
};

// Magic library
function fFunctionCall_number_common(a, b) {
	var d, e, c = cMath.max((d = (e = a.toString()).split('.')).length > 1 ? d[1].length : (d = e.split(/e-/)).length > 1 ? d[1] : 1, (d = (e = b.toString()).split('.')).length > 1 ? d[1].length : (d = e.split(/e-/)).length > 1 ? d[1] : 1);
	return c + (c % 2 ? 0 : 1);
};
function fFunctionCall_number_subtract(a, b) {
	var c	= cMath.pow(10, fFunctionCall_number_common(a, b));
	return ((a * c) - (b * c))/c;
};
function fFunctionCall_number_plus(a, b) {
	var c	= cMath.pow(10, fFunctionCall_number_common(a, b));
	return ((a * c) + (b * c))/c;
};
function fFunctionCall_number_multiply(a, b) {
	var c	= cMath.pow(10, fFunctionCall_number_common(a, b));
	return ((a * c) * (b * c))/(c * c);
};
function fFunctionCall_number_divide(a, b) {
	var c	= cMath.pow(10, fFunctionCall_number_common(a, b));
	return ((a * c) / (b * c));
};
