/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cPathExpr() {
	this.items	= [];
};

cPathExpr.prototype.items	= [];

// Static members
cPathExpr.parse	= function (oLexer, oResolver) {
	if (oLexer.eof())
		return;
	var sSingleSlash	= '/',
		sDoubleSlash	= '/' + '/';

	var oPathExpr	= new cPathExpr(),
		sSlash	= oLexer.peek(),
		oExpr;
	// Parse first step
	if (sSlash == sDoubleSlash || sSlash == sSingleSlash) {
		oLexer.next();
		oPathExpr.items.push(new cFunctionCall(null, "root", "http://www.w3.org/2005/xpath-functions"));
		//
		if (sSlash == sDoubleSlash)
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
	}

	//
	if (oLexer.eof() ||!(oExpr = cStepExpr.parse(oLexer, oResolver))) {
		if (sSlash == sSingleSlash)
			return oPathExpr.items[0];
		//
		throw "PathExpr.parse: expected AxisStep expression";
	}
	oPathExpr.items.push(oExpr);

	// Parse other steps
	while ((sSlash = oLexer.peek()) == sSingleSlash || sSlash == sDoubleSlash) {
		if (sSlash == sDoubleSlash)
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
		//
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cStepExpr.parse(oLexer, oResolver)))
			throw "PathExpr.parse: Expected StepExpr expression";
		//
		oPathExpr.items.push(oExpr);
	}

	if (oPathExpr.items.length == 1)
		return oPathExpr.items[0];

	//
	return oPathExpr;
};

// Public members
cPathExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPath2Sequence(oContext.context),
		oContext1	= new cXPath2Context,
		oSequence1,
		oStep;
	for (var nItemIndex = 0, nItemLength = this.items.length; nItemIndex < nItemLength; nItemIndex++) {
		oStep	= new cXPath2Sequence;
		for (var nIndex = 0, nLength = oSequence.items.length; nIndex < nLength; nIndex++) {
			oContext1.context	= oSequence.items[nIndex];
			oSequence1	= this.items[nItemIndex].evaluate(oContext1);
			for (var nRightIndex = 0, nRightLength = oSequence1.items.length; nRightIndex < nRightLength; nRightIndex++)
				if (oStep.indexOf(oSequence1.items[nRightIndex]) ==-1)
					oStep.add(oSequence1.items[nRightIndex]);
		}
		oSequence	= oStep;
	};
	return cXPath2Sequence.order(oSequence);
};