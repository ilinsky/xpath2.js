var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	9.2 Operators on Boolean Values
		op:boolean-equal
		op:boolean-less-than
		op:boolean-greater-than
*/

// 9.2 Operators on Boolean Values
// op:boolean-equal($value1 as xs:boolean, $value2 as xs:boolean) as xs:boolean
function fBooleanEqual(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

// op:boolean-less-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
function fBooleanLessThan(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() < oRight.valueOf());
};

// op:boolean-greater-than($arg1 as xs:boolean, $arg2 as xs:boolean) as xs:boolean
function fBooleanGreaterThan(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() > oRight.valueOf());
};

module.exports = {
    fBooleanEqual: fBooleanEqual,
    fBooleanLessThan: fBooleanLessThan,
    fBooleanGreaterThan: fBooleanGreaterThan
};