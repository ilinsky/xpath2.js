/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNCName(sValue) {
	this.value	= sValue;
};

cXSNCName.prototype	= new cXSName;

cXSNCName.cast	= function(vValue) {
	return new cXSNCName(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("NCName",	cXSNCName);
