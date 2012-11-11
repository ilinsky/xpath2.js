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

cXPath2Evaluator.prototype.staticContext		= null;
cXPath2Evaluator.prototype.defaultStaticContext	= new cXPath2StaticContext;
cXPath2Evaluator.prototype.dynamicContext		= null;	// XPath2DynamicContext

// javax.xml.xpath.XPath
// throws XPath2ExpressionException
cXPath2Evaluator.prototype.compile	= function(sExpression) {
	return oExpression;
};

// throws XPath2ExpressionException
cXPath2Evaluator.prototype.evaluate	= function(sExpression, oNode, nType) {

};

cXPath2Evaluator.prototype.reset	= function() {

};
/*
cXPath2Evaluator.prototype.setNamespaceContext	= function(oNamespaceContext) {
	this.staticContext.setNamespaceContext(oNamespaceContext);
};

cXPath2Evaluator.prototype.getNamespaceContext	= function() {
	return this.staticContext.getNamespaceContext();
};

cXPath2Evaluator.prototype.setXPathFunctionResolver	= function(fResolver) {
	this.staticContext.setXPathFunctionResolver(fResolver);
};

cXPath2Evaluator.prototype.getXPathFunctionResolver	= function() {
	return this.staticContext.getXPathFunctionResolver();
};

cXPath2Evaluator.prototype.setXPathVariableResolver	= function(fResolver) {
	this.staticContext.setXPathVariableResolver(fResolver);
};

cXPath2Evaluator.prototype.getXPathVariableResolver	= function() {
	return this.staticContext.getXPathVariableResolver();
};
*/
// XPath2Evaluator own members
cXPath2Evaluator.prototype.setStaticContext	= function(oStaticContext) {
	this.staticContext	= oStaticContext;
};

cXPath2Evaluator.prototype.getStaticContext	= function() {
	return this.staticContext;
};