/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSInt(nValue) {
	this.value	= nValue;
};

cXSInt.prototype	= new cXSLong;

cXSInt.cast	= function(vValue) {
	return new cXSInt(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("int",	cXSInt);
