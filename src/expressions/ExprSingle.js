/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cExprSingle() {

};

// Static members
cExprSingle.parse	= function (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return cForExpr.parse(oLexer, oStaticContext)
			|| cQuantifiedExpr.parse(oLexer, oStaticContext)
			|| cIfExpr.parse(oLexer, oStaticContext)
			|| cOrExpr.parse(oLexer, oStaticContext);
};