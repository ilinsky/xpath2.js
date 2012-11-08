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

cXSDouble.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;

cXSDouble.prototype	= new cXSAnyAtomicType;

cXSDouble.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDouble:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= vValue.match(cXSDouble.RegExp);
			if (aMatch)
				return aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue;
			throw new cXPath2Error("FORG0001");
		case cXSBoolean:
			vValue	= vValue * 1;
		case cXSFloat:
		case cXSDecimal:
		case cXSInteger:
			return vValue;
	}
	throw new cXPath2Error("XPTY0004", "Casting from " + cType + " to xs:double can never succeed");
};

//
cFunctionCall.dataTypes["double"]	= cXSDouble;