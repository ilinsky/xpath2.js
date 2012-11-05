/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSBoolean() {

};

cXSBoolean.RegExp	= /^(0|1|true|false)$/;

cXSBoolean.prototype	= new cXSAnyAtomicType;

cXSBoolean.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSBoolean:
			return vValue;

		case cXSUntypedAtomic:
		case cXSString:
			//
		case cXSFloat:
		case cXSDouble:
		case cXSDecimal:
		case cXSInteger:
			return cFunctionCall.dataTypes["boolean"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:boolean can never succeed");
};

//
cFunctionCall.dataTypes["boolean"]	= function(sValue) {
	var aMatch;
	if (aMatch = sValue.match(cXSBoolean.RegExp))
		return aMatch[1] == "1" || aMatch[1] == "true";
	throw new cXPath2Error("FORG0001");
};;