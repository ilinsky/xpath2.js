/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	10.4 Comparison Operators on Duration, Date and Time Values
		op:yearMonthDuration-less-than
		op:yearMonthDuration-greater-than
		op:dayTimeDuration-less-than
		op:dayTimeDuration-greater-than
		op:duration-equal
		op:dateTime-equal
		op:dateTime-less-than
		op:dateTime-greater-than
		op:date-equal
		op:date-less-than
		op:date-greater-than
		op:time-equal
		op:time-less-than
		op:time-greater-than
		op:gYearMonth-equal
		op:gYear-equal
		op:gMonthDay-equal
		op:gMonth-equal
		op:gDay-equal

	10.6 Arithmetic Operators on Durations
		op:add-yearMonthDurations
		op:subtract-yearMonthDurations
		op:multiply-yearMonthDuration
		op:divide-yearMonthDuration
		op:divide-yearMonthDuration-by-yearMonthDuration
		op:add-dayTimeDurations
		op:subtract-dayTimeDurations
		op:multiply-dayTimeDuration
		op:divide-dayTimeDuration
		op:divide-dayTimeDuration-by-dayTimeDuration


	10.8 Arithmetic Operators on Durations, Dates and Times
		op:subtract-dateTimes
		op:subtract-dates
		op:subtract-times
		op:add-yearMonthDuration-to-dateTime
		op:add-dayTimeDuration-to-dateTime
		op:subtract-yearMonthDuration-from-dateTime
		op:subtract-dayTimeDuration-from-dateTime
		op:add-yearMonthDuration-to-date
		op:add-dayTimeDuration-to-date
		op:subtract-yearMonthDuration-from-date
		op:subtract-dayTimeDuration-from-date
		op:add-dayTimeDuration-to-time
		op:subtract-dayTimeDuration-from-time

*/

// 10.4 Comparison Operators on Duration, Date and Time Values
// op:yearMonthDuration-less-than($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:boolean
cFunctionCall.operators["yearMonthDuration-less-than"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_toMonths(oLeft) < fXSYearMonthDuration_toMonths(oRight);
};

// op:yearMonthDuration-greater-than($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:boolean
cFunctionCall.operators["yearMonthDuration-greater-than"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_toMonths(oLeft) > fXSYearMonthDuration_toMonths(oRight);
};

// op:dayTimeDuration-less-than($arg1 as dayTimeDuration, $arg2 as dayTimeDuration) as xs:boolean
cFunctionCall.operators["dayTimeDuration-less-than"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_toSeconds(oLeft) < fXSDayTimeDuration_toSeconds(oRight);
};

// op:dayTimeDuration-greater-than($arg1 as dayTimeDuration, $arg2 as dayTimeDuration) as xs:boolean
cFunctionCall.operators["dayTimeDuration-greater-than"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_toSeconds(oLeft) > fXSDayTimeDuration_toSeconds(oRight);
};

// op:duration-equal($arg1 as xs:duration, $arg2 as xs:duration) as xs:boolean
cFunctionCall.operators["duration-equal"]	= function(oLeft, oRight) {
	return oLeft.negative == oRight.negative
			&& fXSYearMonthDuration_toMonths(oLeft) == fXSYearMonthDuration_toMonths(oRight)
			&& fXSDayTimeDuration_toSeconds(oLeft) == fXSDayTimeDuration_toSeconds(oRight);
};

// op:dateTime-equal($arg1 as xs:dateTime, $arg2 as xs:dateTime)
cFunctionCall.operators["dateTime-equal"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'eq');
};

// op:dateTime-less-than($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
cFunctionCall.operators["dateTime-less-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'lt');
};

//op:dateTime-greater-than($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
cFunctionCall.operators["dateTime-greater-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'gt');
};

// op:date-equal($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
cFunctionCall.operators["date-equal"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'eq');
};

// op:date-less-than($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
cFunctionCall.operators["date-less-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'lt');
};

// op:date-greater-than($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
cFunctionCall.operators["date-greater-than"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_compareDateTime(oLeft, oRight, 'gt');
};

// op:time-equal($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
cFunctionCall.operators["time-equal"]	= function(oLeft, oRight) {
	return fXSTime_toSeconds(oLeft) == fXSTime_toSeconds(oRight);
};

