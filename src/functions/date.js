/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

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
fFunctionCall_defineSystemFunction("years-from-duration",	[[cXSDuration, '?']],	function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, "year");
});

// fn:months-from-duration($arg as xs:duration?) as xs:integer?
fFunctionCall_defineSystemFunction("months-from-duration",	[[cXSDuration, '?']],	function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, "month");
});

// fn:days-from-duration($arg as xs:duration?) as xs:integer?
fFunctionCall_defineSystemFunction("days-from-duration",	[[cXSDuration, '?']],	function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, "day");
});

// fn:hours-from-duration($arg as xs:duration?) as xs:integer?
fFunctionCall_defineSystemFunction("hours-from-duration",	[[cXSDuration, '?']],	function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, "hours");
});

// fn:minutes-from-duration($arg as xs:duration?) as xs:integer?
fFunctionCall_defineSystemFunction("minutes-from-duration",	[[cXSDuration, '?']],	function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, "minutes");
});

// fn:seconds-from-duration($arg as xs:duration?) as xs:decimal?
fFunctionCall_defineSystemFunction("seconds-from-duration",	[[cXSDuration, '?']],	function(oSequence1) {
	return fFunctionCall_duration_getComponent(oSequence1, "seconds");
});

// functions on dateTime
// fn:year-from-dateTime($arg as xs:dateTime?) as xs:integer?
fFunctionCall_defineSystemFunction("year-from-dateTime",		[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1,	"year");
});

// fn:month-from-dateTime($arg as xs:dateTime?) as xs:integer?
fFunctionCall_defineSystemFunction("month-from-dateTime",		[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "month");
});

// fn:day-from-dateTime($arg as xs:dateTime?) as xs:integer?
fFunctionCall_defineSystemFunction("day-from-dateTime",			[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "day");
});

// fn:hours-from-dateTime($arg as xs:dateTime?) as xs:integer?
fFunctionCall_defineSystemFunction("hours-from-dateTime",		[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "hours");
});

// fn:minutes-from-dateTime($arg as xs:dateTime?) as xs:integer?
fFunctionCall_defineSystemFunction("minutes-from-dateTime",		[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "minutes");
});

// fn:seconds-from-dateTime($arg as xs:dateTime?) as xs:decimal?
fFunctionCall_defineSystemFunction("seconds-from-dateTime",		[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "seconds");
});

// fn:timezone-from-dateTime($arg as xs:dateTime?) as xs:dayTimeDuration?
fFunctionCall_defineSystemFunction("timezone-from-dateTime",	[[cXSDateTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "timezone");
});

// functions on date
// fn:year-from-date($arg as xs:date?) as xs:integer?
fFunctionCall_defineSystemFunction("year-from-date",	[[cXSDate, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "year");
});

// fn:month-from-date($arg as xs:date?) as xs:integer?
fFunctionCall_defineSystemFunction("month-from-date",	[[cXSDate, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "month");
});

// fn:day-from-date($arg as xs:date?) as xs:integer?
fFunctionCall_defineSystemFunction("day-from-date",		[[cXSDate, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "day");
});

// fn:timezone-from-date($arg as xs:date?) as xs:dayTimeDuration?
fFunctionCall_defineSystemFunction("timezone-from-date",	[[cXSDate, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "timezone");
});

// functions on time
// fn:hours-from-time($arg as xs:time?) as xs:integer?
fFunctionCall_defineSystemFunction("hours-from-time",		[[cXSTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "hours");
});

// fn:minutes-from-time($arg as xs:time?) as xs:integer?
fFunctionCall_defineSystemFunction("minutes-from-time",		[[cXSTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "minutes");
});

// fn:seconds-from-time($arg as xs:time?) as xs:decimal?
fFunctionCall_defineSystemFunction("seconds-from-time",		[[cXSTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "seconds");
});

// fn:timezone-from-time($arg as xs:time?) as xs:dayTimeDuration?
fFunctionCall_defineSystemFunction("timezone-from-time",	[[cXSTime, '?']],	function(oSequence1) {
	return fFunctionCall_dateTime_getComponent(oSequence1, "timezone");
});


// 10.7 Timezone Adjustment Functions on Dates and Time Values
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?) as xs:dateTime?
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?, $timezone as xs:dayTimeDuration?) as xs:dateTime?
fFunctionCall_defineSystemFunction("adjust-dateTime-to-timezone",	[[cXSDateTime, '?'], [cXSDayTimeDuration, '?', true]],	function(oSequence1, oSequence2) {
	if (oSequence1.isEmpty())
		return null;
	//
	return fFunctionCall_dateTime_adjustTimezone(oSequence1.items[0], arguments.length > 1 && oSequence2.isEmpty() ? null : arguments.length > 1 ? oSequence2.items[0] : this.timezone);
});

// fn:adjust-date-to-timezone($arg as xs:date?) as xs:date?
// fn:adjust-date-to-timezone($arg as xs:date?, $timezone as xs:dayTimeDuration?) as xs:date?
fFunctionCall_defineSystemFunction("adjust-date-to-timezone",		[[cXSDate, '?'], [cXSDayTimeDuration, '?', true]],	function(oSequence1, oSequence2) {
	if (oSequence1.isEmpty())
		return null;
	//
	return fFunctionCall_dateTime_adjustTimezone(oSequence1.items[0], arguments.length > 1 && oSequence2.isEmpty() ? null : arguments.length > 1 ? oSequence2.items[0] : this.timezone);
});

// fn:adjust-time-to-timezone($arg as xs:time?) as xs:time?
// fn:adjust-time-to-timezone($arg as xs:time?, $timezone as xs:dayTimeDuration?) as xs:time?
fFunctionCall_defineSystemFunction("adjust-time-to-timezone",		[[cXSTime, '?'], [cXSDayTimeDuration, '?', true]],	function(oSequence1, oSequence2) {
	if (oSequence1.isEmpty())
		return null;
	//
	return fFunctionCall_dateTime_adjustTimezone(oSequence1.items[0], arguments.length > 1 && oSequence2.isEmpty() ? null : arguments.length > 1 ? oSequence2.items[0] : this.timezone);
});

//
function fFunctionCall_duration_getComponent(oSequence1, sName) {
	if (oSequence1.isEmpty())
		return null;

	var oItem	= oSequence1.items[0];
	return oItem[sName] * (oItem.negative ?-1 : 1);
};

//
function fFunctionCall_dateTime_getComponent(oSequence1, sName) {
	if (oSequence1.isEmpty())
		return null;

	var oItem	= oSequence1.items[0],
		cType	= cXSAnyAtomicType.typeOf(oItem);
	if (sName == "timezone") {
		var nTimezone	= oItem.timezone;
		if (nTimezone === null)
			return null;
		return new cXSDayTimeDuration(0, cMath.abs(~~(nTimezone / 60)), cMath.abs(nTimezone % 60), 0, nTimezone < 0);
	}
	else {
		var nValue	= oItem[sName];
		if (cType != cXSDate) {
			if (sName == "hours")
				if (nValue == 24)
					nValue	= 0;
		}
		if (cType != cXSTime)
			nValue	*= oItem.negative ?-1 : 1;
		return nValue;
	}
};

//
function fFunctionCall_dateTime_adjustTimezone(oDateTime, oTimezone) {
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
		var nTimezone	= fXSDayTimeDuration_toSeconds(oTimezone) / 60;
		if (oDateTime.timezone !== null) {
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