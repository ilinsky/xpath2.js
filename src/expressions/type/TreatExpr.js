/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cTreatExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cTreatExpr.prototype.expression	= null;
cTreatExpr.prototype.type		= null;

cTreatExpr.parse	= function(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cCastableExpr.parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "treat" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSequenceType.parse(oLexer, oStaticContext)))
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected right operand in treat expression"
//<-Debug
		);

	return new cTreatExpr(oExpr, oType);
};

cTreatExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate empty-sequence()
	if (!this.type.itemType && !oSequence1.isEmpty())
		throw new cXPath2Error("XPDY0050"
//->Debug
				, "The only value allowed for the value in 'treat as' expression is an empty sequence"
//<-Debug
		);

	// Validate cardinality
	if (oSequence1.isEmpty() &&!(this.type.occurence == '?' || this.type.occurence == '*'))
		throw new cXPath2Error("XPDY0050"
//->Debug
				, "An empty sequence is not allowed as the value in 'treat as' expression"
//<-Debug
		);

	if (!(oSequence1.isSingleton()) &&!(this.type.occurence == '+' || this.type.occurence == '*'))
		throw new cXPath2Error("XPDY0050"
//->Debug
				, "A sequence of more than one item is not allowed as the value in 'treat as' expression"
//<-Debug
		);

	// Validate type
	var oType	= this.type.itemType;
	if (!oType.test)	// item()
		return oSequence1;

	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (!oType.test.test(oSequence1.items[nIndex], oContext))
			throw new cXPath2Error("XPDY0050"
//->Debug
					, "Required item type of value in 'treat as' expression is xs:boolean"
					// XPDY0050: Required item type of value in 'treat as' expression is {type1}; supplied value has item type {type2}
//<-Debug
			);

	//
	return oSequence1;
};