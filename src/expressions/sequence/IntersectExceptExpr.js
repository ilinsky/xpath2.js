/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cIntersectExceptExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cIntersectExceptExpr.prototype.left		= null;
cIntersectExceptExpr.prototype.items	= null;

//
cIntersectExceptExpr.operators	={};

cIntersectExceptExpr.operators["intersect"]	= {};
cIntersectExceptExpr.operators["except"]	= {};

// Static members
// TODO: Should parse as IntersectExceptExpr->InstanceofExpr->TreatExpr->CastableExpr->CastExpr->UnaryExpr
cIntersectExceptExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cUnaryExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cIntersectExceptExpr.operators))
		return oExpr;

	// IntersectExcept expression
	var oIntersectExceptExpr	= new cIntersectExceptExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cIntersectExceptExpr.operators) {
		oLexer.next();
		oExpr	= cUnaryExpr.parse(oLexer, oResolver);
		if (!oExpr)
			throw "UnionExpr.parse: right operand missing";
		oIntersectExceptExpr.items.push([sOperator, oExpr]);
	}
	return oIntersectExceptExpr;
};

// Public members
cIntersectExceptExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.left.evaluate(oContext);
	for (var nIndex = 0, nLength = this.items.length, oItem; nIndex < nLength; nIndex++) {
		oItem	= this.items[nIndex];
		if (oItem[0] == "intersect")
			oSequence	= cXPathSequence.intersect(oSequence, oItem[1].evaluate(oContext));
		else
		if (oItem[0] == "except")
			oSequence	= cXPathSequence.except(oSequence, oItem[1].evaluate(oContext));
	}
	return oSequence;
};