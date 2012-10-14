/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Parser() {

};

cXPath2Parser.prototype.parse	= function(sExpression, fResolver) {
	var oLexer		= new cXPath2Lexer(sExpression),
		hPrefix		= {},
		oResolver	= function(sPrefix) {
			if (!fResolver)
				throw "Cannot resolve prefix";
			return sPrefix in hPrefix ? hPrefix[sPrefix] : hPrefix[sPrefix] = fResolver(sPrefix);
		};
	//
	var oExpr	= cExpr.parse(oLexer, oResolver);
	//
	if (!oLexer.eof())
		throw "Expr.parse: Junk at the end of expression";
	//
	return oExpr;
};