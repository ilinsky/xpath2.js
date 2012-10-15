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
		oPathExpr.items.push(new cFunctionCall("root"));
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
	var oSequence	= oContext.sequence;
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++) {
		oContext.sequence	= oSequence;
		oContext.position	= 1;
		oSequence	= this.items[nIndex].evaluate(oContext);
	};
	return oSequence;
};