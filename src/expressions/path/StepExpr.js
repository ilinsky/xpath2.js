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
cStepExpr.parse	= function (oLexer, oResolver) {
	if (!oLexer.eof())
		return cFilterExpr.parse(oLexer, oResolver)
			|| cAxisStep.parse(oLexer, oResolver);
};

cStepExpr.parsePredicates	= function (oLexer, oResolver, oStep) {
	var oExpr;
	// Parse predicates
	while (oLexer.peek() == '[') {
		oLexer.next();

		if (oLexer.eof() ||!(oExpr = cExpr.parse(oLexer, oResolver)))
			throw "StepExpr.parsePredicates: expected Expr expression";

		oStep.predicates.push(oExpr);

		if (oLexer.peek() != ']')
			throw "StepExpr.parsePredicates: Expected ']' token";

		oLexer.next();
	}
};

// Public members
cStepExpr.prototype.applyPredicates	= function(oContext, oSequence) {
	var vContextItem	= oContext.context,
		nContextPosition= oContext.position,
		nContextLast	= oContext.last;
	//
	for (var nPredicateIndex = 0, oSequence1, nPredicateLength = this.predicates.length; nPredicateIndex < nPredicateLength; nPredicateIndex++) {
		oSequence1	= oSequence;
		oSequence	= new cXPath2Sequence;
		for (var nIndex = 0, oSequence2, nLength = oSequence1.items.length; nIndex < nLength; nIndex++) {
			// Set new context
			oContext.context	= oSequence1.items[nIndex];
			oContext.position	= nIndex + 1;
			oContext.last		= nLength;
			//
			oSequence2	= this.predicates[nPredicateIndex].evaluate(oContext);
			//
			if (oSequence2.isSingleton() && typeof oSequence2.items[0] == "number") {
				if (oSequence2.items[0] == nIndex + 1)
					oSequence.add(oSequence1.items[nIndex]);
			}
			else
			if (oSequence2.toBoolean())
				oSequence.add(oSequence1.items[nIndex]);
		}
	}
	// Restore context
	oContext.context	= vContextItem;
	oContext.position	= nContextPosition;
	oContext.last		= nContextLast;
	//
	return oSequence;
};