/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cValueExpr() {

};

// Static members
cValueExpr.parse	= function (oLexer, oResolver) {
	return cPathExpr.parse(oLexer, oResolver);
};
