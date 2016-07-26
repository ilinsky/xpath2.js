/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cExprSingle() {

};

// Static members
function fExprSingle_parse (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fIfExpr_parse(oLexer, oStaticContext)
			|| fForExpr_parse(oLexer, oStaticContext)
			|| fQuantifiedExpr_parse(oLexer, oStaticContext)
			|| fOrExpr_parse(oLexer, oStaticContext);
};
