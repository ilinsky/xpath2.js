/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSUnsignedInt(nValue) {
	this.value	= nValue;
};

cXSUnsignedInt.prototype	= new cXSNonNegativeInteger;

cXSUnsignedInt.cast	= function(vValue) {
	return new cXSUnsignedInt(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("unsignedInt",	cXSUnsignedInt);
