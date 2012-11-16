/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSID(sValue) {
	this.value	= sValue;
};

cXSID.prototype	= new cXSNCName;

cXSID.cast	= function(vValue) {
	return new cXSID(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("ID",	cXSID);
