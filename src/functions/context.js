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
fXPath2StaticContext_defineSystemFunction("position",	[],	function() {
	return this.position;
});

// fn:last() as xs:integer
fXPath2StaticContext_defineSystemFunction("last",	[],	function() {
	return this.size;
});

// fn:current-dateTime() as xs:dateTime (2004-05-12T18:17:15.125Z)
fXPath2StaticContext_defineSystemFunction("current-dateTime",	[],	 function() {
	return this.dateTime;
});

// fn:current-date() as xs:date (2004-05-12+01:00)
fXPath2StaticContext_defineSystemFunction("current-date",	[],	function() {
	return cXSDate.cast(this.dateTime);
});

// fn:current-time() as xs:time (23:17:00.000-05:00)
fXPath2StaticContext_defineSystemFunction("current-time",	[],	function() {
	return cXSTime.cast(this.dateTime);
});

// fn:implicit-timezone() as xs:dayTimeDuration
fXPath2StaticContext_defineSystemFunction("implicit-timezone",	[],	function() {
	return this.timezone;
});

// fn:default-collation() as xs:string
fXPath2StaticContext_defineSystemFunction("default-collation",	[],	 function() {
	return this.staticContext.defaultCollationName;
});

// fn:static-base-uri() as xs:anyURI?
fXPath2StaticContext_defineSystemFunction("static-base-uri",	[],	function() {
	return this.staticContext.baseURI;
});