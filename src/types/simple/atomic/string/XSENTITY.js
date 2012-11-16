/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSENTITY(sValue) {
	this.value	= sValue;
};

cXSENTITY.prototype	= new cXSNCName;

cXSENTITY.cast	= function(vValue) {
	return new cXSENTITY(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("ENTITY",	cXSENTITY);
