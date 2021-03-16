/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../../../classes/Exception');

var cXSConstants = require('./../../XSConstants');

var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');
var cXSUntypedAtomic = require('./XSUntypedAtomic');
var cXSString = require('./XSString');
var cXSDayTimeDuration = require('./duration/XSDayTimeDuration');

var cArray = global.Array;
var cMath = global.Math;

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

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

cXSDateTime.prototype	= new cXSAnyAtomicType;
cXSDateTime.prototype.builtInKind	= cXSConstants.DATETIME_DT;
cXSDateTime.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DATETIME;

cXSDateTime.prototype.year		= null;
cXSDateTime.prototype.month		= null;
cXSDateTime.prototype.day		= null;
cXSDateTime.prototype.hours		= null;
cXSDateTime.prototype.minutes	= null;
cXSDateTime.prototype.seconds	= null;
cXSDateTime.prototype.timezone	= null;
cXSDateTime.prototype.negative	= null;

cXSDateTime.prototype.toString	= function() {
	return cXSDateTime.getDateComponent(this)
			+ 'T'
			+ cXSDateTime.getTimeComponent(this)
			+ cXSDateTime.getTZComponent(this);
};

var rXSDateTime		= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSDateTime.cast	= function(vValue) {
	if (vValue instanceof cXSDateTime)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDateTime);
		if (aMatch) {
			var nYear	= +aMatch[2],
				nMonth	= +aMatch[3],
				nDay	= +aMatch[4],
				bValue	= !!aMatch[10];
			if (nDay - 1 < cXSDateTime.getDaysForYearMonth(nYear, nMonth))
				return cXSDateTime.normalize(new cXSDateTime( nYear,
										nMonth,
										nDay,
										bValue ? 24 : +aMatch[6],
										bValue ? 0 : +aMatch[7],
										+((bValue ? 0 : aMatch[8]) + '.' + (bValue ? 0 : aMatch[9] || 0)),
										aMatch[12] ? aMatch[12] == 'Z' ? 0 : (aMatch[13] == '-' ? -1 : 1) * (aMatch[14] * 60 + aMatch[15] * 1) : null,
										aMatch[1] == '-'
				));
			//
			throw new cException("FORG0001"
//->Debug
					, "Invalid date '" + vValue + "' (Non-existent date)"
//<-Debug
			);
		}
		throw new cException("FORG0001");
	}
	if (vValue.primitiveKind == cXSAnySimpleType.PRIMITIVE_DATE)
		return new cXSDateTime(vValue.year, vValue.month, vValue.day, 0, 0, 0, vValue.timezone, vValue.negative);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:dateTime can never succeed"
//<-Debug
	);
};

// Utilities
cXSDateTime.pad = function(vValue, nLength) {
	var sValue	= cString(vValue);
	if (arguments.length < 2)
		nLength	= 2;
	return (sValue.length < nLength + 1 ? new cArray(nLength + 1 - sValue.length).join('0') : '') + sValue;
};

// Utilities
var aXSDate_days	= [31,28,31,30,31,30,31,31,30,31,30,31];
cXSDateTime.getDaysForYearMonth = function(nYear, nMonth) {
	return nMonth == 2 && (nYear % 400 == 0 || nYear % 100 != 0 && nYear % 4 == 0) ? 29 : aXSDate_days[nMonth - 1];
};

cXSDateTime.getTZComponent = function(oDateTime) {
	var nTimezone	= oDateTime.timezone;
	return nTimezone == null
			? ''
			: nTimezone
				? (nTimezone > 0 ? '+' : '-')
					+ cXSDateTime.pad(cMath.abs(~~(nTimezone / 60)))
					+ ':'
					+ cXSDateTime.pad(cMath.abs(nTimezone % 60))
				: 'Z';
};

cXSDateTime.getDateComponent = function(oDateTime) {
	return (oDateTime.negative ? '-' : '')
			+ cXSDateTime.pad(oDateTime.year, 4)
			+ '-' + cXSDateTime.pad(oDateTime.month)
			+ '-' + cXSDateTime.pad(oDateTime.day);
};

