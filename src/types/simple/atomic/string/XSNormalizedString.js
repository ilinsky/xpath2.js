/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNormalizedString(sValue) {
	this.value	= sValue;
};

cXSNormalizedString.prototype	= new cXSString;
cXSNormalizedString.prototype.builtInKind	= cXSConstants.NORMALIZEDSTRING_DT;

cXSNormalizedString.cast	= function(vValue) {
	return new cXSNormalizedString(cString(vValue));
};

//
fStaticContext_defineSystemDataType("normalizedString",	cXSNormalizedString);
