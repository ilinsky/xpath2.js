/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../classes/Exception');

var sNS_XPF = require('./../namespaces').NS_XPF;
var sNS_XSD = require('./../namespaces').NS_XSD;
var sNS_XML = require('./../namespaces').NS_XML;
var sNS_XNS = require('./../namespaces').NS_XNS;

var cFunction = global.Function;

function cStaticContext() {
	this.dataTypes	= {};
	this.documents	= {};
	this.functions	= {};
	this.collations	= {};
	this.collections= {};
};

cStaticContext.prototype.baseURI	= null;
//
cStaticContext.prototype.dataTypes	= null;
cStaticContext.prototype.documents	= null;
//
cStaticContext.prototype.functions	= null;
cStaticContext.prototype.defaultFunctionNamespace	= null;
//
cStaticContext.prototype.collations	= null;
cStaticContext.prototype.defaultCollationName		= "http://www.w3.org/2005/xpath-functions/collation/codepoint";
//
cStaticContext.prototype.collections	= null;
//
cStaticContext.prototype.namespaceResolver	= null;
cStaticContext.prototype.defaultElementNamespace	= null;

//
var rStaticContext_uri	= /^(?:\{([^\}]+)\})?(.+)$/;
//
cStaticContext.prototype.setDataType		= function(sUri, fFunction) {
	var aMatch	= sUri.match(rStaticContext_uri);
	if (aMatch)
		if (aMatch[1] != sNS_XSD)
			this.dataTypes[sUri]	= fFunction;
};

cStaticContext.prototype.getDataType		= function(sUri) {
	var aMatch	= sUri.match(rStaticContext_uri);
	if (aMatch)
		return aMatch[1] == sNS_XSD ? cStaticContext.dataTypes[aMatch[2]] : this.dataTypes[sUri];
};

cStaticContext.prototype.setDocument		= function(sUri, fFunction) {
	this.documents[sUri]	= fFunction;
};

cStaticContext.prototype.getDocument		= function(sUri) {
	return this.documents[sUri];
};

cStaticContext.prototype.setFunction		= function(sUri, fFunction) {
	var aMatch	= sUri.match(rStaticContext_uri);
	if (aMatch)
		if (aMatch[1] != sNS_XPF)
			this.functions[sUri]	= fFunction;
};

cStaticContext.prototype.getFunction		= function(sUri) {
	var aMatch	= sUri.match(rStaticContext_uri);
	if (aMatch)
		return aMatch[1] == sNS_XPF ? cStaticContext.functions[aMatch[2]] : this.functions[sUri];
};

cStaticContext.prototype.setCollation		= function(sUri, fFunction) {
	this.collations[sUri]	= fFunction;
};

cStaticContext.prototype.getCollation		= function(sUri) {
	return this.collations[sUri];
};

cStaticContext.prototype.setCollection	= function(sUri, fFunction) {
	this.collections[sUri]	= fFunction;
};

cStaticContext.prototype.getCollection	= function(sUri) {
	return this.collections[sUri];
};

cStaticContext.prototype.getURIForPrefix	= function(sPrefix) {
	var oResolver	= this.namespaceResolver,
		fResolver	= oResolver && oResolver.lookupNamespaceURI ? oResolver.lookupNamespaceURI : oResolver,
		sNameSpaceURI;
	if (fResolver instanceof cFunction && (sNameSpaceURI = fResolver.call(oResolver, sPrefix)))
		return sNameSpaceURI;
	if (sPrefix == 'fn')
		return sNS_XPF;
	if (sPrefix == 'xs')
		return sNS_XSD;
	if (sPrefix == "xml")
		return sNS_XML;
	if (sPrefix == "xmlns")
		return sNS_XNS;
	//
	throw new cException("XPST0081"
//->Debug
				, "Prefix '" + sPrefix + "' has not been declared"
//<-Debug
	);
};

// Static members

// System functions with signatures, operators and types
cStaticContext.functions	= {};
cStaticContext.signatures	= {};
cStaticContext.dataTypes	= {};
cStaticContext.operators	= {};

cStaticContext.defineSystemFunction = function(sName, aParameters, fFunction) {
	// Register function
	cStaticContext.functions[sName]	= fFunction;
	// Register signature
	cStaticContext.signatures[sName]	= aParameters;
};

cStaticContext.defineSystemDataType = function(sName, fFunction) {
	// Register dataType
	cStaticContext.dataTypes[sName]	= fFunction;
};

cStaticContext.defineSystemOperator = function(sName, fFunction) {
	// Register operator function
	cStaticContext.operators[sName]	= fFunction;
};

//
module.exports = cStaticContext;
