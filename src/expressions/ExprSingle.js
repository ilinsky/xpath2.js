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
fExprSingle_parse	= function (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fForExpr_parse(oLexer, oStaticContext)
			|| fQuantifiedExpr_parse(oLexer, oStaticContext)
			|| fIfExpr_parse(oLexer, oStaticContext)
			|| fOrExpr_parse(oLexer, oStaticContext);
};