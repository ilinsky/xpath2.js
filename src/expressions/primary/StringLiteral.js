/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cLiteral = require('./Literal');

function cStringLiteral(oValue) {
	this.value	= oValue;
};

cStringLiteral.prototype	= new cLiteral;

//
module.exports = cStringLiteral;
