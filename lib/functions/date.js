var cXSDate = require('./../types/schema/simple/atomic/XSDate');
var cXSTime = require('./../types/schema/simple/atomic/XSTime');
var cXSDecimal = require('./../types/schema/simple/atomic/XSDecimal');
var cXSDateTime = require('./../types/schema/simple/atomic/XSDateTime');
var cXSDayTimeDuration = require('./../types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');

var cMath = global.Math;

/*
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

	10.7 Timezone Adjustment Functions on Dates and Time Values
		adjust-dateTime-to-timezone
		adjust-date-to-timezone
		adjust-time-to-timezone
*/

var exports = {};

// 10.5 Component Extraction Functions on Durations, Dates and Times
// functions on duration
// fn:years-from-duration($arg as xs:duration?) as xs:integer?
exports.yearsFromDuration = function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "year");
};

// fn:months-from-duration($arg as xs:duration?) as xs:integer?
exports.monthsFromDuration = function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "month");
};

// fn:days-from-duration($arg as xs:duration?) as xs:integer?
exports.daysFromDuration = function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "day");
};

// fn:hours-from-duration($arg as xs:duration?) as xs:integer?
exports.hoursFromDuration = function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "hours");
};

// fn:minutes-from-duration($arg as xs:duration?) as xs:integer?
exports.minutesFromDuration = function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "minutes");
};

// fn:seconds-from-duration($arg as xs:duration?) as xs:decimal?
exports.secondsFromDuration = function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "seconds");
};

// functions on dateTime
// fn:year-from-dateTime($arg as xs:dateTime?) as xs:integer?
exports.yearFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime,	"year");
};

// fn:month-from-dateTime($arg as xs:dateTime?) as xs:integer?
exports.monthFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "month");
};

// fn:day-from-dateTime($arg as xs:dateTime?) as xs:integer?
exports.dayFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "day");
};

// fn:hours-from-dateTime($arg as xs:dateTime?) as xs:integer?
exports.hoursFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "hours");
};

// fn:minutes-from-dateTime($arg as xs:dateTime?) as xs:integer?
exports.minutesFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "minutes");
};

// fn:seconds-from-dateTime($arg as xs:dateTime?) as xs:decimal?
exports.secondsFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "seconds");
};

// fn:timezone-from-dateTime($arg as xs:dateTime?) as xs:dayTimeDuration?
exports.timezoneFromDateTime = function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "timezone");
};

// functions on date
// fn:year-from-date($arg as xs:date?) as xs:integer?
exports.yearFromDate = function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "year");
};

// fn:month-from-date($arg as xs:date?) as xs:integer?
exports.monthFromDate = function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "month");
};

// fn:day-from-date($arg as xs:date?) as xs:integer?
exports.dayFromDate = function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "day");
};

// fn:timezone-from-date($arg as xs:date?) as xs:dayTimeDuration?
exports.timezoneFromDate = function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "timezone");
};

// functions on time
// fn:hours-from-time($arg as xs:time?) as xs:integer?
exports.hoursFromTime = function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "hours");
};

// fn:minutes-from-time($arg as xs:time?) as xs:integer?
exports.minutesFromTime = function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "minutes");
};

// fn:seconds-from-time($arg as xs:time?) as xs:decimal?
exports.secondsFromTime = function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "seconds");
};

// fn:timezone-from-time($arg as xs:time?) as xs:dayTimeDuration?
exports.timezoneFromTime = function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "timezone");
};


// 10.7 Timezone Adjustment Functions on Dates and Time Values
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?) as xs:dateTime?
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?, $timezone as xs:dayTimeDuration?) as xs:dateTime?
exports.adjustDateTimeToTimezone = function(oDateTime, oDayTimeDuration) {
	return cXSDateTime.adjustTimezone(oDateTime, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
};

// fn:adjust-date-to-timezone($arg as xs:date?) as xs:date?
// fn:adjust-date-to-timezone($arg as xs:date?, $timezone as xs:dayTimeDuration?) as xs:date?
exports.adjustDateToTimezone = function(oDate, oDayTimeDuration) {
	return cXSDateTime.adjustTimezone(oDate, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
};

// fn:adjust-time-to-timezone($arg as xs:time?) as xs:time?
// fn:adjust-time-to-timezone($arg as xs:time?, $timezone as xs:dayTimeDuration?) as xs:time?
exports.adjustTimeToTimezone = function(oTime, oDayTimeDuration) {
	return cXSDateTime.adjustTimezone(oTime, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
};

//
function fFunction_duration_getComponent(oDuration, sName) {
	if (oDuration == null)
		return null;

	var nValue	= oDuration[sName] * (oDuration.negative ?-1 : 1);
	return sName == "seconds" ? new cXSDecimal(nValue) : new cXSInteger(nValue);
};

//
function fFunction_dateTime_getComponent(oDateTime, sName) {
	if (oDateTime == null)
		return null;

	if (sName == "timezone") {
		var nTimezone	= oDateTime.timezone;
		if (nTimezone == null)
			return null;
		return new cXSDayTimeDuration(0, cMath.abs(~~(nTimezone / 60)), cMath.abs(nTimezone % 60), 0, nTimezone < 0);
	}
	else {
		var nValue	= oDateTime[sName];
		if (!(oDateTime instanceof cXSDate)) {
			if (sName == "hours")
				if (nValue == 24)
					nValue	= 0;
		}
		if (!(oDateTime instanceof cXSTime))
			nValue	*= oDateTime.negative ?-1 : 1;
		return sName == "seconds" ? new cXSDecimal(nValue) : new cXSInteger(nValue);
	}
};

module.exports = exports;