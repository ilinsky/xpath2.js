/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

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
cStaticContext.prototype.setDataType		= function(sUri, fFunction) {
	this.dataTypes[sUri]	= fFunction;
};

cStaticContext.prototype.getDataType		= function(sUri) {
	return this.dataTypes[sUri];
};

cStaticContext.prototype.setDocument		= function(sUri, fFunction) {
	this.documents[sUri]	= fFunction;
};

cStaticContext.prototype.setFunction		= function(sUri, fFunction) {
	this.functions[sUri]	= fFunction;
};

cStaticContext.prototype.getFunction		= function(sUri) {
	return this.functions[sUri];
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

cStaticContext.prototype.getURIForPrefix	= function(sPrefix) {
	var oResolver	= this.namespaceResolver,
		fResolver	= oResolver && oResolver.lookupNamespaceURI ? oResolver.lookupNamespaceURI : oResolver,
		sNameSpaceURI;
	if (fResolver instanceof cFunction && (sNameSpaceURI = fResolver.call(oResolver, sPrefix)))
		return sNameSpaceURI;
	if (sPrefix == 'fn')
		return "http://www.w3.org/2005/xpath-functions";
	if (sPrefix == 'xs')
		return "http://www.w3.org/2001/XMLSchema";
	if (sPrefix == "xml")
		return "http://www.w3.org/XML/1998/namespace";
	//
	throw new cException("XPST0081"
//->Debug
				, "Prefix '" + sPrefix + "' has not been declared"
//<-Debug
	);
};

// System functions with signatures, operators and types
var hStaticContext_functions	= {},
	hStaticContext_signatures	= {},
	hStaticContext_dataTypes	= {},
	hStaticContext_operators	= {};

function fStaticContext_defineSystemFunction(sName, aParameters, fFunction) {
	// Register function
	hStaticContext_functions[sName]	= fFunction;
	// Register signature
	hStaticContext_signatures[sName]	= aParameters;
};

function fStaticContext_defineSystemDataType(sName, fFunction) {
	// Register dataType
	hStaticContext_dataTypes[sName]	= fFunction;
};
