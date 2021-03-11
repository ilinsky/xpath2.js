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
var cXSDateTime = require('./XSDateTime');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSTime(nHours, nMinutes, nSeconds, nTimezone) {
	this.hours	= nHours;
	this.minutes	= nMinutes;
	this.seconds	= nSeconds;
	this.timezone	= nTimezone;
};

cXSTime.prototype	= new cXSAnyAtomicType;
cXSTime.prototype.builtInKind	= cXSConstants.TIME_DT;
cXSTime.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_TIME;

cXSTime.prototype.hours		= null;
cXSTime.prototype.minutes	= null;
cXSTime.prototype.seconds	= null;
cXSTime.prototype.timezone		= null;

cXSTime.prototype.toString	= function() {
	return cXSDateTime.getTimeComponent(this)
			+ cXSDateTime.getTZComponent(this);
};

var rXSTime		= /^(([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?|(24:00:00)(?:\.(0+))?)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSTime.cast	= function(vValue) {
	if (vValue instanceof cXSTime)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSTime);
		if (aMatch) {
			var bValue	= !!aMatch[6];
			return new cXSTime(bValue ? 0 : +aMatch[2],
								bValue ? 0 : +aMatch[3],
								+((bValue ? 0 : aMatch[4]) + '.' + (bValue ? 0 : aMatch[5] || 0)),
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
module.exports = cXSTime;
