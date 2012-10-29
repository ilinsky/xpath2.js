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
cFunctionCall.functions["years-from-duration"]	= function(oSequence1) {
	throw "Function '" + "years-from-duration" + "' not implemented";
};

// fn:months-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["months-from-duration"]	= function(oSequence1) {
	throw "Function '" + "months-from-duration" + "' not implemented";
};

// fn:days-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["days-from-duration"]	= function(oSequence1) {
	throw "Function '" + "days-from-duration" + "' not implemented";
};

// fn:hours-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["hours-from-duration"]	= function(oSequence1) {
	throw "Function '" + "hours-from-duration" + "' not implemented";
};

// fn:minutes-from-duration($arg as xs:duration?) as xs:integer?
cFunctionCall.functions["minutes-from-duration"]	= function(oSequence1) {
	throw "Function '" + "minutes-from-duration" + "' not implemented";
};

// fn:seconds-from-duration($arg as xs:duration?) as xs:decimal?
cFunctionCall.functions["seconds-from-duration"]	= function(oSequence1) {
	throw "Function '" + "seconds-from-duration" + "' not implemented";
};

// functions on dateTime
// fn:year-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["year-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "year-from-dateTime" + "' not implemented";
};

// fn:month-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["month-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "month-from-dateTime" + "' not implemented";
};

// fn:day-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["day-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "day-from-dateTime" + "' not implemented";
};

// fn:hours-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["hours-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "hours-from-dateTime" + "' not implemented";
};

// fn:minutes-from-dateTime($arg as xs:dateTime?) as xs:integer?
cFunctionCall.functions["minutes-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "minutes-from-dateTime" + "' not implemented";
};

// fn:seconds-from-dateTime($arg as xs:dateTime?) as xs:decimal?
cFunctionCall.functions["seconds-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "seconds-from-dateTime" + "' not implemented";
};

// fn:timezone-from-dateTime($arg as xs:dateTime?) as xs:dayTimeDuration?
cFunctionCall.functions["timezone-from-dateTime"]	= function(oSequence1) {
	throw "Function '" + "timezone-from-dateTime" + "' not implemented";
};

// functions on date
// fn:year-from-date($arg as xs:date?) as xs:integer?
cFunctionCall.functions["year-from-date"]	= function(oSequence1) {
	throw "Function '" + "year-from-date" + "' not implemented";
};

// fn:month-from-date($arg as xs:date?) as xs:integer?
cFunctionCall.functions["month-from-date"]	= function(oSequence1) {
	throw "Function '" + "month-from-date" + "' not implemented";
};

// fn:day-from-date($arg as xs:date?) as xs:integer?
cFunctionCall.functions["day-from-date"]	= function(oSequence1) {
	throw "Function '" + "day-from-date" + "' not implemented";
};

// fn:timezone-from-date($arg as xs:date?) as xs:dayTimeDuration?
cFunctionCall.functions["timezone-from-date"]	= function(oSequence1) {
	throw "Function '" + "timezone-from-date" + "' not implemented";
};

// functions on time
// fn:hours-from-time($arg as xs:time?) as xs:integer?
cFunctionCall.functions["hours-from-time"]	= function(oSequence1) {
	throw "Function '" + "hours-from-time" + "' not implemented";
};

// fn:minutes-from-time($arg as xs:time?) as xs:integer?
cFunctionCall.functions["minutes-from-time"]	= function(oSequence1) {
	throw "Function '" + "minutes-from-time" + "' not implemented";
};

// fn:seconds-from-time($arg as xs:time?) as xs:decimal?
cFunctionCall.functions["seconds-from-time"]	= function(oSequence1) {
	throw "Function '" + "seconds-from-time" + "' not implemented";
};

// fn:timezone-from-time($arg as xs:time?) as xs:dayTimeDuration?
cFunctionCall.functions["timezone-from-time"]	= function(oSequence1) {
	throw "Function '" + "timezone-from-time" + "' not implemented";
};


// 10.7 Timezone Adjustment Functions on Dates and Time Values
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?) as xs:dateTime?
// fn:adjust-dateTime-to-timezone($arg as xs:dateTime?, $timezone as xs:dayTimeDuration?) as xs:dateTime?
cFunctionCall.functions["adjust-dateTime-to-timezone"]	= function(oSequence1) {
	throw "Function '" + "adjust-dateTime-to-timezone" + "' not implemented";
};

// fn:adjust-date-to-timezone($arg as xs:date?) as xs:date?
// fn:adjust-date-to-timezone($arg as xs:date?, $timezone as xs:dayTimeDuration?) as xs:date?
cFunctionCall.functions["adjust-date-to-timezone"]	= function(oSequence1) {
	throw "Function '" + "adjust-date-to-timezone" + "' not implemented";
};

// fn:adjust-time-to-timezone($arg as xs:time?) as xs:time?
// fn:adjust-time-to-timezone($arg as xs:time?, $timezone as xs:dayTimeDuration?) as xs:time?
cFunctionCall.functions["adjust-time-to-timezone"]	= function(oSequence1) {
	throw "Function '" + "adjust-time-to-timezone" + "' not implemented";
};