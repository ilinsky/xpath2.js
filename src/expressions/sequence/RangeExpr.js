/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cRangeExpr(oLeft, oRight) {
	this.left	= oLeft;
	this.right	= oRight;
};

cRangeExpr.prototype.left	= null;
cRangeExpr.prototype.right	= null;

// Static members
cRangeExpr.parse	= function (oLexer, oResolver) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cAdditiveExpr.parse(oLexer, oResolver)))
		return;
	if (oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	oRight	= cAdditiveExpr.parse(oLexer, oResolver);
	if (!oRight)
		throw "RangeExpr.parse: expected right operand";
	return new cRangeExpr(oExpr, oRight);
};

// Public members
cRangeExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = this.left.evaluate(oContext).toNumber(), nLength = this.right.evaluate(oContext).toNumber(); nIndex <= nLength; nIndex++)
		oSequence.add(nIndex);
	return oSequence;
};