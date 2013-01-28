/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSGYear(nYear, nTimezone) {
	this.year	= nYear;
	this.timezone	= nTimezone;
};

cXSGYear.prototype	= new cXSAnyAtomicType;
cXSGYear.prototype.builtInKind		= cXSConstants.GYEAR_DT;
cXSGYear.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_GYEAR;

cXSGYear.prototype.year		= null;
cXSGYear.prototype.timezone	= null;

cXSGYear.prototype.toString	= function() {
	return fXSDateTime_pad(this.year)
			+ fXSDateTime_getTZComponent(this);
};

var rXSGYear		= /^-?([1-9]\d\d\d+|0\d\d\d)(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSGYear.cast	= function(vValue) {
	if (vValue instanceof cXSGYear)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSGYear);
		if (aMatch) {
			var nYear	= +aMatch[1];
			return new cXSGYear(	nYear,
									aMatch[2] ? aMatch[2] == 'Z' ? 0 : (aMatch[3] == '-' ? -1 : 1) * (aMatch[4] * 60 + aMatch[5] * 1) : null
			);
		}
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSDate || vValue instanceof cXSDateTime)
		return new cXSGYear(vValue.year, vValue.timezone);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:gYear can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("gYear",	cXSGYear);