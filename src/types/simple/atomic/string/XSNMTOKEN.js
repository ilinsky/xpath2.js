/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNMTOKEN(sValue) {
	this.value	= sValue;
};

cXSNMTOKEN.prototype	= new cXSToken;

cXSNMTOKEN.cast	= function(vValue) {
	return new cXSNMTOKEN(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("NMTOKEN",	cXSNMTOKEN);
