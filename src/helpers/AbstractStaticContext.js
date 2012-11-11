/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

// net.sf.saxon.sxpath.AbstractStaticContext
function cAbstractStaticContext() {

};
cAbstractStaticContext.prototype.baseURI	= null;
cAbstractStaticContext.prototype.collationMap	= null;
cAbstractStaticContext.prototype.defaultCollationName	= null;
cAbstractStaticContext.prototype.defaultElementNamespace	= null;
cAbstractStaticContext.prototype.defaultFunctionNamespace	= null;
cAbstractStaticContext.prototype.namespaceResolver	= null;

// implements: net.sf.saxon.expr.StaticContext
cAbstractStaticContext.prototype.getBaseURI	= function() {
	return this.baseURI;
};

// Collation works..
cAbstractStaticContext.prototype.getColation	= function(sName) {

};

cAbstractStaticContext.prototype.getConfiguration	= function() {

};

cAbstractStaticContext.prototype.getDefaultCollationName	= function() {
	return "http://www.w3.org/2005/xpath-functions/collation/codepoint";
};

//
cAbstractStaticContext.prototype.getDefaultElementNamespace	= function() {
	return this.defaultElementNamespace;
};

cAbstractStaticContext.prototype.getDefaultFunctionNamespace	= function() {
	return this.defaultFunctionNamespace;
};


// Returns NamespaceResolver
cAbstractStaticContext.prototype.getNamespaceResolver	= function() {

};

// own members
cXPath2StaticContext.prototype.setBaseURI	= function(sUri) {
	this.baseURI	= sUri;
};

cAbstractStaticContext.prototype.setCollationMap	= function(/* net.sf.saxon.expr.CollationMap */ oCollationMap) {

};

cAbstractStaticContext.prototype.getCollationMap	= function() {

};

cAbstractStaticContext.prototype.setDefaultElementNamespace	= function(sUri) {
	this.defaultElementNamespace	= sUri;
};

cAbstractStaticContext.prototype.setDefaultFunctionNamespace	= function(sUri) {
	this.defaultFunctionNamespace	= sUri;
};

