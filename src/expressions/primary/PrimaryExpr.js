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
	var oExpr	= cLiteral.parse(oLexer)
					|| cVarRef.parse(oLexer)
					|| cParenthesizedExpr.parse(oLexer)
					|| cContextItemExpr.parse(oLexer)
					|| cFunctionCall.parse(oLexer);

	return oExpr;
};