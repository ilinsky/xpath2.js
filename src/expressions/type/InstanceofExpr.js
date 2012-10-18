/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cInstanceofExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cInstanceofExpr.prototype.expression	= null;
cInstanceofExpr.prototype.type			= null;

cInstanceofExpr.parse	= function(oLexer, oResolver) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cTreatExpr.parse(oLexer, oResolver)))
		return;

	if (!(oLexer.peek() == "instance" && oLexer.peek(1) == "of"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSequenceType.parse(oLexer, oResolver)))
		throw "TreatExpr.parse: Expected expression operand";

	return new cInstanceofExpr(oExpr, oType);
};