// op:time-less-than($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
cFunctionCall.operators["time-less-than"]	= function(oLeft, oRight) {
	return fXSTime_toSeconds(oLeft) < fXSTime_toSeconds(oRight);
};

// op:time-greater-than($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
cFunctionCall.operators["time-greater-than"]	= function(oLeft, oRight) {
	return fXSTime_toSeconds(oLeft) > fXSTime_toSeconds(oRight);
};

// op:gYearMonth-equal
// op:gYear-equal
// op:gMonthDay-equal
// op:gMonth-equal
// op:gDay-equal


// 10.6 Arithmetic Operators on Durations
// op:add-yearMonthDurations($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:yearMonthDuration
cFunctionCall.operators["add-yearMonthDurations"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_fromMonths(fXSYearMonthDuration_toMonths(oLeft) + fXSYearMonthDuration_toMonths(oRight));
};

// op:subtract-yearMonthDurations($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:yearMonthDuration
cFunctionCall.operators["subtract-yearMonthDurations"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_fromMonths(fXSYearMonthDuration_toMonths(oLeft) - fXSYearMonthDuration_toMonths(oRight));
};

// op:multiply-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:double) as xs:yearMonthDuration
cFunctionCall.operators["multiply-yearMonthDuration"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_fromMonths(fXSYearMonthDuration_toMonths(oLeft) * oRight);
};

// op:divide-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:double) as xs:yearMonthDuration
cFunctionCall.operators["divide-yearMonthDuration"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_fromMonths(fXSYearMonthDuration_toMonths(oLeft) / oRight);
};

// op:divide-yearMonthDuration-by-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:decimal
cFunctionCall.operators["divide-yearMonthDuration-by-yearMonthDuration"]	= function(oLeft, oRight) {
	return fXSYearMonthDuration_toMonths(oLeft) / fXSYearMonthDuration_toMonths(oRight);
};

// op:add-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:dayTimeDuration
cFunctionCall.operators["add-dayTimeDurations"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_fromSeconds(fXSDayTimeDuration_toSeconds(oLeft) + fXSDayTimeDuration_toSeconds(oRight));
};

// op:subtract-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:dayTimeDuration
cFunctionCall.operators["subtract-dayTimeDurations"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_fromSeconds(fXSDayTimeDuration_toSeconds(oLeft) - fXSDayTimeDuration_toSeconds(oRight));
};

// op:multiply-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:double) as xs:dayTimeDuration
cFunctionCall.operators["multiply-dayTimeDuration"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_fromSeconds(fXSDayTimeDuration_toSeconds(oLeft) * oRight);
};

// op:divide-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:double) as xs:dayTimeDuration
cFunctionCall.operators["divide-dayTimeDuration"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_fromSeconds(fXSDayTimeDuration_toSeconds(oLeft) / oRight);
};

// op:divide-dayTimeDuration-by-dayTimeDuration($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:decimal
cFunctionCall.operators["divide-dayTimeDuration-by-dayTimeDuration"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_toSeconds(oLeft) / fXSDayTimeDuration_toSeconds(oRight);
};

// 10.8 Arithmetic Operators on Durations, Dates and Times
// op:subtract-dateTimes($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:dayTimeDuration
cFunctionCall.operators["subtract-dateTimes"]	= function(oLeft, oRight) {
	var oZLeft	= oLeft.toZ(),
		oZRight	= oRight.toZ();
	throw "Not implemented";
};

// op:subtract-dates($arg1 as xs:date, $arg2 as xs:date) as xs:dayTimeDuration
cFunctionCall.operators["subtract-dates"]	= function(oLeft, oRight) {
	var oZLeft	= oLeft.toZ(),
		oZRight	= oRight.toZ();
	throw "Not implemented";
};

// op:subtract-times($arg1 as xs:time, $arg2 as xs:time) as xs:dayTimeDuration
cFunctionCall.operators["subtract-times"]	= function(oLeft, oRight) {
	return fXSDayTimeDuration_fromSeconds(fXSTime_toSeconds(oLeft) - fXSTime_toSeconds(oRight));
};

