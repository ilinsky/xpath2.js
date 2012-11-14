/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cParenthesizedExpr(oExpr) {
	this.expression	= oExpr;
};

// Static members
cParenthesizedExpr.parse	= function (oLexer, oStaticContext) {
	if (oLexer.peek() == '(') {
		oLexer.next();
		// Check if not empty (allowed)
		var oExpr	= null;
		if (oLexer.peek() != ')')
			oExpr	= cExpr.parse(oLexer, oStaticContext);

		//
		if (oLexer.peek() == ')')
			oLexer.next();
		else
			throw "ParenthesizedExpr.parse: Expected ')' token";

		//
		return new cParenthesizedExpr(oExpr);
	}
};

// Public members
cParenthesizedExpr.prototype.evaluate	= function (oContext) {
	return this.expression ? this.expression.evaluate(oContext) : new cXPath2Sequence;
};