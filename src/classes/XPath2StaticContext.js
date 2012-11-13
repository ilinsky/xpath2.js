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
	this.collations	= {};
	this.collections= {};
};

cXPath2StaticContext.prototype.baseURI	= null;
//
cXPath2StaticContext.prototype.dataTypes	= null;
cXPath2StaticContext.prototype.documents	= null;
//
cXPath2StaticContext.prototype.functions	= null;
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

cXPath2StaticContext.prototype.setDocument		= function(sUri, fFunction) {
	this.documents[sUri]	= fFunction;
};

cXPath2StaticContext.prototype.setFunction		= function(sUri, fFunction) {
	this.functions[sUri]	= fFunction;
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