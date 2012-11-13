/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Expression(sExpression, oStaticContext) {
	var oLexer	= new cXPath2Lexer(sExpression),
		oExpr	= cExpr.parse(oLexer, oStaticContext);
	//
	if (!oLexer.eof())
		throw "Expr.parse: Junk at the end of expression";
	//
	this.staticContext	= oStaticContext;
	this.internalExpression	= oExpr;
};

cXPath2Expression.prototype.staticContext	= null;
cXPath2Expression.prototype.internalExpression	= null;

cXPath2Expression.prototype.resolve	= function(vItem, oScope, oDOMAdapter) {
	return this.internalExpression.evaluate(new cXPath2DynamicContext(this.staticContext, vItem, oScope, oDOMAdapter)).items;
};
