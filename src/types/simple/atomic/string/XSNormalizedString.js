/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNormalizedString(vValue) {
	this.value	= vValue;
};

cXSNormalizedString.prototype	= new cXSString;

cXSNormalizedString.prototype.toString	= function() {
	return this.value;
};

cXSNormalizedString.cast	= function(vValue) {
	return new cXSNormalizedString(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("normalizedString",	cXSNormalizedString);