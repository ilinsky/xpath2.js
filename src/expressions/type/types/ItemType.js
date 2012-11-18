/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cItemType(oTest) {
	this.test	= oTest;
};

cItemType.prototype.test	= null;

cItemType.parse	= function(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;

	var oExpr;
	if (oLexer.peek() == "item" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		if (oLexer.peek() != ')')
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected ')' token in item type expression"
//<-Debug
			);
		oLexer.next();
		return new cItemType;
	}
	// Note! Following step should have been before previous as per spec
	if (oExpr = cKindTest.parse(oLexer, oStaticContext))
		return new cItemType(oExpr);
	if (oExpr = cAtomicType.parse(oLexer, oStaticContext))
		return new cItemType(oExpr);
};