/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cMultiplicativeExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cMultiplicativeExpr.prototype.left	= null;
cMultiplicativeExpr.prototype.items	= null;

//
cMultiplicativeExpr.operators	={};

cMultiplicativeExpr.operators['*']		= function (oLeft, oRight) {
	return fFunctionCall_number_multiply(oLeft, oRight);
};
cMultiplicativeExpr.operators['div']	= function (oLeft, oRight) {
	return fFunctionCall_number_divide(oLeft, oRight);
};
cMultiplicativeExpr.operators['idiv']	= function (oLeft, oRight) {
	return ~~(oLeft / oRight);
};
cMultiplicativeExpr.operators['mod']	= function (oLeft, oRight) {
	return oLeft % oRight;
};

// Static members
cMultiplicativeExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cUnionExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cMultiplicativeExpr.operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cMultiplicativeExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cUnionExpr.parse(oLexer, oResolver)))
			throw "MultiplicativeExpr.parse: right operand missing";
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

// Public members
cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
	var oValue	= cXPath2Sequence.atomize(this.left.evaluate(oContext)).items[0];
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oValue	= cMultiplicativeExpr.operators[this.items[nIndex][0]](oValue, cXPath2Sequence.atomize(this.items[nIndex][1].evaluate(oContext)).items[0]);
	return new cXPath2Sequence(oValue);
};