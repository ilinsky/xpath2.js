/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../../classes/StaticContext');

function cUnionExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cUnionExpr.prototype.left	= null;
cUnionExpr.prototype.items	= null;

// Public members
cUnionExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.left.evaluate(oContext);
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= cStaticContext.operators["union"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
	return oSequence;
};

//
module.exports = cUnionExpr;
