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
function fPrimaryExpr_parse (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fContextItemExpr_parse(oLexer, oStaticContext)
			|| fParenthesizedExpr_parse(oLexer, oStaticContext)
			|| fFunctionCall_parse(oLexer, oStaticContext)
			|| fVarRef_parse(oLexer, oStaticContext)
			|| fLiteral_parse(oLexer, oStaticContext);
};