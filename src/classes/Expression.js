/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cExpression(sExpression, oStaticContext) {
	var oLexer	= new cLexer(sExpression),
		oExpr	= fExpr_parse(oLexer, oStaticContext);
	//
	if (!oLexer.eof())
		throw new cException("XPST0003"
//->Debug
				, "Unexpected token beyond end of query"
//<-Debug
		);
	//
	if (!oExpr)
		throw new cException("XPST0003"
//->Debug
				, "Expected expression"
//<-Debug
		);
	this.internalExpression	= oExpr;
};

cExpression.prototype.internalExpression	= null;

// Public methods
cExpression.prototype.evaluate	= function(oContext) {
	return this.internalExpression.evaluate(oContext);
};
