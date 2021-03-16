/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSDate = require('./../types/schema/simple/atomic/XSDate');
var cXSTime = require('./../types/schema/simple/atomic/XSTime');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');
var cXSAnyURI = require('./../types/schema/simple/atomic/XSAnyURI');
var cXSString = require('./../types/schema/simple/atomic/XSString');

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
function fPosition() {
	return new cXSInteger(this.position);
};

// fn:last() as xs:integer
function fLast() {
	return new cXSInteger(this.size);
};

// fn:current-dateTime() as xs:dateTime (2004-05-12T18:17:15.125Z)
function fCurrentDateTime() {
	return this.dateTime;
};

// fn:current-date() as xs:date (2004-05-12+01:00)
function fCurrentDate() {
	return cXSDate.cast(this.dateTime);
};

// fn:current-time() as xs:time (23:17:00.000-05:00)
function fCurrentTime() {
	return cXSTime.cast(this.dateTime);
};

// fn:implicit-timezone() as xs:dayTimeDuration
function fImplicitTimezone() {
	return this.timezone;
};

// fn:default-collation() as xs:string
function fDefaultCollation() {
	return new cXSString(this.staticContext.defaultCollationName);
};

// fn:static-base-uri() as xs:anyURI?
function fStaticBaseUri() {
	return cXSAnyURI.cast(new cXSString(this.staticContext.baseURI || ''));
};

module.exports = {
    fPosition: fPosition,
    fLast: fLast,
    fCurrentDateTime: fCurrentDateTime,
    fCurrentDate: fCurrentDate,
    fCurrentTime: fCurrentTime,
    fImplicitTimezone: fImplicitTimezone,
    fDefaultCollation: fDefaultCollation,
    fStaticBaseUri: fStaticBaseUri
};