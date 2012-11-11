/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

// partially implements: net.sf.saxon.expr.StaticContext, net.sf.saxon.om.NamespaceResolver
function cXPath2StaticContext() {

};

cXPath2StaticContext.prototype	= new cAbstractStaticContext;
cXPath2StaticContext.prototype.namespaceContext	= null;
cXPath2StaticContext.prototype.XPathVariableResolver	= null;
cXPath2StaticContext.prototype.XPathFunctionResolver	= null;

//
cXPath2StaticContext.prototype.getNamespaceContext	= function() {
	return this.namespaceContext;
};

cXPath2StaticContext.prototype.setNamespaceContext	= function(/* javax.xml.namespace.NamespaceContext */ oNamespaceContext) {
	this.namespaceContext	= oNamespaceContext;
};

cXPath2StaticContext.prototype.getXPathVariableResolver	= function() {
	return this.XPathVariableResolver;
};

cXPath2StaticContext.prototype.setXPathVariableResolver	= function(vResolver) {
	this.XPathVariableResolver	= vResolver;
};

cXPath2StaticContext.prototype.getXPathFunctionResolver	= function() {
	return this.XPathFunctionResolver;
};

cXPath2StaticContext.prototype.setXPathFunctionResolver	= function(vResolver) {
	this.XPathFunctionResolver	= vResolver;
};

// implements: net.sf.saxon.expr.StaticContext
/*cXPath2StaticContext.prototype.setNamespaceResolver	= function(vResolver) {
	this.namespaceResolver	= vResolver;
};*/

cXPath2StaticContext.prototype.getNamespaceResolver	= function() {
	return this.namespaceResolver;
};

cXPath2StaticContext.prototype.getURIForPrefix	= function(sPrefix/*[*/, bUseDefault/*]*/) {
	return this.namespaceResolver.getURIForPrefix(sPrefix, bUseDefault);
};