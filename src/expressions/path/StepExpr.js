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
cStepExpr.parse	= function (oLexer) {
	try {
		return cFilterExpr.parse(oLexer);
	}
	catch (e) {
		return cAxisStep.parse(oLexer);
	}
};

cStepExpr.parsePredicates	= function (oLexer, oStep) {
	// Parse predicates
	while (oLexer.peek() == '[') {
		oLexer.next();

		if (oLexer.eof())
			throw "StepExpr.parsePredicates: Missing predicate expression";

		oStep.predicates.push(cExpr.parse(oLexer));

		if (oLexer.eof())
			throw "StepExpr.parsePredicates: Predicate not closed";

		if (oLexer.peek() != ']')
			throw "StepExpr.parsePredicates: Bad input: " + oLexer.peek();

		oLexer.next();
	}
};

// Public members
cStepExpr.prototype.evaluate	= function (oContext) {

};

cStepExpr.prototype.applyPredicates	= function(oContext) {
	var oSequence	= oContext.sequence,
		oSequence1,
		oSequence2;
	// TODO: Apply predicates
	for (var nPredicateIndex = 0, nPredicateLength = this.predicates.length; nPredicateIndex < nPredicateLength; nPredicateIndex++) {
		oSequence1	= new cXPathSequence(oSequence);
		oContext1	= new cXPathContext(oSequence1, 1, oContext.scope);
		oSequence	= new cXPathSequence;
		for (var nIndex = 1, nLength = oSequence1.items.length + 1; nIndex < nLength; nIndex++) {
			oContext1.position	= nIndex;
			oSequence2	= this.predicates[nPredicateIndex].evaluate(oContext1);
			//
			if (oSequence2.isSingleton() && !fIsNaN(oSequence2.toNumber())) {
				if (oSequence2.toNumber() == nIndex)
					oSequence.add(oSequence1.items[nIndex - 1]);
			}
			else
			if (oSequence2.toBoolean())
				oSequence.add(oSequence1.items[nIndex - 1]);
		}
	}
	return oSequence;
};