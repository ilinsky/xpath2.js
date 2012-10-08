/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cContextItemExpr() {

};

// Static members
cContextItemExpr.parse	= function (oLexer) {
	if (oLexer.peek() == '.') {
		oLexer.next();
		return new cContextItemExpr;
	}
	else {
		throw "Not ContextItemExpr";
	}
};

// Public members
cContextItemExpr.prototype.evaluate	= function (oContext) {
	return new cXPathSequence(oContext.sequence.items[oContext.position - 1]);
};