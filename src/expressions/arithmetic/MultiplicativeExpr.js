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

cMultiplicativeExpr.operators['*']		= {};
cMultiplicativeExpr.operators['div']	= {};
cMultiplicativeExpr.operators['idiv']	= {};
cMultiplicativeExpr.operators['mod']	= {};

// Static members
cMultiplicativeExpr.parse	= function (oLexer) {
	var oExpr	= cUnionExpr.parse(oLexer);
	if (oLexer.eof() ||!(oLexer.peek() in cMultiplicativeExpr.operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cMultiplicativeExpr.operators) {
		oLexer.next();
		oExpr	= cUnionExpr.parse(oLexer);
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

// Public members
cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
	var nValue	= this.left.evaluate(oContext).toNumber(),
		nRight;
	for (var nIndex = 0; nIndex < this.items.length; nIndex++) {
		nRight	= this.items[nIndex][1].evaluate(oContext).toNumber();
		switch (this.items[nIndex][0]) {
			case '*':
				nValue	*= nRight;
				break;
			case 'div':
				nValue	/= nRight;
				break;
			case 'idiv':
				nValue	= ~~(nValue / nRight);
				break;
			case 'mod':
				nValue	%= nRight;
				break;
		}
	}
	return new cXPathSequence(nValue);
};