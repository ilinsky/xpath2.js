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

cAdditiveExpr.operators['+']	= {};
cAdditiveExpr.operators['-']	= {};

// Static members
cAdditiveExpr.parse	= function (oLexer, oResolver) {
	var oExpr	= cMultiplicativeExpr.parse(oLexer, oResolver);
	if (oLexer.eof() ||!(oLexer.peek() in cAdditiveExpr.operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cAdditiveExpr.operators) {
		oLexer.next();
		oExpr	= cMultiplicativeExpr.parse(oLexer, oResolver);
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

// Public members
cAdditiveExpr.prototype.evaluate	= function (oContext) {
	var nValue	= this.left.evaluate(oContext).toNumber();
	for (var nIndex = 0; nIndex < this.items.length; nIndex++)
		nValue	+= (this.items[nIndex][0] == '-' ?-1 : 1) * this.items[nIndex][1].evaluate(oContext).toNumber();
	return new cXPathSequence(nValue);
};