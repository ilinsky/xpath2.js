/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');

var cXSInteger = require('./XSInteger');
var cXSLong = require('./XSLong');

function cXSInt(nValue) {
	this.value	= nValue;
};

cXSInt.prototype	= new cXSLong;
cXSInt.prototype.builtInKind	= cXSConstants.INT_DT;

cXSInt.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 2147483647 && oValue.value >= -2147483648)
		return new cXSInt(oValue.value);
	//
	throw new cException("FORG0001");
};

//
module.exports = cXSInt;
