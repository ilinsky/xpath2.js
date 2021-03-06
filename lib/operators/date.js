var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSDecimal = require('./../types/schema/simple/atomic/XSDecimal');
var cXSDateTime = require('./../types/schema/simple/atomic/XSDateTime');
var cXSDate = require('./../types/schema/simple/atomic/XSDate');
var cXSTime = require('./../types/schema/simple/atomic/XSTime');
var cXSDayTimeDuration = require('./../types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSYearMonthDuration = require('./../types/schema/simple/atomic/duration/XSYearMonthDuration');

var cDate = global.Date;
var cMath = global.Math;

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

var exports = {};

// 10.4 Comparison Operators on Duration, Date and Time Values
// op:yearMonthDuration-less-than($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:boolean
exports.yearMonthDurationLessThan = function(oLeft, oRight) {
	return new cXSBoolean(fOperator_yearMonthDuration_toMonths(oLeft) < fOperator_yearMonthDuration_toMonths(oRight));
};

// op:yearMonthDuration-greater-than($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:boolean
exports.yearMonthDurationGreaterThan = function(oLeft, oRight) {
	return new cXSBoolean(fOperator_yearMonthDuration_toMonths(oLeft) > fOperator_yearMonthDuration_toMonths(oRight));
};

// op:dayTimeDuration-less-than($arg1 as dayTimeDuration, $arg2 as dayTimeDuration) as xs:boolean
exports.dayTimeDurationLessThan = function(oLeft, oRight) {
	return new cXSBoolean(cXSDayTimeDuration.toSeconds(oLeft) < cXSDayTimeDuration.toSeconds(oRight));
};

// op:dayTimeDuration-greater-than($arg1 as dayTimeDuration, $arg2 as dayTimeDuration) as xs:boolean
exports.dayTimeDurationGreaterThan = function(oLeft, oRight) {
	return new cXSBoolean(cXSDayTimeDuration.toSeconds(oLeft) > cXSDayTimeDuration.toSeconds(oRight));
};

// op:duration-equal($arg1 as xs:duration, $arg2 as xs:duration) as xs:boolean
exports.durationEqual = function(oLeft, oRight) {
	return new cXSBoolean(oLeft.negative == oRight.negative
			&& fOperator_yearMonthDuration_toMonths(oLeft) == fOperator_yearMonthDuration_toMonths(oRight)
			&& cXSDayTimeDuration.toSeconds(oLeft) == cXSDayTimeDuration.toSeconds(oRight));
};

// op:dateTime-equal($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
exports.dateTimeEqual = function(oLeft, oRight) {
	return fOperator_compareDateTimes(oLeft, oRight, 'eq');
};

// op:dateTime-less-than($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
exports.dateTimeLessThan = function(oLeft, oRight) {
	return fOperator_compareDateTimes(oLeft, oRight, 'lt');
};

// op:dateTime-greater-than($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:boolean
exports.dateTimeGreaterThan = function(oLeft, oRight) {
	return fOperator_compareDateTimes(oLeft, oRight, 'gt');
};

// op:date-equal($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
exports.dateEqual = function(oLeft, oRight) {
	return fOperator_compareDates(oLeft, oRight, 'eq');
};

// op:date-less-than($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
exports.dateLessThan = function(oLeft, oRight) {
	return fOperator_compareDates(oLeft, oRight, 'lt');
};

// op:date-greater-than($arg1 as xs:date, $arg2 as xs:date) as xs:boolean
exports.dateGreaterThan = function(oLeft, oRight) {
	return fOperator_compareDates(oLeft, oRight, 'gt');
};

// op:time-equal($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
exports.timeEqual = function(oLeft, oRight) {
	return fOperator_compareTimes(oLeft, oRight, 'eq');
};

// op:time-less-than($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
exports.timeLessThan = function(oLeft, oRight) {
	return fOperator_compareTimes(oLeft, oRight, 'lt');
};

// op:time-greater-than($arg1 as xs:time, $arg2 as xs:time) as xs:boolean
exports.timeGreaterThan = function(oLeft, oRight) {
	return fOperator_compareTimes(oLeft, oRight, 'gt');
};

// op:gYearMonth-equal($arg1 as xs:gYearMonth, $arg2 as xs:gYearMonth) as xs:boolean
exports.GYearMonthEqual = function(oLeft, oRight) {
	return fOperator_compareDateTimes(
			new cXSDateTime(oLeft.year, oLeft.month, cXSDateTime.getDaysForYearMonth(oLeft.year, oLeft.month), 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
			new cXSDateTime(oRight.year, oRight.month, cXSDateTime.getDaysForYearMonth(oRight.year, oRight.month), 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
			'eq'
	);
};

// op:gYear-equal($arg1 as xs:gYear, $arg2 as xs:gYear) as xs:boolean
exports.GYearEqual = function(oLeft, oRight) {
	return fOperator_compareDateTimes(
			new cXSDateTime(oLeft.year, 1, 1, 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
			new cXSDateTime(oRight.year, 1, 1, 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
			'eq'
	);
};

// op:gMonthDay-equal($arg1 as xs:gMonthDay, $arg2 as xs:gMonthDay) as xs:boolean
exports.GMonthDayEqual = function(oLeft, oRight) {
	return fOperator_compareDateTimes(
			new cXSDateTime(1972, oLeft.month, oLeft.day, 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
			new cXSDateTime(1972, oRight.month, oRight.day, 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
			'eq'
	);
};

// op:gMonth-equal($arg1 as xs:gMonth, $arg2 as xs:gMonth) as xs:boolean
exports.GMonthEqual = function(oLeft, oRight) {
	return fOperator_compareDateTimes(
			new cXSDateTime(1972, oLeft.month, cXSDateTime.getDaysForYearMonth(1972, oRight.month), 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
			new cXSDateTime(1972, oRight.month, cXSDateTime.getDaysForYearMonth(1972, oRight.month), 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
			'eq'
	);
};

// op:gDay-equal($arg1 as xs:gDay, $arg2 as xs:gDay) as xs:boolean
exports.GDayEqual = function(oLeft, oRight) {
	return fOperator_compareDateTimes(
			new cXSDateTime(1972, 12, oLeft.day, 0, 0, 0, oLeft.timezone == null ? this.timezone : oLeft.timezone),
			new cXSDateTime(1972, 12, oRight.day, 0, 0, 0, oRight.timezone == null ? this.timezone : oRight.timezone),
			'eq'
	);
};

// 10.6 Arithmetic Operators on Durations
// op:add-yearMonthDurations($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:yearMonthDuration
exports.addYearMonthDurations = function(oLeft, oRight) {
	return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) + fOperator_yearMonthDuration_toMonths(oRight));
};

// op:subtract-yearMonthDurations($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:yearMonthDuration
exports.subtractYearMonthDurations = function(oLeft, oRight) {
	return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) - fOperator_yearMonthDuration_toMonths(oRight));
};

// op:multiply-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:double) as xs:yearMonthDuration
exports.multiplyYearMonthDuration = function(oLeft, oRight) {
	return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) * oRight);
};

// op:divide-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:double) as xs:yearMonthDuration
exports.divideYearMonthDuration = function(oLeft, oRight) {
	return fOperator_yearMonthDuration_fromMonths(fOperator_yearMonthDuration_toMonths(oLeft) / oRight);
};

// op:divide-yearMonthDuration-by-yearMonthDuration($arg1 as xs:yearMonthDuration, $arg2 as xs:yearMonthDuration) as xs:decimal
exports.divideYearMonthDurationByYearMonthDuration = function(oLeft, oRight) {
	return new cXSDecimal(fOperator_yearMonthDuration_toMonths(oLeft) / fOperator_yearMonthDuration_toMonths(oRight));
};

// op:add-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:dayTimeDuration
exports.addDayTimeDurations = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(cXSDayTimeDuration.toSeconds(oLeft) + cXSDayTimeDuration.toSeconds(oRight));
};

// op:subtract-dayTimeDurations($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:dayTimeDuration
exports.subtractDayTimeDurations = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(cXSDayTimeDuration.toSeconds(oLeft) - cXSDayTimeDuration.toSeconds(oRight));
};

// op:multiply-dayTimeDuration($arg1 as xs:dayTimeDuration, $arg2 as xs:double) as xs:dayTimeDuration
exports.multiplyDayTimeDuration = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(cXSDayTimeDuration.toSeconds(oLeft) * oRight);
};

