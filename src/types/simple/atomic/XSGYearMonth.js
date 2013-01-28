/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSGYearMonth(nYear, nMonth, nTimezone) {
	this.year		= nYear;
	this.month		= nMonth;
	this.timezone	= nTimezone;
};

cXSGYearMonth.prototype	= new cXSAnyAtomicType;
cXSGYearMonth.prototype.builtInKind		= cXSConstants.GYEARMONTH_DT;
cXSGYearMonth.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GYEARMONTH;

cXSGYearMonth.prototype.year	= null;
cXSGYearMonth.prototype.month	= null;
cXSGYearMonth.prototype.timezone= null;

cXSGYearMonth.prototype.toString	= function() {
	return fXSDateTime_pad(this.year)
			+ '-' + fXSDateTime_pad(this.month)
			+ fXSDateTime_getTZComponent(this);
};

var rXSGYearMonth	= /^-?([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSGYearMonth.cast	= function(vValue) {
	if (vValue instanceof cXSGYearMonth)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSGYearMonth);
		if (aMatch) {
			var nYear	= +aMatch[1],
				nMonth	= +aMatch[2];
			return new cXSGYearMonth(	nYear,
										nMonth,
										aMatch[3] ? aMatch[3] == 'Z' ? 0 : (aMatch[4] == '-' ? -1 : 1) * (aMatch[5] * 60 + aMatch[6] * 1) : null
			);
		}
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
		return new cXSGYearMonth(vValue.year, vValue.month, vValue.timezone);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:gYearMonth can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("gYearMonth",	cXSGYearMonth);