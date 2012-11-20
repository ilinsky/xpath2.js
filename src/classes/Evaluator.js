/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cEvaluator() {

};

cEvaluator.prototype.defaultStaticContext	= new cStaticContext;

cEvaluator.prototype.compile	= function(sExpression, oStaticContext) {
	return new cExpression(sExpression, oStaticContext || this.defaultStaticContext);
};

cEvaluator.prototype.resolve	= function(sExpression, vItem, oStaticContext, oScope, oDOMAdapter) {
	if (!oStaticContext)
		oStaticContext	= this.defaultStaticContext;
	return this.compile(sExpression, oStaticContext).resolve(new cDynamicContext(oStaticContext, typeof vItem == "undefined" ? null : vItem, oScope, oDOMAdapter));
};