// op:divide-dayTimeDuration($arg1 as xs:dayTimeDuration, $arg2 as xs:double) as xs:dayTimeDuration
exports.divideDayTimeDuration = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(cXSDayTimeDuration.toSeconds(oLeft) / oRight);
};

// op:divide-dayTimeDuration-by-dayTimeDuration($arg1 as xs:dayTimeDuration, $arg2 as xs:dayTimeDuration) as xs:decimal
exports.divideDayTimeDurationByDayTimeDuration = function(oLeft, oRight) {
	return new cXSDecimal(cXSDayTimeDuration.toSeconds(oLeft) / cXSDayTimeDuration.toSeconds(oRight));
};

// 10.8 Arithmetic Operators on Durations, Dates and Times
// op:subtract-dateTimes($arg1 as xs:dateTime, $arg2 as xs:dateTime) as xs:dayTimeDuration
exports.subtractDateTimes = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(fOperator_dateTime_toSeconds(oLeft) - fOperator_dateTime_toSeconds(oRight));
};

// op:subtract-dates($arg1 as xs:date, $arg2 as xs:date) as xs:dayTimeDuration
exports.subtractDates = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(fOperator_dateTime_toSeconds(oLeft) - fOperator_dateTime_toSeconds(oRight));
};

// op:subtract-times($arg1 as xs:time, $arg2 as xs:time) as xs:dayTimeDuration
exports.subtractTimes = function(oLeft, oRight) {
	return cXSDayTimeDuration.fromSeconds(fOperator_time_toSeconds(oLeft) - fOperator_time_toSeconds(oRight));
};

