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
var cXSString = require('./XSString');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSDuration(nYear, nMonth, nDay, nHours, nMinutes, nSeconds, bNegative) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hours	= nHours;
	this.minutes	= nMinutes;
	this.seconds	= nSeconds;
	this.negative	= bNegative;
};

cXSDuration.prototype	= new cXSAnyAtomicType;
cXSDuration.prototype.builtInKind	= cXSConstants.DURATION_DT;
cXSDuration.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DURATION;

cXSDuration.prototype.year		= null;
cXSDuration.prototype.month		= null;
cXSDuration.prototype.day		= null;
cXSDuration.prototype.hours		= null;
cXSDuration.prototype.minutes	= null;
cXSDuration.prototype.seconds	= null;
cXSDuration.prototype.negative	= null;

cXSDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ ((cXSDuration.getYearMonthComponent(this) + cXSDuration.getDayTimeComponent(this)) || 'T0S');
};

var rXSDuration		= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;
cXSDuration.cast	= function(vValue) {
	if (vValue instanceof cXSDuration)
		return vValue;
	if (vValue.builtInKind == cXSConstants.XT_YEARMONTHDURATION_DT)
		return new cXSDuration(vValue.year, vValue.month, 0, 0, 0, 0, vValue.negative);
	if (vValue.builtInKind == cXSConstants.XT_DAYTIMEDURATION_DT)
		return new cXSDuration(0, 0, vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDuration);
		if (aMatch)
			return fXSDuration_normalize(new cXSDuration(+aMatch[2] || 0, +aMatch[3] || 0, +aMatch[4] || 0, +aMatch[5] || 0, +aMatch[6] || 0, +aMatch[7] || 0, aMatch[1] == '-'));
		throw new cException("FORG0001");
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:duration can never succeed"
//<-Debug
	);
};

// Utilities
cXSDuration.getYearMonthComponent = function(oDuration) {
	return (oDuration.year ? oDuration.year + 'Y' : '')
			+ (oDuration.month ? oDuration.month + 'M' : '');
};

cXSDuration.getDayTimeComponent = function(oDuration) {
	return (oDuration.day ? oDuration.day + 'D' : '')
			+ (oDuration.hours || oDuration.minutes || oDuration.seconds
				? 'T'
					+ (oDuration.hours ? oDuration.hours + 'H' : '')
					+ (oDuration.minutes ? oDuration.minutes + 'M' : '')
					+ (oDuration.seconds ? oDuration.seconds + 'S' : '')
				: '');
};

function fXSDuration_normalize(oDuration) {
	return cXSDuration.normalizeYearMonthDuration(cXSDuration.normalizeDayTimeDuration(oDuration));
};

cXSDuration.normalizeDayTimeDuration = function(oDuration) {
	if (oDuration.seconds >= 60) {
		oDuration.minutes	+= ~~(oDuration.seconds / 60);
		oDuration.seconds	%= 60;
	}
	if (oDuration.minutes >= 60) {
		oDuration.hours		+= ~~(oDuration.minutes / 60);
		oDuration.minutes	%= 60;
	}
	if (oDuration.hours >= 24) {
		oDuration.day		+= ~~(oDuration.hours / 24);
		oDuration.hours		%= 24;
	}
	return oDuration;
};

cXSDuration.normalizeYearMonthDuration = function(oDuration) {
	if (oDuration.month >= 12) {
		oDuration.year	+= ~~(oDuration.month / 12);
		oDuration.month	%= 12;
	}
	return oDuration;
};

//
module.exports = cXSDuration;
