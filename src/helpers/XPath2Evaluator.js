/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Evaluator() {
	this.cache	= {};
	this.defaultStaticContext	= new cXPath2StaticContext;
};

cXPath2Evaluator.prototype.cache	= null;
cXPath2Evaluator.prototype.defaultStaticContext	= null;

cXPath2Evaluator.prototype.compile	= function(sExpression, oStaticContext) {
	return this.cache[sExpression] || (this.cache[sExpression] = new cXPath2Expression(sExpression, oStaticContext || this.defaultStaticContext));
};

cXPath2Evaluator.prototype.evaluate	= function(sExpression, vItem, oStaticContext, oScope) {
	return this.compile(sExpression, oStaticContext || this.defaultStaticContext).evaluate(vItem, oScope).items;
};