/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../classes/StaticContext');
var hTypes = require('./../types');

//
var fStaticContext_defineSystemFunction = cStaticContext.defineSystemFunction;
//
var cXSDuration = hTypes.XSDuration;
var cXSDayTimeDuration = hTypes.XSDayTimeDuration;
var cXSDateTime = hTypes.XSDateTime;
var cXSDate = hTypes.XSDate;
var cXSTime = hTypes.XSTime;
var cXSDecimal = hTypes.XSDecimal;
var cXSInteger = hTypes.XSInteger;

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

// 10.5 Component Extraction Functions on Durations, Dates and Times
// functions on duration
// fn:years-from-duration($arg as xs:duration?) as xs:integer?
fStaticContext_defineSystemFunction("years-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "year");
});

// fn:months-from-duration($arg as xs:duration?) as xs:integer?
fStaticContext_defineSystemFunction("months-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "month");
});

// fn:days-from-duration($arg as xs:duration?) as xs:integer?
fStaticContext_defineSystemFunction("days-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "day");
});

// fn:hours-from-duration($arg as xs:duration?) as xs:integer?
fStaticContext_defineSystemFunction("hours-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "hours");
});

// fn:minutes-from-duration($arg as xs:duration?) as xs:integer?
fStaticContext_defineSystemFunction("minutes-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "minutes");
});

// fn:seconds-from-duration($arg as xs:duration?) as xs:decimal?
fStaticContext_defineSystemFunction("seconds-from-duration",	[[cXSDuration, '?']],	function(oDuration) {
	return fFunction_duration_getComponent(oDuration, "seconds");
});

// functions on dateTime
// fn:year-from-dateTime($arg as xs:dateTime?) as xs:integer?
fStaticContext_defineSystemFunction("year-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime,	"year");
});

// fn:month-from-dateTime($arg as xs:dateTime?) as xs:integer?
fStaticContext_defineSystemFunction("month-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "month");
});

// fn:day-from-dateTime($arg as xs:dateTime?) as xs:integer?
fStaticContext_defineSystemFunction("day-from-dateTime",			[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "day");
});

// fn:hours-from-dateTime($arg as xs:dateTime?) as xs:integer?
fStaticContext_defineSystemFunction("hours-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "hours");
});

// fn:minutes-from-dateTime($arg as xs:dateTime?) as xs:integer?
fStaticContext_defineSystemFunction("minutes-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "minutes");
});

// fn:seconds-from-dateTime($arg as xs:dateTime?) as xs:decimal?
fStaticContext_defineSystemFunction("seconds-from-dateTime",		[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "seconds");
});

// fn:timezone-from-dateTime($arg as xs:dateTime?) as xs:dayTimeDuration?
fStaticContext_defineSystemFunction("timezone-from-dateTime",	[[cXSDateTime, '?']],	function(oDateTime) {
	return fFunction_dateTime_getComponent(oDateTime, "timezone");
});

// functions on date
// fn:year-from-date($arg as xs:date?) as xs:integer?
fStaticContext_defineSystemFunction("year-from-date",	[[cXSDate, '?']],	function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "year");
});

// fn:month-from-date($arg as xs:date?) as xs:integer?
fStaticContext_defineSystemFunction("month-from-date",	[[cXSDate, '?']],	function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "month");
});

// fn:day-from-date($arg as xs:date?) as xs:integer?
fStaticContext_defineSystemFunction("day-from-date",		[[cXSDate, '?']],	function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "day");
});

// fn:timezone-from-date($arg as xs:date?) as xs:dayTimeDuration?
fStaticContext_defineSystemFunction("timezone-from-date",	[[cXSDate, '?']],	function(oDate) {
	return fFunction_dateTime_getComponent(oDate, "timezone");
});

// functions on time
// fn:hours-from-time($arg as xs:time?) as xs:integer?
fStaticContext_defineSystemFunction("hours-from-time",		[[cXSTime, '?']],	function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "hours");
});

// fn:minutes-from-time($arg as xs:time?) as xs:integer?
fStaticContext_defineSystemFunction("minutes-from-time",		[[cXSTime, '?']],	function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "minutes");
});

// fn:seconds-from-time($arg as xs:time?) as xs:decimal?
fStaticContext_defineSystemFunction("seconds-from-time",		[[cXSTime, '?']],	function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "seconds");
});

// fn:timezone-from-time($arg as xs:time?) as xs:dayTimeDuration?
fStaticContext_defineSystemFunction("timezone-from-time",	[[cXSTime, '?']],	function(oTime) {
	return fFunction_dateTime_getComponent(oTime, "timezone");
});


// 10.7 Timezone Adjustment Functions on Dates and Time Values
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?) as xs:dateTime?
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?, $timezone as xs:dayTimeDuration?) as xs:dateTime?
fStaticContext_defineSystemFunction("adjust-dateTime-to-timezone",	[[cXSDateTime, '?'], [cXSDayTimeDuration, '?', true]],	function(oDateTime, oDayTimeDuration) {
	return fFunction_dateTime_adjustTimezone(oDateTime, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
});

// fn:adjust-date-to-timezone($arg as xs:date?) as xs:date?
// fn:adjust-date-to-timezone($arg as xs:date?, $timezone as xs:dayTimeDuration?) as xs:date?
fStaticContext_defineSystemFunction("adjust-date-to-timezone",		[[cXSDate, '?'], [cXSDayTimeDuration, '?', true]],	function(oDate, oDayTimeDuration) {
	return fFunction_dateTime_adjustTimezone(oDate, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
});

// fn:adjust-time-to-timezone($arg as xs:time?) as xs:time?
// fn:adjust-time-to-timezone($arg as xs:time?, $timezone as xs:dayTimeDuration?) as xs:time?
fStaticContext_defineSystemFunction("adjust-time-to-timezone",		[[cXSTime, '?'], [cXSDayTimeDuration, '?', true]],	function(oTime, oDayTimeDuration) {
	return fFunction_dateTime_adjustTimezone(oTime, arguments.length > 1 && oDayTimeDuration != null ? arguments.length > 1 ? oDayTimeDuration : this.timezone : null);
});

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

//
function fFunction_dateTime_adjustTimezone(oDateTime, oTimezone) {
	if (oDateTime == null)
		return null;

	// Create a copy
	var oValue;
	if (oDateTime instanceof cXSDate)
		oValue	= new cXSDate(oDateTime.year, oDateTime.month, oDateTime.day, oDateTime.timezone, oDateTime.negative);
	else
	if (oDateTime instanceof cXSTime)
		oValue	= new cXSTime(oDateTime.hours, oDateTime.minutes, oDateTime.seconds, oDateTime.timezone, oDateTime.negative);
	else
		oValue	= new cXSDateTime(oDateTime.year, oDateTime.month, oDateTime.day, oDateTime.hours, oDateTime.minutes, oDateTime.seconds, oDateTime.timezone, oDateTime.negative);

	//
	if (oTimezone == null)
		oValue.timezone	= null;
	else {
		var nTimezone	= fOperator_dayTimeDuration_toSeconds(oTimezone) / 60;
		if (oDateTime.timezone != null) {
			var nDiff	= nTimezone - oDateTime.timezone;
			if (oDateTime instanceof cXSDate) {
				if (nDiff < 0)
					oValue.day--;
			}
			else {
				oValue.minutes	+= nDiff % 60;
				oValue.hours	+= ~~(nDiff / 60);
			}
			//
			fXSDateTime_normalize(oValue);
		}
		oValue.timezone	= nTimezone;
	}
	return oValue;
};
