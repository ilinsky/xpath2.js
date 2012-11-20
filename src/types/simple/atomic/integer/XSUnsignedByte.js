/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSUnsignedByte(nValue) {
	this.value	= nValue;
};

cXSUnsignedByte.prototype	= new cXSUnsignedShort;

cXSUnsignedByte.cast	= function(vValue) {
	return new cXSUnsignedByte(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("unsignedByte",	cXSUnsignedByte);
