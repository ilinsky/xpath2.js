/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cExpr() {
	this.items	= [];
};

cExpr.prototype.items	= null;

// Static members
cExpr.parse	= function(oLexer) {
	var oExpr	= new cExpr;
	//
	if (oLexer.eof())
		throw "Expr.parse: Expected ExprSingle expression";
	do {
		oExpr.items.push(cExprSingle.parse(oLexer));
	}
	while (oLexer.peek() == ',' && oLexer.next());
	//
	if (oLexer.peek(-1) == ',')
		throw "Expr.parse: Expected ExprSingle expression";
	//
	return oExpr;
};

// Public members
cExpr.prototype.evaluate	= function(oContext) {
	var aSequence	= new cXPathSequence;
	for (var nIndex = 0; nIndex < this.items.length; nIndex++)
		aSequence.add(this.items[nIndex].evaluate(oContext));
	return aSequence;
};