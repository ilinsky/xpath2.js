/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAdditiveExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cAdditiveExpr.prototype.left	= null;
cAdditiveExpr.prototype.items	= null;

//
cAdditiveExpr.operators	={};

cAdditiveExpr.operators['+']	= function(oLeft, oRight) {
	return fFunctionCall_number_add(oLeft, oRight);
};
cAdditiveExpr.operators['-']	= function (oLeft, oRight) {
	return fFunctionCall_number_subtract(oLeft, oRight);
};

// Static members
cAdditiveExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cAdditiveExpr.operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cAdditiveExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oResolver)))
			throw "AdditiveExpr.parse: right operand missing";
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

// Public members
cAdditiveExpr.prototype.evaluate	= function (oContext) {
	var oValue	= cXPath2Sequence.atomize(this.left.evaluate(oContext)).items[0];
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oValue	= cAdditiveExpr.operators[this.items[nIndex][0] == '-' ? '-' : '+'](oValue, cXPath2Sequence.atomize(this.items[nIndex][1].evaluate(oContext)).items[0]);
	return new cXPath2Sequence(oValue);
};