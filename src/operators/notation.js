/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var fStaticContext_defineSystemOperator = require('./../classes/StaticContext').defineSystemOperator;
var hTypes = require('./../types');

var cXSBoolean = hTypes.XSBoolean;
var cXSNOTATION = hTypes.XSNOTATION;

/*
	13.1 Operators on NOTATION
		op:NOTATION-equal
*/

// op:NOTATION-equal($arg1 as xs:NOTATION, $arg2 as xs:NOTATION) as xs:boolean
fStaticContext_defineSystemOperator("NOTATION-equal", function(oLeft, oRight) {
	throw "Operator '" + "NOTATION-equal" + "' not implemented";
});
