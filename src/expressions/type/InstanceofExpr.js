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

cInstanceofExpr.parse	= function(oLexer, oResolver) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cTreatExpr.parse(oLexer, oResolver)))
		return;

	if (!(oLexer.peek() == "instance" && oLexer.peek(1) == "of"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSequenceType.parse(oLexer, oResolver)))
		throw "TreatExpr.parse: Expected expression operand";

	return new cInstanceofExpr(oExpr, oType);
};

cInstanceofExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate empty-sequence()
	if (!this.type.itemType)
		return new cXPath2Sequence(oSequence1.isEmpty());
	// Validate cardinality
	if (oSequence1.isEmpty())
		return new cXPath2Sequence(this.type.occurence == '?' || this.type.occurence == '*');
	if (!(oSequence1.isSingleton()))
		if (!(this.type.occurence == '+' || this.type.occurence == '*'))
			return new cXPath2Sequence(false);

	// Validate type
	var oType	= this.type.itemType;
	if (!oType.test)	// item()
		return new cXPath2Sequence(true);

	var bValue	= true;
	for (var nIndex = 0, nLength = oSequence1.items.length; (nIndex < nLength) && bValue; nIndex++)
		bValue	= oType.test.test(oSequence1.items[nIndex]);
	//
	return new cXPath2Sequence(bValue);
};