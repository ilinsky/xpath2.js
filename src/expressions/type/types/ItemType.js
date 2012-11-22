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

fItemType_parse	= function(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;

	var oExpr;
	if (oLexer.peek() == "item" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in item type expression"
//<-Debug
			);
		oLexer.next();
		return new cItemType;
	}
	// Note! Following step should have been before previous as per spec
	if (oExpr = fKindTest_parse(oLexer, oStaticContext))
		return new cItemType(oExpr);
	if (oExpr = fAtomicType_parse(oLexer, oStaticContext))
		return new cItemType(oExpr);
};