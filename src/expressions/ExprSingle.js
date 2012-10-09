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
cExprSingle.parse	= function (oLexer, oResolver) {
	var oExpr	= cForExpr.parse(oLexer, oResolver)
					|| cQuantifiedExpr.parse(oLexer, oResolver)
					|| cIfExpr.parse(oLexer, oResolver)
					|| cOrExpr.parse(oLexer, oResolver);

	if (oExpr)
		return oExpr;

	throw "ExprSingle.parse: Expected ExprSingle expression";
};