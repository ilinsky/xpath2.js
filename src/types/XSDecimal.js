/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDecimal() {

};

cXSDecimal.RegExp	= /^[+\-]?((\d+(\.\d*)?)|(\.\d+))$/;

cXSDecimal.prototype	= new cXSAnyAtomicType;

cXSDecimal.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDecimal:
			return vValue;
		case cXSBoolean:
			vValue	= !!vValue;
		case cXSUntypedAtomic:
		case cXSString:
			//
		case cXSFloat:
		case cXSDouble:
		case cXSInteger:
			return cFunctionCall.dataTypes["decimal"](cString(vValue));
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:decimal can never succeed");
};

//
cFunctionCall.dataTypes["decimal"]	= function(sValue) {
	var aMatch	= sValue.match(cXSDecimal.RegExp);
	if (aMatch)
		return +sValue;
	throw new cXPath2Error("FORG0001");
};