// op:add-yearMonthDuration-to-dateTime($arg1 as xs:dateTime, $arg2 as xs:yearMonthDuration) as xs:dateTime
cFunctionCall.operators["add-yearMonthDuration-to-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDurationToDateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-dateTime($arg1 as xs:dateTime, $arg2 as xs:dayTimeDuration) as xs:dateTime
cFunctionCall.operators["add-dayTimeDuration-to-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDurationToDateTime(oLeft, oRight, '+');
};

// op:subtract-yearMonthDuration-from-dateTime($arg1 as xs:dateTime, $arg2 as xs:yearMonthDuration) as xs:dateTime
cFunctionCall.operators["subtract-yearMonthDuration-from-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDurationToDateTime(oLeft, oRight, '-');
};

// op:subtract-dayTimeDuration-from-dateTime($arg1 as xs:dateTime, $arg2 as xs:dayTimeDuration) as xs:dateTime
cFunctionCall.operators["subtract-dayTimeDuration-from-dateTime"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDurationToDateTime(oLeft, oRight, '-');
};

// op:add-yearMonthDuration-to-date($arg1 as xs:date, $arg2 as xs:yearMonthDuration) as xs:date
cFunctionCall.operators["add-yearMonthDuration-to-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDurationToDateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-date($arg1 as xs:date, $arg2 as xs:dayTimeDuration) as xs:date
cFunctionCall.operators["add-dayTimeDuration-to-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDurationToDateTime(oLeft, oRight, '+');
};

// op:subtract-yearMonthDuration-from-date($arg1 as xs:date, $arg2  as xs:yearMonthDuration) as xs:date
cFunctionCall.operators["subtract-yearMonthDuration-from-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addYearMonthDurationToDateTime(oLeft, oRight, '-');
};

// op:subtract-dayTimeDuration-from-date($arg1 as xs:date, $arg2  as xs:dayTimeDuration) as xs:date
cFunctionCall.operators["subtract-dayTimeDuration-from-date"]	= function(oLeft, oRight) {
	return fFunctionCall_operators_addDayTimeDurationToDateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-time($arg1 as xs:time, $arg2  as xs:dayTimeDuration) as xs:time
cFunctionCall.operators["add-dayTimeDuration-to-time"]	= function(oLeft, oRight) {
	return fXSTime_fromSeconds(fXSTime_toSeconds(oLeft) + fXSDayTimeDuration_toSeconds(oRight));
};

// op:subtract-dayTimeDuration-from-time($arg1 as xs:time, $arg2  as xs:dayTimeDuration) as xs:time
cFunctionCall.operators["subtract-dayTimeDuration-from-time"]	= function(oLeft, oRight) {
	return fXSTime_fromSeconds(fXSTime_toSeconds(oLeft) - fXSDayTimeDuration_toSeconds(oRight));
};

function fFunctionCall_operators_compareDateTime(oLeft, oRight, sComparator) {
	// Adjust object time zone to Z and compare as strings
	var oTimezone	= new cXSDayTimeDuration(0, 0, 0, 0),
		sLeft	= fXSDateTime_setTimezone(oLeft, oTimezone).toString(),
		sRight	= fXSDateTime_setTimezone(oRight, oTimezone).toString();
	return sComparator == 'lt' ? sLeft < sRight : sComparator == 'gt' ? sLeft > sRight : sLeft == sRight;
};

function fFunctionCall_operators_addYearMonthDurationToDateTime(oLeft, oRight, sOperator) {
	var oValue;
	if (oLeft instanceof cXSDate) {
		oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
		oValue.year		= oValue.year + oRight.year * (sOperator == '-' ?-1 : 1);
		oValue.month	= oValue.month + oRight.month * (sOperator == '-' ?-1 : 1);
		fXSDate_normalize(oValue);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
		oValue.year		= oValue.year + oRight.year * (sOperator == '-' ?-1 : 1);
		oValue.month	= oValue.month + oRight.month * (sOperator == '-' ?-1 : 1);
		fXSDateTime_normalize(oValue);
	}
	return oValue;
};

function fFunctionCall_operators_addDayTimeDurationToDateTime(oLeft, oRight, sOperator) {
	var oValue;
	if (oLeft instanceof cXSDate) {
		oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
		oValue.day	= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1);
		fXSDate_normalize(oValue);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
		oValue.seconds	= oValue.seconds + oRight.seconds * (sOperator == '-' ?-1 : 1);
		oValue.minutes	= oValue.minutes + oRight.minutes * (sOperator == '-' ?-1 : 1);
		oValue.hours	= oValue.hours + oRight.hours * (sOperator == '-' ?-1 : 1);
		oValue.day		= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1);
		fXSDateTime_normalize(oValue);
	}
	return oValue;
};