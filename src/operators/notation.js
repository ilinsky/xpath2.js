/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSNOTATION = require('./../types/schema/simple/atomic/XSNOTATION');

/*
	13.1 Operators on NOTATION
		op:NOTATION-equal
*/

// op:NOTATION-equal($arg1 as xs:NOTATION, $arg2 as xs:NOTATION) as xs:boolean
function fNotationEqual(oLeft, oRight) {
	throw "Operator '" + "NOTATION-equal" + "' not implemented";
};

module.exports = {
    fNotationEqual: fNotationEqual
};