/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDateTime(nYear, nMonth, nDay, nHours, nMinutes, nSeconds, nTimezone, bNegative) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hours	= nHours;
	this.minutes	= nMinutes;
	this.seconds	= nSeconds;
	this.timezone	= nTimezone;
	this.negative	= bNegative;
};

cXSDateTime.RegExp	= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;

cXSDateTime.prototype	= new cXSAnyAtomicType;

cXSDateTime.prototype.year		= null;
cXSDateTime.prototype.month		= null;
cXSDateTime.prototype.day		= null;
cXSDateTime.prototype.hours		= null;
cXSDateTime.prototype.minutes	= null;
cXSDateTime.prototype.seconds	= null;
cXSDateTime.prototype.timezone	= null;
cXSDateTime.prototype.negative	= null;

cXSDateTime.prototype.toString	= function() {
	return fXSDateTime_getDateComponent(this)
			+ 'T'
			+ fXSDateTime_getTimeComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

cXSDateTime.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDateTime:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= fString_trim.call(vValue).match(cXSDateTime.RegExp);
			if (aMatch) {
				var nYear	= +aMatch[2],
					nMonth	= +aMatch[3],
					nDay	= +aMatch[4],
					bValue	= !!aMatch[10];
				if (nDay - 1 < fXSDate_getDaysForYearMonth(nYear, nMonth))
					return fXSDateTime_normalize(new cXSDateTime( nYear,
											nMonth,
											nDay,
											bValue ? 24 : +aMatch[6],
											bValue ? 0 : +aMatch[7],
											cNumber((bValue ? 0 : aMatch[8]) + '.' + (bValue ? 0 : aMatch[9] || 0)),
											aMatch[12] ? aMatch[12] == 'Z' ? 0 : (aMatch[13] == '-' ? -1 : 1) * (aMatch[14] * 60 + aMatch[15] * 1) : null,
											aMatch[1] == '-'
					));
				//
				throw new cXPath2Error("FORG0001"
//->Debug
						, "Invalid date '" + vValue + "' (Non-existent date)"
//<-Debug
				);
			}
			throw new cXPath2Error("FORG0001");
			// TODO: Gregorian
		case cXSDate:
			return new cXSDateTime(vValue.year, vValue.month, vValue.day, 0, 0, 0, vValue.timezone, vValue.negative);
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:dateTime can never succeed"
//<-Debug
	);
};

//
cFunctionCall.dataTypes["dateTime"]	= cXSDateTime;

// Utilities
function fXSDateTime_pad(vValue, nLength) {
	sValue	= cString(vValue);
	if (arguments.length < 2)
		nLength	= 2;
	return (sValue.length < nLength + 1 ? new cArray(nLength + 1 - sValue.length).join('0') : '') + sValue;
};

function fXSDateTime_getTZComponent(oDateTime) {
	var nTimezone	= oDateTime.timezone;
	return nTimezone === null
			? ''
			: nTimezone
				? (nTimezone > 0 ? '+' : '-')
					+ fXSDateTime_pad(cMath.abs(~~(nTimezone / 60)))
					+ ':'
					+ fXSDateTime_pad(cMath.abs(nTimezone % 60))
				: 'Z';
};

function fXSDateTime_getDateComponent(oDateTime) {
	return (oDateTime.negative ? '-' : '')
			+ fXSDateTime_pad(oDateTime.year, 4)
			+ '-' + fXSDateTime_pad(oDateTime.month)
			+ '-' + fXSDateTime_pad(oDateTime.day);
};

function fXSDateTime_getTimeComponent(oDateTime) {
	var aValue	= cString(oDateTime.seconds).split('.');
	return fXSDateTime_pad(oDateTime.hours)
			+ ':' + fXSDateTime_pad(oDateTime.minutes)
			+ ':' + fXSDateTime_pad(aValue[0])
			+ (aValue.length > 1 ? '.' + aValue[1] : '');
};

function fXSDateTime_normalize(oValue) {
	return fXSDate_normalize(fXSTime_normalize(oValue));
};

//
function fXSDateTime_setTimezone(oDateTime, oTimezone) {
	// Create a copy
	var oValue;
	if (oDateTime instanceof cXSDate)
		oValue	= new cXSDate(oDateTime.year, oDateTime.month, oDateTime.day, oDateTime.timezone, oDateTime.negative);
	else
	if (oDateTime instanceof cXSTime)
		oValue	= new cXSTime(oDateTime.hours, oDateTime.minutes, oDateTime.seconds, oDateTime.timezone, oDateTime.negative);
	else
		oValue	= new cXSDateTime(oDateTime.year, oDateTime.month, oDateTime.day, oDateTime.hours, oDateTime.minutes, oDateTime.seconds, oDateTime.timezone, oDateTime.negative);

	//
	if (oTimezone == null)
		oValue.timezone	= null;
	else {
		var nTimezone	= fXSDayTimeDuration_toSeconds(oTimezone) / 60;
		if (oDateTime.timezone !== null) {
			var nDiff	= nTimezone - oDateTime.timezone;
			if (oDateTime instanceof cXSDate) {
				if (nDiff < 0)
					oValue.day--;
			}
			else {
				oValue.minutes	+= nDiff % 60;
				oValue.hours	+= ~~(nDiff / 60);
			}
			//
			fXSDateTime_normalize(oValue);
		}
		oValue.timezone	= nTimezone;
	}
	return oValue;
};