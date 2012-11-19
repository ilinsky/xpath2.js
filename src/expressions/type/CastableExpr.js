/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cCastableExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastableExpr.prototype.expression	= null;
cCastableExpr.prototype.type		= null;

cCastableExpr.parse	= function(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cCastExpr.parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "castable" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSingleType.parse(oLexer, oStaticContext)))
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected right operand in castable expression"
//<-Debug
		);

	return new cCastableExpr(oExpr, oType);
};

cCastableExpr.prototype.evaluate	= function(oContext) {
	throw "Expression 'cast as' not implemented";
};