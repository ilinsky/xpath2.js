/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathExpression(sExpression, oResolver) {
	try {
		//
		var oLexer	= new cXPathLexer(sExpression);
		this.expression	= cExpr.parse(oLexer);
		this.resolver	= oResolver;
		//
		if (!oLexer.eof())
			throw "Junk at the end of expression";
	} catch (e) {
		throw new cXPathException(cXPathException.INVALID_EXPRESSION_ERR);
	}
};

cXPathExpression.prototype.evaluate	= function(oNode, nType, oResult) {
	// validate API
//	fGuard(arguments, [
//		["context",		cNode],
//		["type",		cNumber,	true,	true],
//		["result",		cObject,	true,	true]
//	]);

	// Invoke implementation
	return fXPathExpression_evaluate(oExpression, oNode, nType, oResult);
};

function fXPathExpression_evaluate(oExpression, oNode, nType, oResult) {
	var oContext	= new cXPathContext(new cXPathSequence(oNode), 1, {}),
		oSequence	= oExpression.expression.evaluate(oContext);
	// Determine type if not specified
	if (!nType) {
		nType	= 4;	// Default: XPathResult.UNORDERED_NODE_ITERATOR_TYPE
		if (oSequence.items.length) {
			var sType	= typeof oSequence.items[0];
			if (sType == "number")
				nType	= 1;	// XPathResult.NUMBER_TYPE
			else
			if (sType == "string")
				nType	= 2;	// XPathResult.STRING_TYPE
			else
			if (sType == "boolean")
				nType	= 3;	// XPathResult.BOOLEAN_TYPE
		}
	}
	return fXPathResult_init(oResult ? fXPathResult_clear(oResult) : new cXPathResult, nType, oSequence);
};
