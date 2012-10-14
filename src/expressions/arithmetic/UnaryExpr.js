/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cUnaryExpr(sOperator, oExpr) {
	this.operator	= sOperator;
	this.expression	= oExpr;
};

cUnaryExpr.prototype.operator	= null;
cUnaryExpr.prototype.expression	= null;

//
//cUnaryExpr.operators	= {};
//cUnaryExpr.operators['-']	= {};
//cUnaryExpr.operators['+']	= {};

// Static members
// UnaryExpr	:= ("-" | "+")* ValueExpr
cUnaryExpr.parse	= function (oLexer, oResolver) {
	if (oLexer.eof())
		return;
	if (!(oLexer.peek() == '-' || oLexer.peek() == '+'))
		return cValueExpr.parse(oLexer, oResolver);

	// Unary expression
	var sOperator	= oLexer.peek(),
		oExpr;
	oLexer.next();
	if (oLexer.eof() ||!(oExpr = cValueExpr.parse(oLexer, oResolver)))
		throw "UnaryExpr.parse: Expected ValueExpr expression";
	return new cUnaryExpr(sOperator, oExpr);
};

cUnaryExpr.prototype.evaluate	= function (oContext) {
	return new cXPathSequence((this.operator == '-' ? -1 : 1) * this.expression.evaluate(oContext).toNumber());
};