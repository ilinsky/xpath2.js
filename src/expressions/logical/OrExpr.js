/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cOrExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cOrExpr.prototype.left	= null;
cOrExpr.prototype.items	= null;

// Static members
cOrExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cAndExpr.parse(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "or")
		return oExpr;

	// Or expression
	var oOrExpr	= new cOrExpr(oExpr);
	while (oLexer.peek() == "or") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cAndExpr.parse(oLexer, oStaticContext)))
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected right operand in logical or expression"
//<-Debug
			);
		oOrExpr.items.push(oExpr);
	}
	return oOrExpr;
};

// Public members
cOrExpr.prototype.evaluate	= function (oContext) {
	var bValue	= this.left.evaluate(oContext).toBoolean(oContext);
	for (var nIndex = 0, nLength = this.items.length; (nIndex < nLength) && !bValue; nIndex++)
		bValue	= this.items[nIndex].evaluate(oContext).toBoolean(oContext);
	return new cXPath2Sequence(new cXSBoolean(bValue));
};