/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSConstants = require('./../../../../classes/XSConstants');
var cXSInteger = require('./XSInteger');

function cXSLong(nValue) {
	this.value	= nValue;
};

cXSLong.prototype	= new cXSInteger;
cXSLong.prototype.builtInKind	= cXSConstants.LONG_DT;

cXSLong.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 9223372036854775807 && oValue.value >= -9223372036854775808)
		return new cXSLong(oValue.value);
	//
	throw new cException("FORG0001");
};

//
module.exports = cXSLong;
