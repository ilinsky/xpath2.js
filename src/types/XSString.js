/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSString() {

};

cXSString.prototype	= new cXSAnyAtomicType;

cXSString.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSString:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSFloat:
		case cXSDouble:
		case cXSDecimal:
		case cXSInteger:
		//
		case cXSDuration:
		case cXSYearMonthDuration:
		case cXSDayTimeDuration:
		//
		case cXSDateTime:
		case cXSTime:
		case cXSDate:
		// TODO: Gregorian
		//
		// TODO: Binary
		// TODO: anyURI
		//
		case cXSQName:
			//
			return cString(vValue);
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:string can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("string",	cXSString);
