/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSFloat() {

};

cXSFloat.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|-?INF|NaN)$/;

cXSFloat.prototype	= new cXSAnyAtomicType;

cXSFloat.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSFloat:
			return vValue;
		case cXSBoolean:
			vValue	= !!vValue;
		case cXSUntypedAtomic:
		case cXSString:
			//
		case cXSDouble:
		case cXSDecimal:
		case cXSInteger:
			return cFunctionCall.dataTypes["float"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:float can never succeed");
};

//
cFunctionCall.dataTypes["float"]	= function(sValue) {
	var aMatch	= sValue.match(cXSFloat.RegExp);
	if (aMatch)
		return +sValue;
	throw new cXPath2Error("FORG0001");
};