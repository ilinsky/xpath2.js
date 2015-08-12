/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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
cStaticContext.prototype.defaultCollationName		= sNS_XPF + "/collation/codepoint";
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
		return aMatch[1] == sNS_XSD ? hStaticContext_dataTypes[aMatch[2]] : this.dataTypes[sUri];
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
		return aMatch[1] == sNS_XPF ? hStaticContext_functions[aMatch[2]] : this.functions[sUri];
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
//Converts non-null JavaScript object to XML Schema object
cStaticContext.js2xs	= function(vItem) {
	// Convert types from JavaScript to XPath 2.0
	if (typeof vItem == "boolean")
		vItem	= new cXSBoolean(vItem);
	else
	if (typeof vItem == "number")
		vItem	=(fIsNaN(vItem) ||!fIsFinite(vItem)) ? new cXSDouble(vItem) : fNumericLiteral_parseValue(cString(vItem));
	else
		vItem	= new cXSString(cString(vItem));
	//
	return vItem;
};

// Converts non-null XML Schema object to JavaScript object
cStaticContext.xs2js	= function(vItem) {
	if (vItem instanceof cXSBoolean)
		vItem	= vItem.valueOf();
	else
	if (fXSAnyAtomicType_isNumeric(vItem))
		vItem	= vItem.valueOf();
	else
		vItem	= vItem.toString();
	//
	return vItem;
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
