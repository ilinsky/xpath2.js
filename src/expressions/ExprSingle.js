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
cExprSingle.parse	= function (oLexer) {
	var oExpr	= cForExpr.parse(oLexer)
					|| cQuantifiedExpr.parse(oLexer)
					|| cIfExpr.parse(oLexer)
					|| cOrExpr.parse(oLexer);

	if (oExpr)
		return oExpr;

	throw "ExprSingle.parse: Expected ExprSingle expression";
};

// Public members
cExprSingle.prototype.evaluate	= function (oContext) {

};