/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	6.4 Functions on Numeric Values
		abs
		ceiling
		floor
		round
		round-half-to-even
*/

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


