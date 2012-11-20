/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Expression(sExpression, oStaticContext) {
	var oLexer	= new cXPath2Lexer(sExpression),
		oExpr	= cExpr.parse(oLexer, oStaticContext);
	//
	if (!oLexer.eof())
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Unexpected token beyond end of query"
//<-Debug
		);
	//
	this.internalExpression	= oExpr;
};

cXPath2Expression.prototype.internalExpression	= null;

cXPath2Expression.prototype.resolve	= function(oContext) {
	var oSequence	= this.internalExpression.evaluate(oContext),
		aReturn	= [];
	for (var nIndex = 0, nLength = oSequence.items.length, oItem; nIndex < nLength; nIndex++)
		aReturn[aReturn.length]	= oContext.DOMAdapter.isNode(oItem = oSequence.items[nIndex])
									? oItem
									: (fXSAnyAtomicType_isNumeric(oItem) || oItem instanceof cXSBoolean)
										? oItem.valueOf()
										: oItem.toString();
	//
	return aReturn;
};
