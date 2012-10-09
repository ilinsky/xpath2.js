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
cPathExpr.parse	= function (oLexer) {
	var sSingleSlash	= '/',
		sDoubleSlash	= '/' + '/';

	var oExpr	= new cPathExpr();
	// Parse first step
	if (oLexer.peek() == sSingleSlash) {
		oLexer.next();
		oExpr.items.push(new cFunctionCall("root"));
	}
	else
	if (oLexer.peek() == sDoubleSlash) {
		oLexer.next();
		oExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
	}
	//
	if (oLexer.eof())
		throw "PathExpr.parse: Expected StepExpr expression";
	//
	oExpr.items.push(cStepExpr.parse(oLexer));

	// Parse other steps
	while (oLexer.peek() == sSingleSlash || oLexer.peek() == sDoubleSlash) {
		if (oLexer.peek() == sDoubleSlash) {
			oLexer.next();
			oExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
		}
		else
		if (oLexer.peek() == sSingleSlash)
			oLexer.next();
		//
		if (oLexer.eof())
			throw "PathExpr.parse: Expected StepExpr expression";
		//
		oExpr.items.push(cStepExpr.parse(oLexer));
	}

//	if (oExpr.items.length == 1)
//		return oExpr.items[0];

	//
	return oExpr;
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