/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../classes/StaticContext');

var cXSDecimal = require('./../types/schema/simple/atomic/XSDecimal');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');

var cMath = global.Math;

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
function fAbs(oValue) {
	return new cXSDecimal(cMath.abs(oValue));
};

// fn:ceiling($arg as numeric?) as numeric?
function fCeiling(oValue) {
	return new cXSDecimal(cMath.ceil(oValue));
};

// fn:floor($arg as numeric?) as numeric?
function fFloor(oValue) {
	return new cXSDecimal(cMath.floor(oValue));
};

// fn:round($arg as numeric?) as numeric?
function fRound(oValue) {
	return new cXSDecimal(cMath.round(oValue));
};

// fn:round-half-to-even($arg as numeric?) as numeric?
// fn:round-half-to-even($arg as numeric?, $precision as xs:integer) as numeric?
function fRoundHalfToEven(oValue, oPrecision) {
	var nPrecision	= arguments.length > 1 ? oPrecision.valueOf() : 0;

	//
	if (nPrecision < 0) {
		var oPower	= new cXSInteger(cMath.pow(10,-nPrecision)),
			nRounded= cMath.round(cStaticContext.operators["numeric-divide"].call(this, oValue, oPower)),
			oRounded= new cXSInteger(nRounded);
			nDecimal= cMath.abs(cStaticContext.operators["numeric-subtract"].call(this, oRounded, cStaticContext.operators["numeric-divide"].call(this, oValue, oPower)));
		return cStaticContext.operators["numeric-multiply"].call(this, cStaticContext.operators["numeric-add"].call(this, oRounded, new cXSDecimal(nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), oPower);
	}
	else {
		var oPower	= new cXSInteger(cMath.pow(10, nPrecision)),
			nRounded= cMath.round(cStaticContext.operators["numeric-multiply"].call(this, oValue, oPower)),
			oRounded= new cXSInteger(nRounded);
			nDecimal= cMath.abs(cStaticContext.operators["numeric-subtract"].call(this, oRounded, cStaticContext.operators["numeric-multiply"].call(this, oValue, oPower)));
		return cStaticContext.operators["numeric-divide"].call(this, cStaticContext.operators["numeric-add"].call(this, oRounded, new cXSDecimal(nDecimal == 0.5 && nRounded % 2 ?-1 : 0)), oPower);
	}
};

module.exports = {
    fAbs: fAbs,
    fCeiling: fCeiling,
    fFloor: fFloor,
    fRound: fRound,
    fRoundHalfToEven: fRoundHalfToEven
};