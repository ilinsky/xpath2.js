/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../classes/StaticContext');

var hStaticContext_operators = cStaticContext.operators;

function cExpr() {
	this.items	= [];
};

cExpr.prototype.items	= null;

// Public members
cExpr.prototype.evaluate	= function(oContext) {
	var oSequence	= [];
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= hStaticContext_operators["concatenate"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
	return oSequence;
};

//
module.exports = cExpr;
