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
function fFilterExpr_parse (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fPrimaryExpr_parse(oLexer, oStaticContext)))
		return;

	var oFilterExpr	= new cFilterExpr(oExpr);
	// Parse predicates
	fStepExpr_parsePredicates(oLexer, oStaticContext, oFilterExpr);

	// If no predicates found
	if (oFilterExpr.predicates.length == 0)
		return oFilterExpr.expression;

	return oFilterExpr;
};

// Public members
cFilterExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.expression.evaluate(oContext);
	if (this.predicates.length && oSequence.items.length)
		oSequence	= cStepExpr.prototype.applyPredicates.call(this, oContext, oSequence);
	return oSequence;
};