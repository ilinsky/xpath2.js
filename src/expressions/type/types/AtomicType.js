/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAtomicType(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cAtomicType.RegExp	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cAtomicType.prototype.prefix		= null;
cAtomicType.prototype.localName		= null;
cAtomicType.prototype.namespaceURI	= null;

cAtomicType.parse	= function(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(cAtomicType.RegExp);
	if (aMatch) {
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw "AtomicType.parse: illegal wildcard value";
		oLexer.next();
		return new cAtomicType(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
	}
};

cAtomicType.prototype.test	= function(vItem, oContext) {
	// Test
	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName,
		cType	= this.namespaceURI == "http://www.w3.org/2001/XMLSchema" ? hXPath2StaticContext_dataTypes[this.localName] : oContext.staticContext.getDataType(sUri);
	if (cType)
		return vItem instanceof cType;
	//
	throw new cXPath2Error("XPST0051"
//->Debug
			, "Unknown simple type " + (this.prefix ? this.prefix + ':' : '') + this.localName
//<-Debug
	);
};

cAtomicType.prototype.cast	= function(vItem, oContext) {
	// Cast
	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName,
		cType	= this.namespaceURI == "http://www.w3.org/2001/XMLSchema" ? hXPath2StaticContext_dataTypes[this.localName] : oContext.staticContext.getDataType(sUri);
	if (cType)
		return cType.cast(vItem);
	//
	throw new cXPath2Error("XPST0051"
//->Debug
			, "Unknown simple type " + (this.prefix ? this.prefix + ':' : '') + this.localName
//<-Debug
	);
};