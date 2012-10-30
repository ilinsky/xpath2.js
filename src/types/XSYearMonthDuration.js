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

//
cFunctionCall.dataTypes["yearMonthDuration"]	= function(sValue) {
	var aMatch	= sValue.match(cXSYearMonthDuration.RegExp);
	if (aMatch)
		return new cXSYearMonthDuration(+aMatch[2] || 0,
										+aMatch[3] || 0,
										aMatch[1] == '-'
		);
	throw new cXPath2Error("FORG0001");
};

//
function fXSYearMonthDuration_toMonths(oDuration) {
	return (oDuration.year * 12 + oDuration.month) * (oDuration.negative ? -1 : 1);
};

function fXSYearMonthDuration_normalize(oDuration) {
	if (oDuration.month >= 12) {
		oDuration.year	+= ~~(oDuration.month / 12);
		oDuration.month	%= 12;
	}
};