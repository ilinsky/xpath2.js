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
cPrimaryExpr.parse	= function (oLexer, oResolver) {
	return cLiteral.parse(oLexer, oResolver)
			|| cVarRef.parse(oLexer, oResolver)
			|| cParenthesizedExpr.parse(oLexer, oResolver)
			|| cContextItemExpr.parse(oLexer, oResolver)
			|| cFunctionCall.parse(oLexer, oResolver);
};