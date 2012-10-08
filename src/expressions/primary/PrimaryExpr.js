/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cPrimaryExpr() {

};

// Static members
cPrimaryExpr.parse	= function (oLexer) {
	try {
		return cLiteral.parse(oLexer);
	}
	catch (e) {
		try {
			return cVarRef.parse(oLexer);
		}
		catch (e) {
			try {
				return cParenthesizedExpr.parse(oLexer);
			}
			catch (e) {
				try {
					return cContextItemExpr.parse(oLexer);
				}
				catch (e) {
					return cFunctionCall.parse(oLexer);
				}
			}
		}
	}
};

// Public members
cPrimaryExpr.prototype.evaluate	= function (oContext) {

};