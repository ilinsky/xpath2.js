/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	16 Context Functions
		position
		last
		current-dateTime
		current-date
		current-time
		implicit-timezone
		default-collation
		static-base-uri

*/
// fn:position() as xs:integer
cFunctionCall.functions["position"]	= function() {
	return new cXPath2Sequence(this.position);
};

// fn:last() as xs:integer
cFunctionCall.functions["last"]	= function() {
	return new cXPath2Sequence(this.last);
};

// fn:current-dateTime() as xs:dateTime (2004-05-12T18:17:15.125Z)
cFunctionCall.functions["current-dateTime"]	= function() {
	var oDate	= new cDate;
	return fFunctionCall_date_getDateComponent(oDate)
			+ 'T' + fFunctionCall_date_getTimeComponent(oDate)
			+ fFunctionCall_date_getTZComponent(oDate);
};

// fn:current-date() as xs:date (2004-05-12+01:00)
cFunctionCall.functions["current-date"]	= function() {
	var oDate	= new cDate;
	return fFunctionCall_date_getDateComponent(oDate)
			+ fFunctionCall_date_getTZComponent(oDate);
};

// fn:current-time() as xs:time (23:17:00.000-05:00)
cFunctionCall.functions["current-time"]	= function() {
	var oDate	= new cDate;
	return fFunctionCall_date_getTimeComponent(oDate)
			+ fFunctionCall_date_getTZComponent(oDate);
};

// fn:implicit-timezone
cFunctionCall.functions["implicit-timezone"]	= function() {
	var oDate	= new cDate,
		nOffset	= -1 * oDate.getTimezoneOffset(),
		nHour	= cMath.abs(~~(nOffset / 60)),
		nMinute	= cMath.abs(nOffset % 60);
	return (nOffset < 0 ? '-' : '') + 'P' + 'T' + (nOffset == 0 ? '0S' : (nHour ? nHour + 'H' : '') + (nMinute ? nMinute + 'M' : ''));
};

// fn:default-collation() as xs:string
cFunctionCall.functions["default-collation"]	= function() {
	throw "Function '" + "default-collation" + "' not implemented";
};

// fn:static-base-uri() as xs:anyURI?
cFunctionCall.functions["static-base-uri"]	= function() {
	throw "Function '" + "static-base-uri" + "' not implemented";
};