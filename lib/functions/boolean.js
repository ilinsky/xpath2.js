var cSequence = require('./../classes/Sequence');

var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	9.1 Additional Boolean Constructor Functions
		true
		false

	9.3 Functions on Boolean Values
		not
*/

var exports = {};

// 9.1 Additional Boolean Constructor Functions
// fn:true() as xs:boolean
exports.true = function() {
	return new cXSBoolean(true);
};

// fn:false() as xs:boolean
exports.false = function() {
	return new cXSBoolean(false);
};

// 9.3 Functions on Boolean Values
// fn:not($arg as item()*) as xs:boolean
exports.not = function(oSequence) {
	return new cXSBoolean(!cSequence.toEBV(oSequence, this));
};

module.exports = exports;
