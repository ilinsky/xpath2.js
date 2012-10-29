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

	9.2 Operators on Boolean Values
		op:boolean-equal
		op:boolean-less-than
		op:boolean-greater-than

	9.3 Functions on Boolean Values
		not
*/

// 9.1 Additional Boolean Constructor Functions
// fn:true() as xs:boolean
cFunctionCall.functions["true"]		= function() {
	return new cXPath2Sequence(true);
};

// fn:false() as xs:boolean
cFunctionCall.functions["false"]	= function() {
	return new cXPath2Sequence(false);
};

// 9.2 Operators on Boolean Values
// op:boolean-equal($value1 as xs:boolean, $value2 as xs:boolean) as xs:boolean
cFunctionCall.operators["boolean-equal"]	= function(oLeft, oRight) {
	return oLeft == oRight;
};

// op:boolean-less-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
cFunctionCall.operators["boolean-less-than"]	= function(oLeft, oRight) {
	return oLeft < oRight;
};

// op:boolean-greater-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
cFunctionCall.operators["boolean-greater-than"]	= function(oLeft, oRight) {
	return oLeft > oRight;
};

// 9.3 Functions on Boolean Values
// fn:not($arg as item()*) as xs:boolean
cFunctionCall.functions["not"]	= function(oSequence) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");
	return new cXPath2Sequence(!oSequence.toBoolean());
};