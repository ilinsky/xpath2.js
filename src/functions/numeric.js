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
fXPath2StaticContext_defineSystemFunction("abs",		[[cXTNumeric, '?']],	function(oSequence1) {
	return cMath.abs(oSequence1.items[0]);
});

// fn:ceiling($arg as numeric?) as numeric?
fXPath2StaticContext_defineSystemFunction("ceiling",	[[cXTNumeric, '?']],	function(oSequence1) {
	return cMath.ceil(oSequence1.items[0]);
});

// fn:floor($arg as numeric?) as numeric?
fXPath2StaticContext_defineSystemFunction("floor",		[[cXTNumeric, '?']],	function(oSequence1) {
	return cMath.floor(oSequence1.items[0]);
});

// fn:round($arg as numeric?) as numeric?
fXPath2StaticContext_defineSystemFunction("round",		[[cXTNumeric, '?']],	function(oSequence1) {
	return cMath.round(oSequence1.items[0]);
});

// fn:round-half-to-even($arg as numeric?) as numeric?
// fn:round-half-to-even($arg as numeric?, $precision as xs:integer) as numeric?
fXPath2StaticContext_defineSystemFunction("round-half-to-even",	[[cXTNumeric, '?'], [cXSInteger, '', true]],	function(oSequence1, oSequence2) {
	var nValue	= oSequence1.items[0];
	var nPrecision	= 0;
	if (arguments.length > 1) {
		nPrecision	= oSequence2.items[0];
	}

	//
	if (nPrecision < 0) {
		var nPower	= cMath.pow(10,-nPrecision),
			nRounded= cMath.round(hXPath2StaticContext_operators["numeric-divide"].call(this, nValue, nPower)),
			nDecimal= cMath.abs(hXPath2StaticContext_operators["numeric-subtract"].call(this, nRounded, hXPath2StaticContext_operators["numeric-divide"].call(this, nValue, nPower)));
		return hXPath2StaticContext_operators["numeric-multiply"].call(this, hXPath2StaticContext_operators["numeric-add"].call(this, nRounded, (nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), nPower);
	}
	else {
		var nPower	= cMath.pow(10, nPrecision),
			nRounded= cMath.round(hXPath2StaticContext_operators["numeric-multiply"].call(this, nValue, nPower)),
			nDecimal= cMath.abs(hXPath2StaticContext_operators["numeric-subtract"].call(this, nRounded, hXPath2StaticContext_operators["numeric-multiply"].call(this, nValue, nPower)));
		return hXPath2StaticContext_operators["numeric-divide"].call(this, hXPath2StaticContext_operators["numeric-add"].call(this, nRounded, (nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), nPower);
	}
});