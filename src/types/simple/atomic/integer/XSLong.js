/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSLong(nValue) {
	this.value	= nValue;
};

cXSLong.prototype	= new cXSInteger;

cXSLong.cast	= function(vValue) {
	return new cXSLong(cNumber(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("long",	cXSLong);
