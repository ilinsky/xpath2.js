/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cTreatExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cTreatExpr.prototype.expression	= null;
cTreatExpr.prototype.type		= null;

cTreatExpr.parse	= function(oLexer, oResolver) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cCastableExpr.parse(oLexer, oResolver)))
		return;

	if (!(oLexer.peek() == "treat" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSequenceType.parse(oLexer, oResolver)))
		throw "TreatExpr.parse: Expected expression operand";

	return new cTreatExpr(oExpr, oType);
};

cInstanceofExpr.prototype.evaluate	= function(oContext) {
	throw "InstanceofExpr.prototype.evaluate: Not implemented";
};