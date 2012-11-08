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
	var vContextItem	= oContext.context,
		nContextPosition= oContext.position,
		nContextLast	= oContext.last;
	//
	var oSequence	= new cXPath2Sequence(vContextItem);
	for (var nItemIndex = 0, nItemLength = this.items.length, oSequence1; nItemIndex < nItemLength; nItemIndex++) {
		oSequence1	= new cXPath2Sequence;
		for (var nIndex = 0, nLength = oSequence.items.length; nIndex < nLength; nIndex++) {
			// Set new context
			oContext.context	= oSequence.items[nIndex];
			oContext.position	= 1;
			oContext.last		= 1;
			//
			for (var nRightIndex = 0, oSequence2 = this.items[nItemIndex].evaluate(oContext), nRightLength = oSequence2.items.length; nRightIndex < nRightLength; nRightIndex++)
				if (oSequence1.indexOf(oSequence2.items[nRightIndex]) ==-1)
					oSequence1.add(oSequence2.items[nRightIndex]);
		}
		oSequence	= oSequence1;
	};
	// Restore context
	oContext.context	= vContextItem;
	oContext.position	= nContextPosition;
	oContext.last		= nContextLast;
	//
	return cXPath2Sequence.order(oSequence);
};