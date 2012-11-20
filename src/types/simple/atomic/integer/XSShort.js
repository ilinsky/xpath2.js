/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSShort(nValue) {
	this.value	= nValue;
};

cXSShort.prototype	= new cXSInt;

cXSShort.cast	= function(vValue) {
	return new cXSShort(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("short",	cXSShort);
