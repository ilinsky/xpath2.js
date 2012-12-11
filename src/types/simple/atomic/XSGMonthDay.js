/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSGMonthDay(nMonth, nDay, nTimezone) {
	this.month		= nMonth;
	this.day		= nDay;
	this.timezone	= nTimezone;
};

cXSGMonthDay.prototype	= new cXSAnyAtomicType;
cXSGMonthDay.prototype.builtInKind		= cXSConstants.GMONTHDAY_DT;
cXSGMonthDay.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GMONTHDAY;

cXSGMonthDay.prototype.month	= null;
cXSGMonthDay.prototype.day		= null;
cXSGMonthDay.prototype.timezone	= null;

cXSGMonthDay.prototype.toString	= function() {
	return '-'
			+ '-' + fXSDateTime_pad(this.month)
			+ '-' + fXSDateTime_pad(this.day)
			+ fXSDateTime_getTZComponent(this);
};

var rXSGMonthDay	= /^--(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSGMonthDay.cast	= function(vValue) {
	if (vValue instanceof cXSGMonthDay)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSGMonthDay);
		if (aMatch) {
			var nMonth	= +aMatch[1],
				nDay	= +aMatch[2];
			if (nDay - 1 < fXSDate_getDaysForYearMonth(1976, nMonth))
				return new cXSGMonthDay(	nMonth,
											nDay,
											aMatch[3] ? aMatch[3] == 'Z' ? 0 : (aMatch[4] == '-' ? -1 : 1) * (aMatch[5] * 60 + aMatch[6] * 1) : null
				);
			//
			throw new cException("FORG0001"
//->Debug
					, "Invalid date '" + vValue + "' (Non-existent date)"
//<-Debug
			);
		}
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
		return new cXSGMonthDay(vValue.month, vValue.day, vValue.timezone);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:gMonthDay can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("gMonthDay",	cXSGMonthDay);