// op:add-yearMonthDuration-to-dateTime($arg1 as xs:dateTime, $arg2 as xs:yearMonthDuration) as xs:dateTime
exports.addYearMonthDurationToDateTime = function(oLeft, oRight) {
	return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-dateTime($arg1 as xs:dateTime, $arg2 as xs:dayTimeDuration) as xs:dateTime
exports.addDayTimeDurationToDateTime = function(oLeft, oRight) {
	return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '+');
};

// op:subtract-yearMonthDuration-from-dateTime($arg1 as xs:dateTime, $arg2 as xs:yearMonthDuration) as xs:dateTime
exports.subtractYearMonthDurationToDateTime = function(oLeft, oRight) {
	return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '-');
};

// op:subtract-dayTimeDuration-from-dateTime($arg1 as xs:dateTime, $arg2 as xs:dayTimeDuration) as xs:dateTime
exports.subtractDayTimeDurationToDateTime = function(oLeft, oRight) {
	return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '-');
};

// op:add-yearMonthDuration-to-date($arg1 as xs:date, $arg2 as xs:yearMonthDuration) as xs:date
exports.addYearMonthDurationToDate = function(oLeft, oRight) {
	return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '+');
};

// op:add-dayTimeDuration-to-date($arg1 as xs:date, $arg2 as xs:dayTimeDuration) as xs:date
exports.addDayTimeDurationToDate = function(oLeft, oRight) {
	return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '+');
};

// op:subtract-yearMonthDuration-from-date($arg1 as xs:date, $arg2  as xs:yearMonthDuration) as xs:date
exports.subtractYearMonthDurationFromDate = function(oLeft, oRight) {
	return fOperator_addYearMonthDuration2DateTime(oLeft, oRight, '-');
};

// op:subtract-dayTimeDuration-from-date($arg1 as xs:date, $arg2  as xs:dayTimeDuration) as xs:date
exports.subtractDayTimeDurationFromDate = function(oLeft, oRight) {
	return fOperator_addDayTimeDuration2DateTime(oLeft, oRight, '-');
};

// op:add-dayTimeDuration-to-time($arg1 as xs:time, $arg2  as xs:dayTimeDuration) as xs:time
exports.addDayTimeDurationToTime = function(oLeft, oRight) {
	var oValue	= new cXSTime(oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone);
	oValue.hours	+= oRight.hours;
	oValue.minutes	+= oRight.minutes;
	oValue.seconds	+= oRight.seconds;
	//
	return cXSDateTime.normalizeTime(oValue);
};

// op:subtract-dayTimeDuration-from-time($arg1 as xs:time, $arg2  as xs:dayTimeDuration) as xs:time
exports.subtractDayTimeDurationFromTime = function(oLeft, oRight) {
	var oValue	= new cXSTime(oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone);
	oValue.hours	-= oRight.hours;
	oValue.minutes	-= oRight.minutes;
	oValue.seconds	-= oRight.seconds;
	//
	return cXSDateTime.normalizeTime(oValue);
};

// Utils
function fOperator_compareTimes(oLeft, oRight, sComparator) {
	var nLeft	= fOperator_time_toSeconds(oLeft),
		nRight	= fOperator_time_toSeconds(oRight);
	return new cXSBoolean(sComparator == 'lt' ? nLeft < nRight : sComparator == 'gt' ? nLeft > nRight : nLeft == nRight);
};

