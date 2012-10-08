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
	try {
		return cForExpr.parse(oLexer);
	}
	catch (e) {
		try {
			return cQuantifiedExpr.parse(oLexer);
		}
		catch (e) {
			try {
				return cIfExpr.parse(oLexer);
			}
			catch (e) {
				return cOrExpr.parse(oLexer);
			}
		}
	}
};

// Public members
cExprSingle.prototype.evaluate	= function (oContext) {

};