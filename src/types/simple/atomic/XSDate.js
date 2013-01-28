/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDate(nYear, nMonth, nDay, nTimezone, bNegative) {
	this.year		= nYear;
	this.month		= nMonth;
	this.day		= nDay;
	this.timezone	= nTimezone;
	this.negative	= bNegative;
};

cXSDate.prototype	= new cXSAnyAtomicType;
cXSDate.prototype.builtInKind	= cXSConstants.DATE_DT;
cXSDate.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DATE;

cXSDate.prototype.year		= null;
cXSDate.prototype.month		= null;
cXSDate.prototype.day		= null;
cXSDate.prototype.timezone	= null;
cXSDate.prototype.negative	= null;

cXSDate.prototype.toString	= function() {
	return fXSDateTime_getDateComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

var rXSDate		= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSDate.cast	= function(vValue) {
	if (vValue instanceof cXSDate)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDate);
		if (aMatch) {
			var nYear	= +aMatch[2],
				nMonth	= +aMatch[3],
				nDay	= +aMatch[4];
			if (nDay - 1 < fXSDate_getDaysForYearMonth(nYear, nMonth))
				return new cXSDate( nYear,
									nMonth,
									nDay,
									aMatch[5] ? aMatch[5] == 'Z' ? 0 : (aMatch[6] == '-' ? -1 : 1) * (aMatch[7] * 60 + aMatch[8] * 1) : null,
									aMatch[1] == '-'
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
	if (vValue instanceof cXSDateTime)
		return new cXSDate(vValue.year, vValue.month, vValue.day, vValue.timezone, vValue.negative);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:date can never succeed"
//<-Debug
	);
};

// Utilities
var aXSDate_days	= [31,28,31,30,31,30,31,31,30,31,30,31];
function fXSDate_getDaysForYearMonth(nYear, nMonth) {
	return nMonth == 2 && (nYear % 400 == 0 || nYear % 100 != 0 && nYear % 4 == 0) ? 29 : aXSDate_days[nMonth - 1];
};

function fXSDate_normalize(oValue, bDay) {
	// Adjust day for month/year
	if (!bDay) {
		var nDay	= fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
		if (oValue.day > nDay) {
			while (oValue.day > nDay) {
				oValue.month	+= 1;
				if (oValue.month > 12) {
					oValue.year		+= 1;
					if (oValue.year == 0)
						oValue.year	= 1;
					oValue.month	= 1;
				}
				oValue.day	-= nDay;
				nDay = fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
			}
		}
		else
		if (oValue.day < 1) {
			while (oValue.day < 1) {
				oValue.month	-= 1;
				if (oValue.month < 1) {
					oValue.year		-= 1;
					if (oValue.year == 0)
						oValue.year	=-1;
					oValue.month	= 12;
				}
				nDay = fXSDate_getDaysForYearMonth(oValue.year, oValue.month);
				oValue.day	+= nDay;
			}
		}
	}
//?	else
	// Adjust month
	if (oValue.month > 12) {
		oValue.year		+= ~~(oValue.month / 12);
		if (oValue.year == 0)
			oValue.year	= 1;
		oValue.month	= oValue.month % 12;
	}
	else
	if (oValue.month < 1) {
		oValue.year		+= ~~(oValue.month / 12) - 1;
		if (oValue.year == 0)
			oValue.year	=-1;
		oValue.month	= oValue.month % 12 + 12;
	}

	return oValue;
};

//
fStaticContext_defineSystemDataType("date",	cXSDate);
