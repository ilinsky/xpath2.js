/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cParenthesizedExpr(oExpr) {
	this.expression	= oExpr;
};

// Public members
cParenthesizedExpr.prototype.evaluate	= function (oContext) {
	return this.expression ? this.expression.evaluate(oContext) : [];
};

//
module.exports = cParenthesizedExpr;
