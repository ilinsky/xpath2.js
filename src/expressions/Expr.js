/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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
cExpr.parse	= function(oLexer, oStaticContext) {
	//
	var oExpr	= new cExpr,
		oItem;
	do {
		if (oLexer.eof() ||!(oItem = cExprSingle.parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression"
//<-Debug
			);
		oExpr.items.push(oItem);
	}
	while (oLexer.peek() == ',' && oLexer.next());
	//
	if (oLexer.peek(-1) == ',')
		throw new cException("XPST0003"
//->Debug
				, "Expected expression"
//<-Debug
		);

	//
	return oExpr;
};

// Public members
cExpr.prototype.evaluate	= function(oContext) {
	var oSequence	= new cSequence;
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= hStaticContext_operators["concatenate"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
	return oSequence;
};