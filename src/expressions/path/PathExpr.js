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
		oExpr;
	// Parse first step
	if (oLexer.peek() == sSingleSlash) {
		oLexer.next();
		oPathExpr.items.push(new cFunctionCall("root"));
	}
	else
	if (oLexer.peek() == sDoubleSlash) {
		oLexer.next();
		oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
	}
	//
	if (oLexer.eof() ||!(oExpr = cStepExpr.parse(oLexer, oResolver))) {
		if (oPathExpr.items.length && oPathExpr.items[0] instanceof cFunctionCall)
			return oPathExpr.items[0];
		return;
	}
	oPathExpr.items.push(oExpr);

	// Parse other steps
	while (oLexer.peek() == sSingleSlash || oLexer.peek() == sDoubleSlash) {
		if (oLexer.peek() == sDoubleSlash) {
			oLexer.next();
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
		}
		else
		if (oLexer.peek() == sSingleSlash)
			oLexer.next();
		//
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