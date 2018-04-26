/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../../../../classes/StaticContext');
var cXSConstants = require('./../../../../classes/XSConstants');
var cXSInteger = require('./XSInteger');

function cXSNonNegativeInteger(nValue) {
	this.value	= nValue;
};

cXSNonNegativeInteger.prototype	= new cXSInteger;
cXSNonNegativeInteger.prototype.builtInKind	= cXSConstants.NONNEGATIVEINTEGER_DT;

cXSNonNegativeInteger.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value >= 0)
		return new cXSNonNegativeInteger(oValue.value);
	//
	throw new cException("FORG0001");
};

//
cStaticContext.defineSystemDataType("nonNegativeInteger",	cXSNonNegativeInteger);

//
module.exports = cXSNonNegativeInteger;
