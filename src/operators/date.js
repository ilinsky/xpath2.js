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
cFunctionCall.operators["duration-equal"]	= function(oLeft, oRight) {
	return oLeft.negative == oRight.negative
			&& (oLeft.year * 12 + oLeft.month)
				== (oRight.year * 12 + oRight.month)
			&& (((oLeft.day * 24 + oLeft.hour) * 60 + oLeft.minute) * 60 + oLeft.second)
				== (((oRight.day * 24 + oRight.hour) * 60 + oRight.minute) * 60 + oRight.second);
};

cFunctionCall.operators["dateTime-equal"]	= function(oLeft, oRight) {
	return cFunctionCall.operators["date-equal"](oLeft, oRight)
			&& cFunctionCall.operators["time-equal"](oLeft, oRight);
};

cFunctionCall.operators["date-equal"]	= function(oLeft, oRight) {
	return oLeft.timezone == oRight.timezone
			&& oLeft.year	== oRight.year
			&& oLeft.month	== oRight.month
			&& oLeft.day	== oRight.day;
};

cFunctionCall.operators["time-equal"]	= function(oLeft, oRight) {
	return ((oLeft.hour * 60 + oLeft.minute + oLeft.timezone) * 60 + oLeft.second + oLeft.millisecond / 1000)
			== ((oRight.hour * 60 + oRight.minute + oRight.timezone) * 60 + oRight.second + oRight.millisecond / 1000);
};