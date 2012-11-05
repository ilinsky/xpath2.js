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

cXSAnyAtomicType.typeOf	= function(oValue) {
	switch (typeof oValue) {
		case "boolean":	return cXSBoolean;
		case "string":	return cXSString;
		case "number":	return ~~oValue == oValue ? cXSInteger : cXSDecimal;
		default:
			if (oValue instanceof cXSUntypedAtomic)
				return cXSUntypedAtomic;
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
