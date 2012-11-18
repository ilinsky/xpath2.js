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
cAndExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cComparisonExpr.parse(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "and")
		return oExpr;

	// And expression
	var oAndExpr	= new cAndExpr(oExpr);
	while (oLexer.peek() == "and") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cComparisonExpr.parse(oLexer, oStaticContext)))
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected right operand in logical and expression"
//<-Debug
			);
		oAndExpr.items.push(oExpr);
	}
	return oAndExpr;
};

// Public members
cAndExpr.prototype.evaluate	= function (oContext) {
	var bValue	= this.left.evaluate(oContext).toBoolean(oContext);
	for (var nIndex = 0, nLength = this.items.length; (nIndex < nLength) && bValue; nIndex++)
		bValue	= this.items[nIndex].evaluate(oContext).toBoolean(oContext);
	return new cXPath2Sequence(new cXSBoolean(bValue));
};