/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSInteger() {

};

cXSInteger.RegExp	= /^[-+]?[0-9]+$/;

cXSInteger.prototype	= new cXSDecimal;

cXSInteger.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSInteger:
			return vValue;
		case cXSBoolean:
			vValue	= !!vValue;
		case cXSUntypedAtomic:
		case cXSString:
			//
		case cXSFloat:
		case cXSDouble:
		case cXSDecimal:
			return cFunctionCall.dataTypes["integer"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:integer can never succeed");
};

//
cFunctionCall.dataTypes["integer"]	= function(sValue) {
	var aMatch	= sValue.match(cXSInteger.RegExp);
	if (aMatch)
		return ~~sValue;
	throw new cXPath2Error("FORG0001");
};