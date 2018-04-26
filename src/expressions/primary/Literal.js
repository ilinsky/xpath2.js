/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cLiteral() {

};

cLiteral.prototype.value	= null;

// Public members
cLiteral.prototype.evaluate	= function (oContext) {
	return [this.value];
};

//
module.exports = cLiteral;
