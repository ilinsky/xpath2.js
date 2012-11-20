/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSYearMonthDuration(nYear, nMonth, bNegative) {
	cXSDuration.call(this, nYear, nMonth, 0, 0, 0, 0, bNegative);
};

cXSYearMonthDuration.RegExp	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?$/;

cXSYearMonthDuration.prototype	= new cXSDuration;

cXSYearMonthDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (fXSDuration_getYearMonthComponent(this) || '0M');
};

cXSYearMonthDuration.cast	= function(vValue) {
	if (vValue instanceof cXSYearMonthDuration)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim.call(vValue).match(cXSYearMonthDuration.RegExp);
		if (aMatch)
			return fXSYearMonthDuration_normalize(new cXSYearMonthDuration(+aMatch[2] || 0, +aMatch[3] || 0, aMatch[1] == '-'));
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSDayTimeDuration)
		return new cXSYearMonthDuration(0, 0);
	if (vValue instanceof cXSDuration)
		return new cXSYearMonthDuration(vValue.year, vValue.month, vValue.negative);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:yearMonthDuration can never succeed"
//<-Debug
	);
};

//
function fXSYearMonthDuration_normalize(oDuration) {
	if (oDuration.month >= 12) {
		oDuration.year	+= ~~(oDuration.month / 12);
		oDuration.month	%= 12;
	}
	return oDuration;
};

//
fStaticContext_defineSystemDataType("yearMonthDuration",	cXSYearMonthDuration);
