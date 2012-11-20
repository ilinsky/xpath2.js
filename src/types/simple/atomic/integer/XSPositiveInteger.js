/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSPositiveInteger(nValue) {
	this.value	= nValue;
};

cXSPositiveInteger.prototype	= new cXSNonNegativeInteger;

cXSPositiveInteger.cast	= function(vValue) {
	return new cXSPositiveInteger(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("positiveInteger",	cXSPositiveInteger);
