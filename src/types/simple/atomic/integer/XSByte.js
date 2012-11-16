/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSByte(nValue) {
	this.value	= nValue;
};

cXSByte.prototype	= new cXSShort;

cXSByte.cast	= function(vValue) {
	return new cXSByte(cNumber(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("byte",	cXSByte);
