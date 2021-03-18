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

var exports = {};

// fn:position() as xs:integer
exports.position = function() {
	return new cXSInteger(this.position);
};

// fn:last() as xs:integer
exports.last = function() {
	return new cXSInteger(this.size);
};

// fn:current-dateTime() as xs:dateTime (2004-05-12T18:17:15.125Z)
exports.currentDateTime = function() {
	return this.dateTime;
};

// fn:current-date() as xs:date (2004-05-12+01:00)
exports.currentDate = function() {
	return cXSDate.cast(this.dateTime);
};

// fn:current-time() as xs:time (23:17:00.000-05:00)
exports.currentTime = function() {
	return cXSTime.cast(this.dateTime);
};

// fn:implicit-timezone() as xs:dayTimeDuration
exports.implicitTimezone = function() {
	return this.timezone;
};

// fn:default-collation() as xs:string
exports.defaultCollation = function() {
	return new cXSString(this.staticContext.defaultCollationName);
};

// fn:static-base-uri() as xs:anyURI?
exports.staticBaseUri = function() {
	return cXSAnyURI.cast(new cXSString(this.staticContext.baseURI || ''));
};

module.exports = exports;