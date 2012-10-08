/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cLiteral() {

};

// Static members
cLiteral.parse	= function (oLexer) {
	try {
		return cNumericLiteral.parse(oLexer);
	}
	catch (e) {
		return cStringLiteral.parse(oLexer);
	}
};

// Public members
cLiteral.prototype.evaluate	= function (oContext) {
	return new cXPathSequence(this.value);
};