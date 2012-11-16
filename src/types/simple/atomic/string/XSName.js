/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSName(sValue) {
	this.value	= sValue;
};

cXSName.prototype	= new cXSToken;

cXSName.cast	= function(vValue) {
	return new cXSName(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("Name",	cXSName);
