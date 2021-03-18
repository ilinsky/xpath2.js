var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	9.2 Operators on Boolean Values
		op:boolean-equal
		op:boolean-less-than
		op:boolean-greater-than
*/

var exports = {};

// 9.2 Operators on Boolean Values
// op:boolean-equal($value1 as xs:boolean, $value2 as xs:boolean) as xs:boolean
exports.booleanEqual = function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

// op:boolean-less-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
exports.booleanLessThan = function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
};

// op:boolean-greater-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
exports.booleanGreaterThan = function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
};

module.exports = exports;