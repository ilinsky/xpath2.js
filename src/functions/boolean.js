/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cSequence = require('./../classes/Sequence');

var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	9.1 Additional Boolean Constructor Functions
		true
		false

	9.3 Functions on Boolean Values
		not
*/

// 9.1 Additional Boolean Constructor Functions
// fn:true() as xs:boolean
function fTrue() {
	return new cXSBoolean(true);
};

// fn:false() as xs:boolean
function fFalse() {
	return new cXSBoolean(false);
};

// 9.3 Functions on Boolean Values
// fn:not($arg as item()*) as xs:boolean
function fNot(oSequence) {
	return new cXSBoolean(!cSequence.toEBV(oSequence, this));
};

module.exports = {
    fTrue: fTrue,
    fFalse: fFalse,
    fNot: fNot
};