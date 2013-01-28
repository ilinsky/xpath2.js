/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSGDay(nDay, nTimezone) {
	this.day		= nDay;
	this.timezone	= nTimezone;
};

cXSGDay.prototype	= new cXSAnyAtomicType;
cXSGDay.prototype.builtInKind	= cXSConstants.GDAY_DT;
cXSGDay.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GDAY;

cXSGDay.prototype.day		= null;
cXSGDay.prototype.timezone	= null;

cXSGDay.prototype.toString	= function() {
	return '-'
			+ '-'
			+ '-' + fXSDateTime_pad(this.day)
			+ fXSDateTime_getTZComponent(this);
};

var rXSGDay		= /^---(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSGDay.cast	= function(vValue) {
	if (vValue instanceof cXSGDay)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSGDay);
		if (aMatch) {
			var nDay	= +aMatch[1];
			return new cXSGDay(	nDay,
								aMatch[2] ? aMatch[2] == 'Z' ? 0 : (aMatch[3] == '-' ? -1 : 1) * (aMatch[4] * 60 + aMatch[5] * 1) : null
			);
		}
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
		return new cXSGDay(vValue.day, vValue.timezone);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:gDay can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("gDay",	cXSGDay);