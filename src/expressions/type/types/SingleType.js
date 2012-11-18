/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cSingleType(oItemType, sOccurence) {
	this.itemType	= oItemType	|| null;
	this.occurence	= sOccurence|| null;
};

cSingleType.prototype.itemType	= null;
cSingleType.prototype.occurence	= null;

cSingleType.parse	= function(oLexer, oStaticContext) {
	var oExpr,
		sOccurence;
	if (!oLexer.eof() && (oExpr = cAtomicType.parse(oLexer, oStaticContext))) {
		sOccurence	= oLexer.peek();
		if (sOccurence == '?')
			oLexer.next();
		else
			sOccurence	= null;

		return new cSingleType(oExpr, sOccurence);
	}
};