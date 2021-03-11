/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

var fStaticContext_defineSystemOperator = require('./../classes/StaticContext').defineSystemOperator;

/*
	9.2 Operators on Boolean Values
		op:boolean-equal
		op:boolean-less-than
		op:boolean-greater-than
*/

// 9.2 Operators on Boolean Values
// op:boolean-equal($value1 as xs:boolean, $value2 as xs:boolean) as xs:boolean
fStaticContext_defineSystemOperator("boolean-equal", function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
});

// op:boolean-less-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
fStaticContext_defineSystemOperator("boolean-less-than", function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
});

// op:boolean-greater-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
fStaticContext_defineSystemOperator("boolean-greater-than", function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
});
