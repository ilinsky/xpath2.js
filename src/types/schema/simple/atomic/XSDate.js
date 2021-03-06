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
var cXSUntypedAtomic = require('./../atomic/XSUntypedAtomic');
var cXSString = require('./../atomic/XSString');
var cXSDateTime = require('./../atomic/XSDateTime');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

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
	return cXSDateTime.getDateComponent(this)
			+ cXSDateTime.getTZComponent(this);
};

var rXSDate		= /^(-?)([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|([+\-])(0\d|1[0-4]):([0-5]\d))?$/;
cXSDate.cast	= function(vValue) {
	if (vValue instanceof cXSDate)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDate);
		console.log(fString_trim(vValue));
		if (aMatch) {
			var nYear	= +aMatch[2],
				nMonth	= +aMatch[3],
				nDay	= +aMatch[4];
			if (nDay - 1 < cXSDateTime.getDaysForYearMonth(nYear, nMonth))
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

//
module.exports = cXSDate;
