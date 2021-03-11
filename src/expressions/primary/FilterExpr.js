/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStepExpr = require('./../path/StepExpr');

function cFilterExpr(oPrimary) {
	this.expression	= oPrimary;
	this.predicates	= [];
};

cFilterExpr.prototype	= new cStepExpr;
cFilterExpr.prototype.expression	= null;

// Public members
cFilterExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.expression.evaluate(oContext);
	if (this.predicates.length && oSequence.length)
		oSequence	= this.applyPredicates(oSequence, oContext);
	return oSequence;
};

//
module.exports = cFilterExpr;
