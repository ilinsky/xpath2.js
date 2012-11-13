/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2StaticContext() {
	this.dataTypes	= {};
	this.documents	= {};
	this.functions	= {};
	this.signatures	= {};
	this.collations	= {};
	this.collections= {};
};

cXPath2StaticContext.prototype.baseURI	= null;
//
cXPath2StaticContext.prototype.dataTypes	= null;
cXPath2StaticContext.prototype.documents	= null;
//
cXPath2StaticContext.prototype.functions	= null;
cXPath2StaticContext.prototype.signatures	= null;
cXPath2StaticContext.prototype.defaultFunctionNamespace	= null;
//
cXPath2StaticContext.prototype.collations	= null;
cXPath2StaticContext.prototype.defaultCollationName		= null;
//
cXPath2StaticContext.prototype.collections	= null;
//
cXPath2StaticContext.prototype.namespaceResolver	= null;
cXPath2StaticContext.prototype.defaultElementNamespace	= null;
//
cXPath2StaticContext.prototype.DOMAdapter	= cDOMAdapter;

//
cXPath2StaticContext.prototype.setDataType		= function(sUri, fFunction) {
	this.dataTypes[sUri]	= fFunction;
};

cXPath2StaticContext.prototype.getDataType		= function(sUri) {
	return hXPath2StaticContext_dataTypes[sUri] || this.dataTypes[sUri];
};

cXPath2StaticContext.prototype.setDocument		= function(sUri, fFunction) {
	this.documents[sUri]	= fFunction;
};

cXPath2StaticContext.prototype.setFunction		= function(sUri, fFunction) {
	this.functions[sUri]	= fFunction;
};

cXPath2StaticContext.prototype.getFunction		= function(sUri) {
	return this.functions[sUri];
};

cXPath2StaticContext.prototype.getSignature		= function(sUri) {
	return hXPath2StaticContext_signatures[sUri] || this.signatures[sUri];
};

cXPath2StaticContext.prototype.setCollation		= function(sUri, fFunction) {
	this.collations[sUri]	= fFunction;
};

cXPath2StaticContext.prototype.setCollection	= function(sUri, fFunction) {
	this.collections[sUri]	= fFunction;
};

cXPath2StaticContext.prototype.getURIForPrefix	= function(sPrefix) {
	var oResolver	= this.namespaceResolver,
		fResolver	= oResolver && oResolver.lookupNamespaceURI ? oResolver.lookupNamespaceURI : oResolver,
		sNameSpaceURI;
	if (fResolver instanceof cFunction && (sNameSpaceURI = fResolver.call(oResolver, sPrefix)))
		return sNameSpaceURI;
	if (sPrefix == "fn")
		return "http://www.w3.org/2005/xpath-functions";
	if (sPrefix == "xs")
		return "http://www.w3.org/2001/XMLSchema";
	//
	throw new cXPath2Error("XPST0081"
//->Debug
				, "Prefix '" + sPrefix + "' has not been declared"
//<-Debug
	);
};

// System functions with signatures, operators and types
var hXPath2StaticContext_functions	= {},
	hXPath2StaticContext_signatures	= {},
	hXPath2StaticContext_dataTypes	= {},
	hXPath2StaticContext_operators	= {};

function fXPath2StaticContext_defineSystemFunction(sName, aParameters, fFunction) {
	var sUri	= '{' + "http://www.w3.org/2005/xpath-functions" + '}' + sName;
	// Register function
	hXPath2StaticContext_functions[sUri]	= fFunction;
	// Register signature
	hXPath2StaticContext_signatures[sUri]	= aParameters;
};

function fXPath2StaticContext_defineSystemDataType(sName, fFunction) {
	var sUri	= '{' + "http://www.w3.org/2001/XMLSchema" + '}' + sName;
	// Register dataType
	hXPath2StaticContext_dataTypes[sUri]	= fFunction;
};