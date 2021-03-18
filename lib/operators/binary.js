var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	12.1 Comparisons of base64Binary and hexBinary Values
		op:hexBinary-equal
		op:base64Binary-equal
*/

var exports = {};

exports.hexBinaryEqual = function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

exports.base64BinaryEqual = function(oLeft, oRight) {
	return new cXSBoolean(oLeft.valueOf() == oRight.valueOf());
};

module.exports = exports;