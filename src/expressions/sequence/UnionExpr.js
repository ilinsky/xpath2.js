/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cUnionExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cUnionExpr.prototype.left	= null;
cUnionExpr.prototype.items	= null;

//cUnionExpr.operators	= {};
//cUnionExpr.operators['|']	= {};
//cUnionExpr.operators['union']	= {};

// Static members
cUnionExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cIntersectExceptExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() == '|' || oLexer.peek() == "union"))
		return oExpr;

	// Union expression
	var oUnionExpr	= new cUnionExpr(oExpr);
	while (oLexer.peek() == '|' || oLexer.peek() == "union") {
		oLexer.next();
		oExpr	= cIntersectExceptExpr.parse(oLexer, oResolver);
		if (!oExpr)
			throw "UnionExpr.parse: right operand missing";
		oUnionExpr.items.push(oExpr);
	}
	return oUnionExpr;
};

// Public members
cUnionExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.left.evaluate(oContext);
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= cXPathSequence.union(oSequence, this.items[nIndex].evaluate(oContext));
	return oSequence;
};