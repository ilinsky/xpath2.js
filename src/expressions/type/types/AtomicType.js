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

cAtomicType.parse	= function(oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cAtomicType.RegExp);
	if (aMatch) {
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw "AtomicType.parse: illegal wildcard value";
		oLexer.next();
		return new cAtomicType(aMatch[1] || null, aMatch[2], aMatch[1] ? oResolver(aMatch[1]) : null);
	}
};

cAtomicType.prototype.test	= function(vItem) {
	// Test
	var cTestType	= cFunctionCall.dataTypes[/*'{' + this.namespaceURI + '}' + */this.localName],
		cItemType	= cXSAnyAtomicType.typeOf(vItem);
	if (cTestType)
		return cTestType == cItemType || cItemType.prototype instanceof cTestType;
	//
	throw new cXPath2Error("XPST0051"
//->Debug
			, "Unknown simple type " + (this.prefix ? this.prefix + ':' : '') + this.localName
//<-Debug
	);
};

cAtomicType.prototype.cast	= function(vItem) {
	// Cast
	var cCastType	= cFunctionCall.dataTypes[/*'{' + this.namespaceURI + '}' + */this.localName];
	if (cCastType)
		return cCastType.cast(vItem);
	//
	throw new cXPath2Error("XPST0051"
//->Debug
			, "Unknown simple type " + (this.prefix ? this.prefix + ':' : '') + this.localName
//<-Debug
	);
};