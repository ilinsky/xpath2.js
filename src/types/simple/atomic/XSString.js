/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSString(sValue) {
	this.value	= sValue;
};

cXSString.prototype	= new cXSAnyAtomicType;

cXSString.prototype.value	= null;

cXSString.prototype.valueOf		= function() {
	return this.value;
};

cXSString.prototype.toString	= function() {
	return this.value;
};

cXSString.cast	= function(vValue) {
	return new cXSString(cString(vValue));
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:string can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("string",	cXSString);
