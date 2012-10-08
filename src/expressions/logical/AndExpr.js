/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAndExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cAndExpr.prototype.left		= null;
cAndExpr.prototype.items	= null;

// Static members
cAndExpr.parse	= function (oLexer) {
	var oExpr	= cComparisonExpr.parse(oLexer);
	if (oLexer.eof() || oLexer.peek() != "and")
		return oExpr;

	// And expression
	var oAndExpr	= new cAndExpr(oExpr);
	while (oLexer.peek() == "and") {
		oLexer.next();
		oExpr	= cComparisonExpr.parse(oLexer);
		oAndExpr.items.push(oExpr);
	}
	return oAndExpr;
};

// Public members
cAndExpr.prototype.evaluate	= function (oContext) {
	var bValue	= this.left.evaluate(oContext).toBoolean();
	for (var nIndex = 0, nLength = this.items.length; (nIndex < nLength) && bValue; nIndex++)
		bValue	= this.items[nIndex].evaluate(oContext).toBoolean();
	return new cXPathSequence(bValue);
};