cXSDateTime.getTimeComponent = function(oDateTime) {
	var aValue	= cString(oDateTime.seconds).split('.');
	return cXSDateTime.pad(oDateTime.hours)
			+ ':' + cXSDateTime.pad(oDateTime.minutes)
			+ ':' + cXSDateTime.pad(aValue[0])
			+ (aValue.length > 1 ? '.' + aValue[1] : '');
};

cXSDateTime.normalizeDate = function(oValue, bDay) {
	// Adjust day for month/year
	if (!bDay) {
		var nDay	= cXSDateTime.getDaysForYearMonth(oValue.year, oValue.month);
		if (oValue.day > nDay) {
			while (oValue.day > nDay) {
				oValue.month	+= 1;
				if (oValue.month > 12) {
					oValue.year		+= 1;
					if (oValue.year == 0)
						oValue.year	= 1;
					oValue.month	= 1;
				}
				oValue.day	-= nDay;
				nDay = cXSDateTime.getDaysForYearMonth(oValue.year, oValue.month);
			}
		}
		else
		if (oValue.day < 1) {
			while (oValue.day < 1) {
				oValue.month	-= 1;
				if (oValue.month < 1) {
					oValue.year		-= 1;
					if (oValue.year == 0)
						oValue.year	=-1;
					oValue.month	= 12;
				}
				nDay = cXSDateTime.getDaysForYearMonth(oValue.year, oValue.month);
				oValue.day	+= nDay;
			}
		}
	}
//?	else
	// Adjust month
	if (oValue.month > 12) {
		oValue.year		+= ~~(oValue.month / 12);
		if (oValue.year == 0)
			oValue.year	= 1;
		oValue.month	= oValue.month % 12;
	}
	else
	if (oValue.month < 1) {
		oValue.year		+= ~~(oValue.month / 12) - 1;
		if (oValue.year == 0)
			oValue.year	=-1;
		oValue.month	= oValue.month % 12 + 12;
	}

	return oValue;
};

//
cXSDateTime.normalizeTime = function(oValue) {
	//
	if (oValue.seconds >= 60 || oValue.seconds < 0) {
		oValue.minutes	+= ~~(oValue.seconds / 60) - (oValue.seconds < 0 && oValue.seconds % 60 ? 1 : 0);
		oValue.seconds	= oValue.seconds % 60 + (oValue.seconds < 0 && oValue.seconds % 60 ? 60 : 0);
	}
	//
	if (oValue.minutes >= 60 || oValue.minutes < 0) {
		oValue.hours	+= ~~(oValue.minutes / 60) - (oValue.minutes < 0 && oValue.minutes % 60 ? 1 : 0);
		oValue.minutes	= oValue.minutes % 60 + (oValue.minutes < 0 && oValue.minutes % 60 ? 60 : 0);
	}
	//
	if (oValue.hours >= 24 || oValue.hours < 0) {
		if (oValue instanceof cXSDateTime)
			oValue.day	+= ~~(oValue.hours / 24) - (oValue.hours < 0 && oValue.hours % 24 ? 1 : 0);
		oValue.hours	= oValue.hours % 24 + (oValue.hours < 0 && oValue.hours % 24 ? 24 : 0);
	}
	//
	return oValue;
};

cXSDateTime.normalize = function(oValue) {
	return cXSDateTime.normalizeDate(cXSDateTime.normalizeTime(oValue));
};

cXSDateTime.adjustTimezone = function(oValue, oTimezone) {
	if (oValue == null)
		return null;

	//
	if (oTimezone == null)
		oValue.timezone	= null;
	else {
		var nTimezone	= cXSDayTimeDuration.toSeconds(oTimezone) / 60;
		if (oValue.timezone != null) {
			var nDiff	= nTimezone - oValue.timezone;
			if (oValue.primitiveKind == cXSAnySimpleType.PRIMITIVE_DATE) {
				if (nDiff < 0)
					oValue.day--;
			}
			else {
				oValue.minutes	+= nDiff % 60;
				oValue.hours	+= ~~(nDiff / 60);
			}
			//
			cXSDateTime.normalize(oValue);
		}
		oValue.timezone	= nTimezone;
	}
	return oValue;
};

//
module.exports = cXSDateTime;
