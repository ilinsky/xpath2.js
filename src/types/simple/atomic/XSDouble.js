/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDouble(nValue) {
	this.value	= nValue;
};

cXSDouble.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;

cXSDouble.prototype	= new cXSAnyAtomicType;

cXSDouble.prototype.value	= null;

cXSDouble.prototype.valueOf	= function() {
	return this.value;
};

cXSDouble.prototype.toString	= function() {
	return cString(this.value);
};

cXSDouble.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDouble:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= fString_trim.call(vValue).match(cXSDouble.RegExp);
			if (aMatch)
				return new cXSDouble(aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue);
			throw new cXPath2Error("FORG0001");
		case cXSBoolean:
			return new cXSDouble(vValue * 1);
		case cXSFloat:
		case cXSDecimal:
		case cXSInteger:
			return new cXSDouble(vValue.value);
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:double can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("double",	cXSDouble);
