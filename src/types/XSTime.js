/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSTime(nHour, nMinute, nSecond, nMillisecond, nTimezone) {
	this.hour	= nHour;
	this.minute	= nMinute;
	this.second	= nSecond;
	this.millisecond= nMillisecond;
	this.timezone	= nTimezone;
};

cXSTime.RegExp	= /^(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d+)?|(24:00:00)(\.0+)?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;

cXSTime.prototype	= new cXSAnyAtomicType;

cXSTime.prototype.hour		= null;
cXSTime.prototype.minute	= null;
cXSTime.prototype.second	= null;
cXSTime.prototype.millisecond	= null;
cXSTime.prototype.timezone		= null;

cXSTime.prototype.toString	= function() {
	return fXSDateTime_getTimeComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

//
cFunctionCall.dataTypes["time"]	= function(sValue) {
	var aMatch	= sValue.match(cXSTime.RegExp);
	if (aMatch) {
		var bValue	= aMatch[6] == "24:00:00";
		return new cXSTime(bValue ? 24 : +aMatch[2],
							bValue ? 0 : +aMatch[3],
							bValue ? 0 : +aMatch[4],
							bValue ? +aMatch[7] || 0 : +aMatch[5] || 0,
							aMatch[8] ? aMatch[8] == 'Z' ? 0 : (aMatch[9] == '-' ? 1 : -1) * (aMatch[10] * 60 + aMatch[11] * 1) : null
		);
	}
	throw new cXPath2Error("FORG0001");
};