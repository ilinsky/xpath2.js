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
	this.staticContext	= oStaticContext;
	this.internalExpression	= oExpr;
	//
	this.expr	= sExpression;
};

cXPath2Expression.prototype.staticContext	= null;
cXPath2Expression.prototype.internalExpression	= null;

cXPath2Expression.prototype.resolve	= function(vItem, oScope, oDOMAdapter) {
	if (typeof vItem == "undefined")
		vItem	= null;
	var oContext	= new cXPath2DynamicContext(this.staticContext, vItem, oScope, oDOMAdapter),
		oSequence	= this.internalExpression.evaluate(oContext),
		aReturn	= [];
	for (var nIndex = 0, nLength = oSequence.items.length, oItem; nIndex < nLength; nIndex++)
		if (!oContext.DOMAdapter.isNode(oItem = oSequence.items[nIndex])) {
			if (cXSAnyAtomicType.isNumeric(oItem) || oItem instanceof cXSBoolean)
				aReturn[aReturn.length]	= oItem.valueOf();
			else
				aReturn[aReturn.length]	= oItem.toString();
		}
		else
			aReturn[aReturn.length]	= oItem;
	//
	return aReturn;
};
