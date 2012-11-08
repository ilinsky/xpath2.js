/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	9.1 Additional Boolean Constructor Functions
		true
		false

	9.3 Functions on Boolean Values
		not
*/

// 9.1 Additional Boolean Constructor Functions
// fn:true() as xs:boolean
fFunctionCall_defineSystemFunction("true",	[],	function() {
	return true;
});

// fn:false() as xs:boolean
fFunctionCall_defineSystemFunction("false",	[],	function() {
	return false;
});

// 9.3 Functions on Boolean Values
// fn:not($arg as item()*) as xs:boolean
fFunctionCall_defineSystemFunction("not",	[[cXTItem, '*']],	function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");
	return !oSequence1.toBoolean();
});