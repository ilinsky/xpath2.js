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

	10.5 Component Extraction Functions on Durations, Dates and Times
		years-from-duration
		months-from-duration
		days-from-duration
		hours-from-duration
		minutes-from-duration
		seconds-from-duration
		year-from-dateTime
		month-from-dateTime
		day-from-dateTime
		hours-from-dateTime
		minutes-from-dateTime
		seconds-from-dateTime
		timezone-from-dateTime
		year-from-date
		month-from-date
		day-from-date
		timezone-from-date
		hours-from-time
		minutes-from-time
		seconds-from-time
		timezone-from-time

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

	10.7 Timezone Adjustment Functions on Dates and Time Values
		adjust-dateTime-to-timezone
		adjust-date-to-timezone
		adjust-time-to-timezone

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

// Library
function fFunctionCall_date_pad(vValue) {
	var sValue	= cString(vValue);
	return new cArray(1 - sValue.length +(arguments[1] || 2)).join('0') + sValue;
};

function fFunctionCall_date_getTZComponent(oDate) {
	var nOffset		= oDate.getTimezoneOffset();
	return (nOffset > 0 ? '+' : '-') + fFunctionCall_date_pad(cMath.abs(~~(nOffset / 60))) + ':' + fFunctionCall_date_pad(cMath.abs(nOffset % 60));
};

function fFunctionCall_date_getTimeComponent(oDate) {
	return fFunctionCall_date_pad(oDate.getHours()) + ':' + fFunctionCall_date_pad(oDate.getMinutes()) + ':' + fFunctionCall_date_pad(oDate.getSeconds()) +
		'.' + fFunctionCall_date_pad(oDate.getMilliseconds(), 3);
};

function fFunctionCall_date_getDateComponent(oDate) {
	return fFunctionCall_date_pad(oDate.getFullYear(), 4) + '-' + fFunctionCall_date_pad(oDate.getMonth() + 1) + '-' + fFunctionCall_date_pad(oDate.getDate());
};

// nValue is in seconds
function fFunctionCall_number_toDuration(nValue) {
	if (nValue == 0)
		return 'PT0S';
	var nValueAbsolute	= cMath.abs(nValue),
		/*nYear	= ~~(nValueAbsolute / (60 * 60 * 24 * 30.4375 * 12)),
		nMonth	= ~~(nValueAbsolute / (60 * 60 * 24 * 30.4375)) % 12,*/
		nDay 	= ~~(nValueAbsolute / (60 * 60 * 24))/* % 30.4375*/,
		nHour	= ~~(nValueAbsolute / (60 * 60)) % 24,
		nMinute	= ~~(nValueAbsolute / (60)) % 60,
		nSecond	= nValueAbsolute % 60;
	return (nValue < 0 ? '-' : '') + 'P' +
				/*(nYear ? nYear + 'Y' : '') + (nMonth ? nMonth + 'M' : '') + */(nDay ? nDay + 'D' : '') +
				(nHour || nMinute || nSecond
					? 'T' + (nHour ? nHour + 'H' : '') + (nMinute ? nMinute + 'M' : '') + (nSecond ? nSecond + 'S' : '')
					: '');
};

var rFunctionCall_string_date	= /^-?([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|[+\-](0\d|1[0-4]):[0-5]\d)?$/;
function fFunctionCall_string_parseDate(sValue) {
	var aValue	= sValue.match(rFunctionCall_string_date);
};

var rFunctionCall_string_time	= /^(([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?|24:00:00(\.0+)?)(Z|[+\-](0\d|1[0-4]):[0-5]\d)?$/;
function fFunctionCall_string_parseTime(sValue) {
	var aValue	= sValue.match(rFunctionCall_string_time);
};

var rFunctionCall_string_dateTime	= /^-?([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?|24:00:00(\.0+)?)(Z|[+\-](0\d|1[0-4]):[0-5]\d)?$/;
function fFunctionCall_string_parseDateTime(sValue) {
	var aValue	= sValue.match(rFunctionCall_string_dateTime);
};

var rFunctionCall_string_duration	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;
function fFunctionCall_string_parseDuration(sValue) {
	var aValue	= sValue.match(rFunctionCall_string_duration);
};