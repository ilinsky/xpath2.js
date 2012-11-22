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

function fTreatExpr_parse (oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fCastableExpr_parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "treat" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fSequenceType_parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in treat expression"
//<-Debug
		);

	return new cTreatExpr(oExpr, oType);
};

cTreatExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext),
		oItemType	= this.type.itemType;
	// Validate empty-sequence()
	if (!oItemType) {
		if (!oSequence1.isEmpty())
			throw new cException("XPDY0050"
//->Debug
					, "The only value allowed for the value in 'treat as' expression is an empty sequence"
//<-Debug
			);
		return oSequence1;
	}

	// Validate cardinality
	if (!(this.type.occurence == '?' || this.type.occurence == '*'))
		if (oSequence1.isEmpty())
			throw new cException("XPDY0050"
//->Debug
					, "An empty sequence is not allowed as the value in 'treat as' expression"
//<-Debug
			);

	if (!(this.type.occurence == '+' || this.type.occurence == '*'))
		if (!oSequence1.isSingleton())
			throw new cException("XPDY0050"
//->Debug
					, "A sequence of more than one item is not allowed as the value in 'treat as' expression"
//<-Debug
			);

	// Validate type
	if (!oItemType.test)	// item()
		return oSequence1;

	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (!oItemType.test.test(oSequence1.items[nIndex], oContext))
			throw new cException("XPDY0050"
//->Debug
					, "Required item type of value in 'treat as' expression is " + (oItemType.test.prefix ? oItemType.test.prefix + ':' : '') + oItemType.test.localName
					// XPDY0050: Required item type of value in 'treat as' expression is {type1}; supplied value has item type {type2}
//<-Debug
			);

	//
	return oSequence1;
};