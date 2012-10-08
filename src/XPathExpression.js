/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathExpression(sExpression, oResolver) {
//	try {
		if (!sExpression.length)
			throw new cXPathException(cXPathException.INVALID_EXPRESSION_ERR);
		var oLexer	= new cXPathLexer(sExpression);
		this.$expression	= cExpr.parse(oLexer);
		this.$resolver		= oResolver;
		//
		if (!oLexer.eof())
			throw "Junk at the end of expression";
/*	} catch (e) {
		throw new cXPathException(cXPathException.INVALID_EXPRESSION_ERR);
	}*/
};

cXPathExpression.prototype.evaluate	= function(oNode, nType, oResult) {
	// validate API
//	ample.guard(arguments, [
//		["context",		cNode],
//		["type",		cNumber,	true,	true],
//		["result",		cObject,	true,	true]
//	]);

	// Invoke implementation
	return fXPathExpression_evaluate(this, oNode, nType, oResult);
};