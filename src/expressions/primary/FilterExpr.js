/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

// FIXME: var cStepExpr = require('./../path/StepExpr');
var cPrimaryExpr = require('./PrimaryExpr');

function cFilterExpr(oPrimary) {
	this.expression	= oPrimary;
	this.predicates	= [];
};

// FIXME: cFilterExpr.prototype	= new cStepExpr;

cFilterExpr.prototype.expression	= null;

// Static members
cFilterExpr.parse = function(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cPrimaryExpr.parse(oLexer, oStaticContext)))
		return;

	var oFilterExpr	= new cFilterExpr(oExpr);
	// Parse predicates
// FIXME:	cStepExpr.parsePredicates(oLexer, oStaticContext, oFilterExpr);

	// If no predicates found
	if (oFilterExpr.predicates.length == 0)
		return oFilterExpr.expression;

	return oFilterExpr;
};

// Public members
cFilterExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.expression.evaluate(oContext);
	if (this.predicates.length && oSequence.length)
		oSequence	= this.applyPredicates(oSequence, oContext);
	return oSequence;
};

//
module.exports = cFilterExpr;
