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

fCastableExpr_parse	= function(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fCastExpr_parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "castable" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fSingleType_parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in castable expression"
//<-Debug
		);

	return new cCastableExpr(oExpr, oType);
};

cCastableExpr.prototype.evaluate	= function(oContext) {
	throw "Expression 'castable as' not implemented";
};