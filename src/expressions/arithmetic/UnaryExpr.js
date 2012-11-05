/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cUnaryExpr(sOperator, oExpr) {
	this.operator	= sOperator;
	this.expression	= oExpr;
};

cUnaryExpr.prototype.operator	= null;
cUnaryExpr.prototype.expression	= null;

//
cUnaryExpr.operators	= {};
cUnaryExpr.operators['-']	= function(oRight) {
	if (typeof oRight == "number")
		return cFunctionCall.operators["numeric-unary-minus"](oRight);
	//
	throw new cXPath2Error("XPTY0004");	// Required item type of operand of '-' is numeric; supplied value has item type {type1}
};
cUnaryExpr.operators['+']	= function(oRight){
	if (typeof oRight == "number")
		return cFunctionCall.operators["numeric-unary-plus"](oRight);
	//
	throw new cXPath2Error("XPTY0004");	// Required item type of operand of '-' is numeric; supplied value has item type {type1}
};

// Static members
// UnaryExpr	:= ("-" | "+")* ValueExpr
cUnaryExpr.parse	= function (oLexer, oResolver) {
	if (oLexer.eof())
		return;
	if (!(oLexer.peek() in cUnaryExpr.operators))
		return cValueExpr.parse(oLexer, oResolver);

	// Unary expression
	var sOperator	= '+',
		oExpr;
	while (oLexer.peek() in cUnaryExpr.operators) {
		if (oLexer.peek() == '-')
			sOperator	= sOperator == '-' ? '+' : '-';
		oLexer.next();
	}
	if (oLexer.eof() ||!(oExpr = cValueExpr.parse(oLexer, oResolver)))
		throw "UnaryExpr.parse: Expected ValueExpr expression";
	return new cUnaryExpr(sOperator, oExpr);
};

cUnaryExpr.prototype.evaluate	= function (oContext) {
	var oRight	= cXPath2Sequence.atomize(this.expression.evaluate(oContext));

	//
	if (oRight.isEmpty())
		return new cXPath2Sequence;
	if (!oRight.isSingleton())
		throw new cXPath2Error("XPTY0004");

	var vRight	= oRight.items[0];
	if (vRight instanceof cXSUntypedAtomic)
		vRight	=+vRight;	// cast to xs:double

	return new cXPath2Sequence(cUnaryExpr.operators[this.operator](vRight));
};