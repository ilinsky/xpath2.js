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
cPrimaryExpr.parse	= function (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return cLiteral.parse(oLexer, oStaticContext)
			|| cVarRef.parse(oLexer, oStaticContext)
			|| cParenthesizedExpr.parse(oLexer, oStaticContext)
			|| cContextItemExpr.parse(oLexer, oStaticContext)
			|| cFunctionCall.parse(oLexer, oStaticContext);
};