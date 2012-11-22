/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cSequenceType(oItemType, sOccurence) {
	this.itemType	= oItemType	|| null;
	this.occurence	= sOccurence|| null;
};

cSequenceType.prototype.itemType	= null;
cSequenceType.prototype.occurence	= null;

function fSequenceType_parse (oLexer, oStaticContext) {
	if (oLexer.eof())
		return;

	if (oLexer.peek() == "empty-sequence" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in sequence type"
//<-Debug
			);
		oLexer.next();
		return new cSequenceType;	// empty sequence
	}

	var oExpr,
		sOccurence;
	if (!oLexer.eof() && (oExpr = fItemType_parse(oLexer, oStaticContext))) {
		sOccurence	= oLexer.peek();
		if (sOccurence == '?' || sOccurence == '*' || sOccurence == '+')
			oLexer.next();
		else
			sOccurence	= null;

		return new cSequenceType(oExpr, sOccurence);
	}
};