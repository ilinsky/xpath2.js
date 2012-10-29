/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDuration(nYear, nMonth, nDay, nHour, nMinute, nSecond, bNegative) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hour	= nHour;
	this.minute	= nMinute;
	this.second	= nSecond;
	this.negative	= bNegative;
};

cXSDuration.RegExp	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;

cXSDuration.prototype	= new cXSAnyAtomicType;

cXSDuration.prototype.year		= null;
cXSDuration.prototype.month		= null;
cXSDuration.prototype.day		= null;
cXSDuration.prototype.hour		= null;
cXSDuration.prototype.minute	= null;
cXSDuration.prototype.second	= null;
cXSDuration.prototype.negative	= null;

cXSDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ ((fXSDuration_getYearMonthComponent(this) + fXSDuration_getDayTimeComponent(this)) || 'T0S');
};

cXSDuration.parse	= function(sValue) {
	var aMatch	= sValue.match(cXSDuration.RegExp);
	if (aMatch)
		return new cXSDuration(+aMatch[2] || 0,
								+aMatch[3] || 0,
								+aMatch[4] || 0,
								+aMatch[5] || 0,
								+aMatch[6] || 0,
								+aMatch[7] || 0,
								aMatch[1] == '-');
	throw new cXPath2Error("FORG0001");
};
//
cFunctionCall.dataTypes["duration"]	= cXSDuration;

function fXSDuration_getYearMonthComponent(oDuration) {
	return (oDuration.year ? oDuration.year + 'Y' : '')
			+ (oDuration.month ? oDuration.month + 'M' : '');
};

function fXSDuration_getDayTimeComponent(oDuration) {
	return (oDuration.day ? oDuration.day + 'D' : '')
			+ (oDuration.hour || oDuration.minute || oDuration.second
				? 'T'
					+ (oDuration.hour ? oDuration.hour + 'H' : '')
					+ (oDuration.minute ? oDuration.minute + 'M' : '')
					+ (oDuration.second ? oDuration.second + 'S' : '')
				: '');
};