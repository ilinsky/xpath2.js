/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSTime(nHours, nMinutes, nSeconds, nTimezone) {
	this.hours	= nHours;
	this.minutes	= nMinutes;
	this.seconds	= nSeconds;
	this.timezone	= nTimezone;
};

cXSTime.RegExp	= /^(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;

cXSTime.prototype	= new cXSAnyAtomicType;

cXSTime.prototype.hours		= null;
cXSTime.prototype.minutes	= null;
cXSTime.prototype.seconds	= null;
cXSTime.prototype.timezone		= null;

cXSTime.prototype.toString	= function() {
	return fXSDateTime_getTimeComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

cXSTime.cast	= function(vValue) {
	if (vValue instanceof cXSTime)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(cXSTime.RegExp);
		if (aMatch) {
			var bValue	= !!aMatch[6];
			return new cXSTime(bValue ? 0 : +aMatch[2],
								bValue ? 0 : +aMatch[3],
								cNumber((bValue ? 0 : aMatch[4]) + '.' + (bValue ? 0 : aMatch[5] || 0)),
								aMatch[8] ? aMatch[8] == 'Z' ? 0 : (aMatch[9] == '-' ? -1 : 1) * (aMatch[10] * 60 + aMatch[11] * 1) : null
			);
		}
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSDateTime)
		return new cXSTime(vValue.hours, vValue.minutes, vValue.seconds, vValue.timezone);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:time can never succeed"
//<-Debug
	);
};

//
function fXSTime_normalize(oValue) {
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
			oValue.day		+= ~~(oValue.hours / 24) - (oValue.hours < 0 && oValue.hours % 24 ? 1 : 0);
		oValue.hours	= oValue.hours % 24 + (oValue.hours < 0 && oValue.hours % 24 ? 24 : 0);
	}
	//
	return oValue;
};

//
fStaticContext_defineSystemDataType("time",	cXSTime);
