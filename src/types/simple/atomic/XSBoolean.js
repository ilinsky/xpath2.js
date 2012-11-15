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
			vValue	= vValue.toString();
		case cXSString:
			var aMatch;
			if (aMatch = fString_trim.call(vValue).match(cXSBoolean.RegExp))
				return aMatch[1] == "1" || aMatch[1] == "true";
			throw new cXPath2Error("FORG0001");
		case cXSFloat:
		case cXSDouble:
		case cXSDecimal:
		case cXSInteger:
			return vValue != 0;
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:boolean can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("boolean",	cXSBoolean);
