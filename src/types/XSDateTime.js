/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDateTime(nYear, nMonth, nDay, nHour, nMinute, nSecond, nMillisecond, nTimezone) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hour	= nHour;
	this.minute	= nMinute;
	this.second	= nSecond;
	this.millisecond= nMillisecond;
	this.timezone	= nTimezone;
};

cXSDateTime.RegExp	= /^-?([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d+)?|(24:00:00)(\.0+)?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;

cXSDateTime.prototype	= new cXSAnyAtomicType;

cXSDateTime.prototype.year		= null;
cXSDateTime.prototype.month		= null;
cXSDateTime.prototype.day		= null;
cXSDateTime.prototype.hour		= null;
cXSDateTime.prototype.minute	= null;
cXSDateTime.prototype.second	= null;
cXSDateTime.prototype.millisecond	= null;
cXSDateTime.prototype.timezone		= null;

cXSDateTime.prototype.toString	= function() {
	return fXSDateTime_getDateComponent(this)
			+ 'T'
			+ fXSDateTime_getTimeComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

cXSDateTime.parse	= function(sValue) {
	var aMatch	= sValue.match(cXSDateTime.RegExp);
	if (aMatch) {
		var bValue	= aMatch[9] == "24:00:00";
		return new cXSDateTime(+aMatch[1],
								+aMatch[2],
								+aMatch[3],
								bValue ? 24 : +aMatch[5],
								bValue ? 0 : +aMatch[6],
								bValue ? 0 : +aMatch[7],
								bValue ? +aMatch[10] || 0 : +aMatch[8] || 0,
								!aMatch[11] || aMatch[11] == 'Z' ? 0 : (aMatch[12] == '-' ? 1 : -1) * (aMatch[13] * 60 + aMatch[14] * 1)
		);
	}
	throw new cXPath2Error("FORG0001");
};
//
cFunctionCall.dataTypes["dateTime"]	= cXSDateTime;

//
function fXSDateTime_pad(vValue) {
	sValue	= cString(vValue);
	return new cArray(1 - sValue.length +(arguments[1] || 2)).join('0') + sValue;
};

function fXSDateTime_getTZComponent(oDateTime) {
	var nTimezone	= oDateTime.timezone;
	return nTimezone
			? (nTimezone < 0 ? '+' : '-')
				+ fXSDateTime_pad(cMath.abs(~~(nTimezone / 60)))
				+ ':'
				+ fXSDateTime_pad(cMath.abs(nTimezone % 60))
			: 'Z';
};

function fXSDateTime_getDateComponent(oDateTime) {
	return oDateTime.year
			+ '-' + fXSDateTime_pad(oDateTime.month)
			+ '-' + fXSDateTime_pad(oDateTime.day);
};

function fXSDateTime_getTimeComponent(oDateTime) {
	return fXSDateTime_pad(oDateTime.hour)
			+ ':' + fXSDateTime_pad(oDateTime.minute)
			+ ':' + fXSDateTime_pad(oDateTime.second)
			+ (oDateTime.millisecond
				? '.' + fXSDateTime_pad(oDateTime.millisecond, 3)
				: '');
};