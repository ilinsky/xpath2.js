/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDateTime(nYear, nMonth, nDay, nHours, nMinutes, nSeconds, nTimezone) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hours	= nHours;
	this.minutes	= nMinutes;
	this.seconds	= nSeconds;
	this.timezone	= nTimezone;
};

cXSDateTime.RegExp	= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;

cXSDateTime.prototype	= new cXSAnyAtomicType;

cXSDateTime.prototype.year		= null;
cXSDateTime.prototype.month		= null;
cXSDateTime.prototype.day		= null;
cXSDateTime.prototype.hours		= null;
cXSDateTime.prototype.minutes	= null;
cXSDateTime.prototype.seconds	= null;
cXSDateTime.prototype.timezone		= null;

cXSDateTime.prototype.toString	= function() {
	return fXSDateTime_getDateComponent(this)
			+ 'T'
			+ fXSDateTime_getTimeComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

//
cFunctionCall.dataTypes["dateTime"]	= function(sValue) {
	var aMatch	= sValue.match(cXSDateTime.RegExp);
	if (aMatch) {
		var bValue	= aMatch[10] == "24:00:00";
		return new cXSDateTime( aMatch[2] * (aMatch[1] == '-' ?-1 : 1),
								+aMatch[3],
								+aMatch[4],
								bValue ? 24 : +aMatch[6],
								bValue ? 0 : +aMatch[7],
								cNumber((bValue ? 0 : aMatch[8]) + '.' + (bValue ? aMatch[11] || 0 : aMatch[9] || 0)),
								aMatch[12] ? aMatch[12] == 'Z' ? 0 : (aMatch[13] == '-' ? 1 : -1) * (aMatch[14] * 60 + aMatch[15] * 1) : null
		);
	}
	throw new cXPath2Error("FORG0001");
};

//
function fXSDateTime_toSeconds(oDateTime) {
	var nValue	= fXSDate_toSeconds(oDateTime);
	return nValue + fXSTime_toSeconds(oDateTime) * (nValue > 0 ? 1 :-1);
};

function fXSDateTime_pad(vValue) {
	sValue	= cString(vValue);
	return new cArray(1 - sValue.length +(arguments[1] || 2)).join('0') + sValue;
};

function fXSDateTime_getTZComponent(oDateTime) {
	var nTimezone	= oDateTime.timezone;
	return nTimezone === null
			? ''
			: nTimezone
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
	return fXSDateTime_pad(oDateTime.hours)
			+ ':' + fXSDateTime_pad(oDateTime.minutes)
			+ ':' + fXSDateTime_pad(oDateTime.seconds);
};