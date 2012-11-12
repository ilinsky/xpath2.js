/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Evaluator() {

};

cXPath2Evaluator.prototype.baseURI	= null;
cXPath2Evaluator.prototype.functionMap	= null;
cXPath2Evaluator.prototype.collationMap	= null;
cXPath2Evaluator.prototype.defaultCollationName	= null;
cXPath2Evaluator.prototype.defaultElementNamespace	= null;
cXPath2Evaluator.prototype.defaultFunctionNamespace	= null;

// throws XPath2ExpressionException
cXPath2Evaluator.prototype.compile	= function(sExpression, fResolver) {
	return oExpression;
};

// throws XPath2ExpressionException
cXPath2Evaluator.prototype.resolve	= function(sExpression, oContext, oScope) {

};

cXPath2Evaluator.prototype.reset	= function() {

};

// XPath2Evaluator own members
cXPath2Evaluator.prototype.setStaticContext	= function(oStaticContext) {
	this.staticContext	= oStaticContext;
};

cXPath2Evaluator.prototype.getStaticContext	= function() {
	return this.staticContext;
};