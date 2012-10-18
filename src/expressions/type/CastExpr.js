/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cCastExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastExpr.prototype.expression	= null;
cCastExpr.prototype.type		= null;

cCastExpr.parse	= function(oLexer, oResolver) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cUnaryExpr.parse(oLexer, oResolver)))
		return;

	if (!(oLexer.peek() == "cast" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSingleType.parse(oLexer, oResolver)))
		throw "CastExpr.parse: Expected expression operand";

	return new cCastExpr(oExpr, oType);
};

cCastExpr.prototype.evaluate	= function(oContext) {
	throw "CastExpr.prototype.evaluate: Not implemented";
};