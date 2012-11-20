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

//
cXSAnyAtomicType.typeOf	= function(oValue) {
	if (oValue instanceof cXSUntypedAtomic)
		return cXSUntypedAtomic;
	//
	if (oValue instanceof cXSBoolean)
		return cXSBoolean;
	//
	if (oValue instanceof cXSString)
		return cXSString;
	//
	if (oValue instanceof cXSInteger)
		return cXSInteger;
	if (oValue instanceof cXSDecimal)
		return cXSDecimal;
	if (oValue instanceof cXSDouble)
		return cXSDouble;
	if (oValue instanceof cXSFloat)
		return cXSFloat;
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
	if (oValue instanceof cXSAnyURI)
		return cXSAnyURI;
	// Binary data
	if (oValue instanceof cXSHexBinary)
		return cXSHexBinary;
	if (oValue instanceof cXSBase64Binary)
		return cXSBase64Binary;

	throw "Internal error: Could not identify type of item: " + oValue;
};

function fXSAnyAtomicType_isNumeric(vItem) {
	return vItem instanceof cXSFloat || vItem instanceof cXSDouble || vItem instanceof cXSDecimal;
};

//
fXPath2StaticContext_defineSystemDataType("anyAtomicType",	cXSAnyAtomicType);
