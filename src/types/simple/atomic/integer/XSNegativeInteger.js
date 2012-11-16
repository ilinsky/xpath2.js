/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNegativeInteger(nValue) {
	this.value	= nValue;
};

cXSNegativeInteger.prototype	= new cXSNonPositiveInteger;

cXSNegativeInteger.cast	= function(vValue) {
	return new cXSNegativeInteger(cNumber(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("negativeInteger",	cXSNegativeInteger);
