/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cStepExpr() {

};

// Static members
function fStepExpr_parse (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fFilterExpr_parse(oLexer, oStaticContext)
			|| fAxisStep_parse(oLexer, oStaticContext);
};

function fStepExpr_parsePredicates (oLexer, oStaticContext, oStep) {
	var oExpr;
	// Parse predicates
	while (oLexer.peek() == '[') {
		oLexer.next();

		if (oLexer.eof() ||!(oExpr = fExpr_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression in predicate"
//<-Debug
			);

		oStep.predicates.push(oExpr);

		if (oLexer.peek() != ']')
			throw new cException("XPST0003"
//->Debug
					, "Expected ']' token in predicate"
//<-Debug
			);

		oLexer.next();
	}
};

// Public members
cStepExpr.prototype.applyPredicates	= function(oContext, oSequence) {
	var vContextItem	= oContext.item,
		nContextPosition= oContext.position,
		nContextSize	= oContext.size;
	//
	for (var nPredicateIndex = 0, oSequence1, nPredicateLength = this.predicates.length; nPredicateIndex < nPredicateLength; nPredicateIndex++) {
		oSequence1	= oSequence;
		oSequence	= new cSequence;
		for (var nIndex = 0, oSequence2, nLength = oSequence1.items.length; nIndex < nLength; nIndex++) {
			// Set new context
			oContext.item		= oSequence1.items[nIndex];
			oContext.position	= nIndex + 1;
			oContext.size		= nLength;
			//
			oSequence2	= this.predicates[nPredicateIndex].evaluate(oContext);
			//
			if (oSequence2.items.length == 1 && fXSAnyAtomicType_isNumeric(oSequence2.items[0])) {
				if (oSequence2.items[0] == nIndex + 1)
					oSequence.items.push(oSequence1.items[nIndex]);
			}
			else
			if (fFunction_sequence_toEBV(oSequence2, oContext))
				oSequence.items.push(oSequence1.items[nIndex]);
		}
	}
	// Restore context
	oContext.item		= vContextItem;
	oContext.position	= nContextPosition;
	oContext.size		= nContextSize;
	//
	return oSequence;
};