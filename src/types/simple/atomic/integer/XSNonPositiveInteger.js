/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNonPositiveInteger(nValue) {
	this.value	= nValue;
};

cXSNonPositiveInteger.prototype	= new cXSInteger;
cXSNonPositiveInteger.prototype.builtInKind	= cXSConstants.NONPOSITIVEINTEGER_DT;

cXSNonPositiveInteger.cast	= function(vValue) {
	return new cXSNonPositiveInteger(cNumber(vValue));
};

//
fStaticContext_defineSystemDataType("nonPositiveInteger",	cXSNonPositiveInteger);
