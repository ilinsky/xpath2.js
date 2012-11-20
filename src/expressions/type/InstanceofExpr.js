/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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

cInstanceofExpr.parse	= function(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cTreatExpr.parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "instance" && oLexer.peek(1) == "of"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSequenceType.parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in instance of expression"
//<-Debug
		);

	return new cInstanceofExpr(oExpr, oType);
};

cInstanceofExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext),
		oItemType	= this.type.itemType;
	// Validate empty-sequence()
	if (!oItemType)
		return new cSequence(new cXSBoolean(oSequence1.isEmpty()));
	// Validate cardinality
	if (oSequence1.isEmpty())
		return new cSequence(new cXSBoolean(this.type.occurence == '?' || this.type.occurence == '*'));
	if (!(oSequence1.isSingleton()))
		if (!(this.type.occurence == '+' || this.type.occurence == '*'))
			return new cSequence(new cXSBoolean(false));

	// Validate type
	if (!oItemType.test)	// item()
		return new cSequence(new cXSBoolean(true));

	var bValue	= true;
	for (var nIndex = 0, nLength = oSequence1.items.length; (nIndex < nLength) && bValue; nIndex++)
		bValue	= oItemType.test.test(oSequence1.items[nIndex], oContext);
	//
	return new cSequence(new cXSBoolean(bValue));
};