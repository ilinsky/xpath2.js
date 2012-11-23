/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cExpression(sExpression, oStaticContext) {
	var oLexer	= new cLexer(sExpression),
		oExpr	= fExpr_parse(oLexer, oStaticContext);
	//
	if (!oLexer.eof())
		throw new cException("XPST0003"
//->Debug
				, "Unexpected token beyond end of query"
//<-Debug
		);
	//
	if (!oExpr)
		throw new cException("XPST0003"
//->Debug
				, "Expected expression"
//<-Debug
		);
	//
	this.internalExpression	= oExpr;
};

cExpression.prototype.internalExpression	= null;

cExpression.prototype.resolve	= function(oContext) {
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
