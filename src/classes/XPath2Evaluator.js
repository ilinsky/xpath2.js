/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Evaluator() {
	this.defaultStaticContext	= new cXPath2StaticContext;
};

cXPath2Evaluator.prototype.defaultStaticContext	= null;

cXPath2Evaluator.prototype.compile	= function(sExpression, oStaticContext) {
	return new cXPath2Expression(sExpression, oStaticContext || this.defaultStaticContext);
};

cXPath2Evaluator.prototype.resolve	= function(sExpression, vItem, oStaticContext, oScope, oDOMAdapter) {
	return this.compile(sExpression, oStaticContext || this.defaultStaticContext).resolve(vItem, oScope, oDOMAdapter);
};