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
	var oExpr	= cAdditiveExpr.parse(oLexer, oResolver);
	if (oLexer.eof() || oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	return new cRangeExpr(oExpr, cAdditiveExpr.parse(oLexer, oResolver));
};

// Public members
cRangeExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPathSequence;
	for (var nIndex = this.left.evaluate(oContext).toNumber(), nLength = this.right.evaluate(oContext).toNumber(); nIndex <= nLength; nIndex++)
		oSequence.add(nIndex);
	return oSequence;
};