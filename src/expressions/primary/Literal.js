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
cLiteral.parse	= function (oLexer, oResolver) {
	return cNumericLiteral.parse(oLexer, oResolver)
			|| cStringLiteral.parse(oLexer, oResolver);
};

// Public members
cLiteral.prototype.evaluate	= function (oContext) {
	return new cXPathSequence(this.value);
};