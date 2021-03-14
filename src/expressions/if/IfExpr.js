/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cSequence = require('./../../classes/Sequence');

function cIfExpr(oCondExpr, oThenExpr, oElseExpr) {
	this.condExpr	= oCondExpr;
	this.thenExpr		= oThenExpr;
	this.elseExpr		= oElseExpr;
};

cIfExpr.prototype.condExpr	= null;
cIfExpr.prototype.thenExpr	= null;
cIfExpr.prototype.elseExpr	= null;

// Public members
cIfExpr.prototype.evaluate	= function (oContext) {
	return this[cSequence.toEBV(this.condExpr.evaluate(oContext), oContext) ? "thenExpr" : "elseExpr"].evaluate(oContext);
};

//
module.exports = cIfExpr;
