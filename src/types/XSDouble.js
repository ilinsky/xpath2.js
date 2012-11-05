/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDouble() {

};

cXSDouble.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|-?INF|NaN)$/;

cXSDouble.prototype	= new cXSAnyAtomicType;

cXSDouble.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDouble:
			return vValue;
		case cXSBoolean:
			vValue	= !!vValue;
		case cXSUntypedAtomic:
		case cXSString:
			//
		case cXSFloat:
		case cXSDecimal:
		case cXSInteger:
			return cFunctionCall.dataTypes["double"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:double can never succeed");
};

//
cFunctionCall.dataTypes["double"]	= function(sValue) {
	var aMatch	= sValue.match(cXSDouble.RegExp);
	if (aMatch)
		return +sValue;
	throw new cXPath2Error("FORG0001");
};