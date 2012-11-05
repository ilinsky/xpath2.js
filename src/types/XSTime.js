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
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSTime:
			return vValue;
		case cXSUntypedAtomic:
		case cXSString:
			//
			return cFunctionCall.dataTypes["time"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:time can never succeed");
};

//
cFunctionCall.dataTypes["time"]	= function(sValue) {
	var aMatch	= sValue.match(cXSTime.RegExp);
	if (aMatch) {
		var bValue	= aMatch[6] == "24:00:00";
		return new cXSTime(bValue ? 24 : +aMatch[2],
							bValue ? 0 : +aMatch[3],
							cNumber((bValue ? 0 : aMatch[4]) + '.' + (bValue ? aMatch[7] || 0 : aMatch[5] || 0)),
							aMatch[8] ? aMatch[8] == 'Z' ? 0 : (aMatch[9] == '-' ? 1 : -1) * (aMatch[10] * 60 + aMatch[11] * 1) : null
		);
	}
	throw new cXPath2Error("FORG0001");
};

//
function fXSTime_toSeconds(oTime) {
	return oTime.seconds + (oTime.minutes + (oTime.timezone !== null ? oTime.timezone % 60 : 0) + (oTime.hours + (oTime.timezone !== null ? ~~(oTime.timezone / 60) : 0)) * 60) * 60;
};