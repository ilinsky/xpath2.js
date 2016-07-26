/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cInstanceofExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cInstanceofExpr.prototype.expression	= null;
cInstanceofExpr.prototype.type			= null;

function fInstanceofExpr_parse (oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fTreatExpr_parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "instance" && oLexer.peek(1) == "of"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fSequenceType_parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in instance of expression"
//<-Debug
		);

	return new cInstanceofExpr(oExpr, oType);
};

cInstanceofExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext),
		oItemType	= this.type.itemType,
		sOccurence	= this.type.occurence;
	// Validate empty-sequence()
	if (!oItemType)
		return [new cXSBoolean(!oSequence1.length)];
	// Validate cardinality
	if (!oSequence1.length)
		return [new cXSBoolean(sOccurence == '?' || sOccurence == '*')];
	if (oSequence1.length != 1)
		if (!(sOccurence == '+' || sOccurence == '*'))
			return [new cXSBoolean(false)];

	// Validate type
	if (!oItemType.test)	// item()
		return [new cXSBoolean(true)];

	var bValue	= true;
	for (var nIndex = 0, nLength = oSequence1.length; (nIndex < nLength) && bValue; nIndex++)
		bValue	= oItemType.test.test(oSequence1[nIndex], oContext);
	//
	return [new cXSBoolean(bValue)];
};
