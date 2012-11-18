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

cUnionExpr.operators	= {};
cUnionExpr.operators["union"]	= function(oLeft, oRight, oContext) {
	return hXPath2StaticContext_operators["union"].call(oContext, oLeft, oRight);
};

// Static members
cUnionExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cIntersectExceptExpr.parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() == '|' || oLexer.peek() == "union"))
		return oExpr;

	// Union expression
	var oUnionExpr	= new cUnionExpr(oExpr);
	while (oLexer.peek() == '|' || oLexer.peek() == "union") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cIntersectExceptExpr.parse(oLexer, oStaticContext)))
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected right operand in union expression"
//<-Debug
			);
		oUnionExpr.items.push(oExpr);
	}
	return oUnionExpr;
};

// Public members
cUnionExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.left.evaluate(oContext);
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= cUnionExpr.operators["union"](oSequence, this.items[nIndex].evaluate(oContext), oContext);
	return oSequence;
};