/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDayTimeDuration(nDay, nHours, nMinutes, nSeconds, bNegative) {
	cXSDuration.call(this, 0, 0, nDay, nHours, nMinutes, nSeconds, bNegative);
};

cXSDayTimeDuration.prototype	= new cXSDuration;
cXSDayTimeDuration.prototype.builtInKind	= cXSConstants.DAYTIMEDURATION_DT;

cXSDayTimeDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (fXSDuration_getDayTimeComponent(this) || 'T0S');
};

var rXSDayTimeDuration	= /^(-)?P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;
cXSDayTimeDuration.cast	= function(vValue) {
	if (vValue instanceof cXSDayTimeDuration)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDayTimeDuration);
		if (aMatch)
			return fXSDayTimeDuration_normalize(new cXSDayTimeDuration(+aMatch[2] || 0, +aMatch[3] || 0, +aMatch[4] || 0, +aMatch[5] || 0, aMatch[1] == '-'));
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSYearMonthDuration)
		return new cXSDayTimeDuration(0, 0, 0, 0);
	if (vValue instanceof cXSDuration)
		return new cXSDayTimeDuration(vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:dayTimeDuration can never succeed"
//<-Debug
	);
};

// Utilities
function fXSDayTimeDuration_normalize(oDuration) {
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

//
fStaticContext_defineSystemDataType("dayTimeDuration",	cXSDayTimeDuration);
