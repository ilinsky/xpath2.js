var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSNOTATION = require('./../types/schema/simple/atomic/XSNOTATION');

/*
	13.1 Operators on NOTATION
		op:NOTATION-equal
*/

var exports = {};

// op:NOTATION-equal($arg1 as xs:NOTATION, $arg2 as xs:NOTATION) as xs:boolean
exports.notationEqual = function(oLeft, oRight) {
	throw "Operator '" + "NOTATION-equal" + "' not implemented";
};

module.exports = exports;