/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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
cXSUnsignedShort.prototype.builtInKind	= cXSConstants.UNSIGNEDSHORT_DT;

cXSUnsignedShort.cast	= function(vValue) {
	return new cXSUnsignedShort(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("unsignedShort",	cXSUnsignedShort);
