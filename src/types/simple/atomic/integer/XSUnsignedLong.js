/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSUnsignedLong(nValue) {
	this.value	= nValue;
};

cXSUnsignedLong.prototype	= new cXSNonNegativeInteger;

cXSUnsignedLong.cast	= function(vValue) {
	return new cXSUnsignedLong(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("unsignedLong",	cXSUnsignedLong);
