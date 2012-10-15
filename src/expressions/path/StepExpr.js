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
cStepExpr.prototype.applyPredicates	= function(oContext) {
	var oSequence	= oContext.sequence,
		oSequence1,
		oContext1,
		oSequence2;
	// TODO: Apply predicates
	for (var nPredicateIndex = 0, nPredicateLength = this.predicates.length; nPredicateIndex < nPredicateLength; nPredicateIndex++) {
		oSequence1	= oSequence;
		oContext1	= new cXPath2Context(oSequence1);
		oSequence	= new cXPath2Sequence;
		for (var nIndex = 1, nLength = oSequence1.items.length + 1; nIndex < nLength; nIndex++) {
			oContext1.position	= nIndex;
			oSequence2	= this.predicates[nPredicateIndex].evaluate(oContext1);
			//
			if (oSequence2.isSingleton() && typeof oSequence2.items[0] == "number") {
				if (oSequence2.items[0] == nIndex)
					oSequence.add(oSequence1.items[nIndex - 1]);
			}
			else
			if (oSequence2.toBoolean())
				oSequence.add(oSequence1.items[nIndex - 1]);
		}
	}
	return oSequence;
};