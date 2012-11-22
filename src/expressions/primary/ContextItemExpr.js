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
fContextItemExpr_parse	= function (oLexer, oStaticContext) {
	if (oLexer.peek() == '.') {
		oLexer.next();
		return new cContextItemExpr;
	}
};

// Public members
cContextItemExpr.prototype.evaluate	= function (oContext) {
	return oContext.item == null ? new cSequence : new cSequence(oContext.item);
};