function fOperator_compareDates(oLeft, oRight, sComparator) {
	return fOperator_compareDateTimes(cXSDateTime.cast(oLeft), cXSDateTime.cast(oRight), sComparator);
};

function fOperator_compareDateTimes(oLeft, oRight, sComparator) {
	// Adjust object time zone to Z and compare as strings
	var oTimezone	= new cXSDayTimeDuration(0, 0, 0, 0),
		sLeft	= cXSDateTime.adjustTimezone(new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative), oTimezone).toString(),
		sRight	= cXSDateTime.adjustTimezone(new cXSDateTime(oRight.year, oRight.month, oRight.day, oRight.hours, oRight.minutes, oRight.seconds, oRight.timezone, oRight.negative), oTimezone).toString();
	return new cXSBoolean(sComparator == 'lt' ? sLeft < sRight : sComparator == 'gt' ? sLeft > sRight : sLeft == sRight);
};

function fOperator_addYearMonthDuration2DateTime(oLeft, oRight, sOperator) {
	var oValue;
	if (oLeft instanceof cXSDate)
		oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
	else
	if (oLeft instanceof cXSDateTime)
		oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
	//
	oValue.year		= oValue.year + oRight.year * (sOperator == '-' ?-1 : 1);
	oValue.month	= oValue.month + oRight.month * (sOperator == '-' ?-1 : 1);
	//
	cXSDateTime.normalizeDate(oValue, true);
	// Correct day if out of month range
	var nDay	= cXSDateTime.getDaysForYearMonth(oValue.year, oValue.month);
	if (oValue.day > nDay)
		oValue.day	= nDay;
	//
	return oValue;
};

function fOperator_addDayTimeDuration2DateTime(oLeft, oRight, sOperator) {
	var oValue;
	if (oLeft instanceof cXSDate) {
		var nValue	= (oRight.hours * 60 + oRight.minutes) * 60 + oRight.seconds;
		oValue	= new cXSDate(oLeft.year, oLeft.month, oLeft.day, oLeft.timezone, oLeft.negative);
		oValue.day	= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1) - 1 * (nValue && sOperator == '-');
		//
		cXSDateTime.normalizeDate(oValue);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		oValue	= new cXSDateTime(oLeft.year, oLeft.month, oLeft.day, oLeft.hours, oLeft.minutes, oLeft.seconds, oLeft.timezone, oLeft.negative);
		oValue.seconds	= oValue.seconds + oRight.seconds * (sOperator == '-' ?-1 : 1);
		oValue.minutes	= oValue.minutes + oRight.minutes * (sOperator == '-' ?-1 : 1);
		oValue.hours	= oValue.hours + oRight.hours * (sOperator == '-' ?-1 : 1);
		oValue.day		= oValue.day + oRight.day * (sOperator == '-' ?-1 : 1);
		//
		cXSDateTime.normalize(oValue);
	}
	return oValue;
};

// xs:yearMonthDuration to/from months
function fOperator_yearMonthDuration_toMonths(oDuration) {
	return (oDuration.year * 12 + oDuration.month) * (oDuration.negative ? -1 : 1);
};

function fOperator_yearMonthDuration_fromMonths(nValue) {
	var nNegative	=(nValue = cMath.round(nValue)) < 0,
		nYears	= ~~((nValue = cMath.abs(nValue)) / 12),
		nMonths		= nValue -= nYears * 12;
	return new cXSYearMonthDuration(nYears, nMonths, nNegative);
};

// xs:time to seconds
function fOperator_time_toSeconds(oTime) {
	return oTime.seconds + (oTime.minutes - (oTime.timezone != null ? oTime.timezone % 60 : 0) + (oTime.hours - (oTime.timezone != null ? ~~(oTime.timezone / 60) : 0)) * 60) * 60;
};

// This function unlike all other date-related functions rely on interpretor's dateTime handling
function fOperator_dateTime_toSeconds(oValue) {
	var oDate	= new cDate((oValue.negative ? -1 : 1) * oValue.year, oValue.month, oValue.day, 0, 0, 0, 0);
	if (oValue instanceof cXSDateTime) {
		oDate.setHours(oValue.hours);
		oDate.setMinutes(oValue.minutes);
		oDate.setSeconds(oValue.seconds);
	}
	if (oValue.timezone != null)
		oDate.setMinutes(oDate.getMinutes() - oValue.timezone);
	return oDate.getTime() / 1000;
};

module.exports = exports;