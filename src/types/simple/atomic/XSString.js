/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSString(sValue) {
	this.value	= sValue;
};

cXSString.prototype	= new cXSAnyAtomicType;

cXSString.prototype.value	= null;

cXSString.prototype.valueOf		= function() {
	return this.value;
};

cXSString.prototype.toString	= function() {
	return this.value;
};

cXSString.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSString:
			return vValue;
		case cXSUntypedAtomic:
		case cXSBoolean:
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
		case cXSAnyURI:
		//
		case cXSQName:
			//
			return new cXSString(cString(vValue));
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:string can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("string",	cXSString);
