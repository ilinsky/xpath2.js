/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
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
fStaticContext_defineSystemFunction("abs",		[[cXSDouble, '?']],	function(oValue) {
	return new cXSDecimal(cMath.abs(oValue));
});

// fn:ceiling($arg as numeric?) as numeric?
fStaticContext_defineSystemFunction("ceiling",	[[cXSDouble, '?']],	function(oValue) {
	return new cXSDecimal(cMath.ceil(oValue));
});

// fn:floor($arg as numeric?) as numeric?
fStaticContext_defineSystemFunction("floor",		[[cXSDouble, '?']],	function(oValue) {
	return new cXSDecimal(cMath.floor(oValue));
});

// fn:round($arg as numeric?) as numeric?
fStaticContext_defineSystemFunction("round",		[[cXSDouble, '?']],	function(oValue) {
	return new cXSDecimal(cMath.round(oValue));
});

// fn:round-half-to-even($arg as numeric?) as numeric?
// fn:round-half-to-even($arg as numeric?, $precision as xs:integer) as numeric?
fStaticContext_defineSystemFunction("round-half-to-even",	[[cXSDouble, '?'], [cXSInteger, '', true]],	function(oValue, oPrecision) {
	var nPrecision	= arguments.length > 1 ? oPrecision.valueOf() : 0;

	//
	if (nPrecision < 0) {
		var oPower	= new cXSInteger(cMath.pow(10,-nPrecision)),
			nRounded= cMath.round(hStaticContext_operators["numeric-divide"].call(this, oValue, oPower)),
			oRounded= new cXSInteger(nRounded);
			nDecimal= cMath.abs(hStaticContext_operators["numeric-subtract"].call(this, oRounded, hStaticContext_operators["numeric-divide"].call(this, oValue, oPower)));
		return hStaticContext_operators["numeric-multiply"].call(this, hStaticContext_operators["numeric-add"].call(this, oRounded, new cXSDecimal(nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), oPower);
	}
	else {
		var oPower	= new cXSInteger(cMath.pow(10, nPrecision)),
			nRounded= cMath.round(hStaticContext_operators["numeric-multiply"].call(this, oValue, oPower)),
			oRounded= new cXSInteger(nRounded);
			nDecimal= cMath.abs(hStaticContext_operators["numeric-subtract"].call(this, oRounded, hStaticContext_operators["numeric-multiply"].call(this, oValue, oPower)));
		return hStaticContext_operators["numeric-divide"].call(this, hStaticContext_operators["numeric-add"].call(this, oRounded, new cXSDecimal(nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), oPower);
	}
});
