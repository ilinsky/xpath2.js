/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSUnsignedShort(nValue) {
	this.value	= nValue;
};

cXSUnsignedShort.prototype	= new cXSUnsignedInt;

cXSUnsignedShort.cast	= function(vValue) {
	return new cXSUnsignedShort(cNumber(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("unsignedShort",	cXSUnsignedShort);
