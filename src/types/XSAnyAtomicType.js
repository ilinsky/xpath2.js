/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSAnyAtomicType() {

};

cXSAnyAtomicType.cast	= function(vValue) {
	throw new cXPath2Error("XPST0017"
//->Debug
			, "Abstract type used in constructor function xs:anyAtomicType"
//<-Debug
	);	//  {http://www.w3.org/2001/XMLSchema}anyAtomicType
};

cFunctionCall.dataTypes["anyAtomicType"]	= cXSAnyAtomicType;

//
cXSAnyAtomicType.typeOf	= function(oValue) {
	if (oValue instanceof cXSUntypedAtomic)
		return cXSUntypedAtomic;
	switch (typeof oValue) {
		case "boolean":	return cXSBoolean;
		case "string":	return cXSString;
		case "number":	return ~~oValue == oValue ? cXSInteger : cXSDecimal;
		default:
			// Date/Time
			if (oValue instanceof cXSDate)
				return cXSDate;
			if (oValue instanceof cXSDateTime)
				return cXSDateTime;
			if (oValue instanceof cXSTime)
				return cXSTime;
			// Durations
			if (oValue instanceof cXSDayTimeDuration)
				return cXSDayTimeDuration;
			if (oValue instanceof cXSYearMonthDuration)
				return cXSYearMonthDuration;
			if (oValue instanceof cXSDuration)
				return cXSDuration;
			// Other
			if (oValue instanceof cXSQName)
				return cXSQName;
	}
	throw "Internal error: Could not identify type of item: " + oValue;
};

cXSAnyAtomicType.isNumeric	= function(cType) {
	return cType == cXSFloat || cType == cXSDouble || cType == cXSDecimal || cType.prototype instanceof cXSDecimal;
};