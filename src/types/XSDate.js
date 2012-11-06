/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDate(nYear, nMonth, nDay, nTimezone) {
	this.year		= nYear;
	this.month		= nMonth;
	this.day		= nDay;
	this.timezone	= nTimezone;
};

cXSDate.RegExp	= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;

cXSDate.prototype	= new cXSAnyAtomicType;

cXSDate.prototype.year		= null;
cXSDate.prototype.month		= null;
cXSDate.prototype.day		= null;
cXSDate.prototype.timezone	= null;

cXSDate.prototype.toString	= function() {
	return fXSDateTime_getDateComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

cXSDate.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDate:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= vValue.match(cXSDate.RegExp);
			if (aMatch)
				return new cXSDate( aMatch[2] * (aMatch[1] == '-' ?-1 : 1),
									+aMatch[3],
									+aMatch[4],
									aMatch[5] ? aMatch[5] == 'Z' ? 0 : (aMatch[6] == '-' ? 1 : -1) * (aMatch[7] * 60 + aMatch[8] * 1) : null
				);
			throw new cXPath2Error("FORG0001");
			// TODO: Gregorian
		case cXSDateTime:
			return new cXSDate(vValue.year, vValue.month, vValue.day, vValue.timezone);
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:date can never succeed");
};

//
cFunctionCall.dataTypes["date"]	= cXSDate;

// Utilities
function fXSDate_toSeconds(oDate) {

};