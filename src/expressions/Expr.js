/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cExpr() {
	this.items	= [];
};

cExpr.prototype.items	= null;

// Static members
function fExpr_parse (oLexer, oStaticContext) {
	var oItem;
	if (oLexer.eof() ||!(oItem = fExprSingle_parse(oLexer, oStaticContext)))
		return;

	// Create expression
	var oExpr	= new cExpr;
	oExpr.items.push(oItem);
	while (oLexer.peek() == ',') {
		oLexer.next();
		if (oLexer.eof() ||!(oItem = fExprSingle_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression"
//<-Debug
			);
		oExpr.items.push(oItem);
	}
	return oExpr;
};

// Public members
cExpr.prototype.evaluate	= function(oContext) {
	var oSequence	= [];
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= hStaticContext_operators["concatenate"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
	return oSequence;
};