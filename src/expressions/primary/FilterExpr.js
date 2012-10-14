/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cFilterExpr(oPrimary) {
	this.expression	= oPrimary;
	this.predicates	= [];
};

cFilterExpr.prototype.expression	= null;
cFilterExpr.prototype.predicates	= null;

// Static members
cFilterExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cPrimaryExpr.parse(oLexer, oResolver)))
		return;

	var oFilterExpr	= new cFilterExpr(oExpr);
	// Parse predicates
	cStepExpr.parsePredicates(oLexer, oResolver, oFilterExpr);

	// If no predicates found
	if (oFilterExpr.predicates.length == 0)
		return oFilterExpr.expression;

	return oFilterExpr;
};

// Public members
cFilterExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.expression.evaluate(oContext);
	if (oSequence.items.length) {
		oContext.sequence	= oSequence;
		oContext.position	= 1;
		oSequence	= cStepExpr.prototype.applyPredicates.call(this, oContext);
	}
	return oSequence;
};