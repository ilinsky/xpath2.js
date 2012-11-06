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
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= vValue.match(cXSDecimal.RegExp);
			if (aMatch)
				return +vValue;
			throw new cXPath2Error("FORG0001");
		case cXSBoolean:
			vValue	= vValue * 1;
		case cXSFloat:
		case cXSDouble:
		case cXSInteger:
			return vValue;
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:decimal can never succeed");
};

//
cFunctionCall.dataTypes["decimal"]	= cXSDecimal;