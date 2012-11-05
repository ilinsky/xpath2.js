/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSYearMonthDuration(nYear, nMonth, bNegative) {
	cXSDuration.call(this, nYear, nMonth, 0, 0, 0, 0, bNegative);
};

cXSYearMonthDuration.RegExp	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?$/;

cXSYearMonthDuration.prototype	= new cXSDuration;

cXSYearMonthDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (fXSDuration_getYearMonthComponent(this) || '0M');
};

cXSYearMonthDuration.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSYearMonthDuration:
			return vValue;
		case cXSUntypedAtomic:
		case cXSString:
			//
		case cXSDuration:
		case cXSDayTimeDuration:
			return cFunctionCall.dataTypes["yearMonthDuration"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:yearMonthDuration can never succeed");
};

//
cFunctionCall.dataTypes["yearMonthDuration"]	= function(sValue) {
	var aMatch	= sValue.match(cXSYearMonthDuration.RegExp);
	if (aMatch)
		return fXSYearMonthDuration_normalize(new cXSYearMonthDuration(+aMatch[2] || 0, +aMatch[3] || 0, aMatch[1] == '-'));
	throw new cXPath2Error("FORG0001");
};

//
function fXSYearMonthDuration_toMonths(oDuration) {
	return (oDuration.year * 12 + oDuration.month) * (oDuration.negative ? -1 : 1);
};

function fXSYearMonthDuration_fromMonths(nValue) {
	var nNegative	=(nValue = cMath.round(nValue)) < 0,
		nYears	= ~~((nValue = cMath.abs(nValue)) / 12),
		nMonths		= nValue -= nYears * 12;
	return new cXSYearMonthDuration(nYears, nMonths, nNegative);
};

function fXSYearMonthDuration_normalize(oDuration) {
	if (oDuration.month >= 12) {
		oDuration.year	+= ~~(oDuration.month / 12);
		oDuration.month	%= 12;
	}
	return oDuration;
};