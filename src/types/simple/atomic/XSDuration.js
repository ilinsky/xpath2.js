/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDuration(nYear, nMonth, nDay, nHours, nMinutes, nSeconds, bNegative) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hours	= nHours;
	this.minutes	= nMinutes;
	this.seconds	= nSeconds;
	this.negative	= bNegative;
};

cXSDuration.RegExp	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;

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
			+ ((fXSDuration_getYearMonthComponent(this) + fXSDuration_getDayTimeComponent(this)) || 'T0S');
};

cXSDuration.cast	= function(vValue) {
	if (vValue instanceof cXSYearMonthDuration)
		return new cXSDuration(vValue.year, vValue.month, 0, 0, 0, 0, vValue.negative);
	if (vValue instanceof cXSDayTimeDuration)
		return new cXSDuration(0, 0, vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
	if (vValue instanceof cXSDuration)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(cXSDuration.RegExp);
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
function fXSDuration_getYearMonthComponent(oDuration) {
	return (oDuration.year ? oDuration.year + 'Y' : '')
			+ (oDuration.month ? oDuration.month + 'M' : '');
};

function fXSDuration_getDayTimeComponent(oDuration) {
	return (oDuration.day ? oDuration.day + 'D' : '')
			+ (oDuration.hours || oDuration.minutes || oDuration.seconds
				? 'T'
					+ (oDuration.hours ? oDuration.hours + 'H' : '')
					+ (oDuration.minutes ? oDuration.minutes + 'M' : '')
					+ (oDuration.seconds ? oDuration.seconds + 'S' : '')
				: '');
};

function fXSDuration_normalize(oDuration) {
	return fXSYearMonthDuration_normalize(fXSDayTimeDuration_normalize(oDuration));
};

//
fStaticContext_defineSystemDataType("duration",	cXSDuration);
