/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSToken(sValue) {
	this.value	= sValue;
};

cXSToken.prototype	= new cXSNormalizedString;

cXSToken.cast	= function(vValue) {
	return new cXSToken(cString(vValue));
};

//
fStaticContext_defineSystemDataType("token",	cXSToken);
