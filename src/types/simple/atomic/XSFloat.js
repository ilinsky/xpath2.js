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

cXSFloat.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;

cXSFloat.prototype	= new cXSAnyAtomicType;

cXSFloat.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSFloat:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= fString_trim.call(vValue).match(cXSFloat.RegExp);
			if (aMatch)
				return aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue;
			throw new cXPath2Error("FORG0001");
		case cXSBoolean:
			vValue	= vValue * 1;
		case cXSDouble:
		case cXSDecimal:
		case cXSInteger:
			return vValue;
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:float can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("float",	cXSFloat);
