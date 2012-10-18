/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAtomicType(sNameSpaceURI, sLocalName) {
	this.namespaceURI	= sNameSpaceURI;
	this.localName		= sLocalName;
};

cAtomicType.RegExp	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cAtomicType.prototype.namespaceURI	= null;
cAtomicType.prototype.localName		= null;

cAtomicType.parse	= function(oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cAtomicType.RegExp);
	if (aMatch) {
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw "AtomicType.parse: illegal wildcard value";
		oLexer.next();
		return new cAtomicType(aMatch[1] ? oResolver(aMatch[1]) : null, aMatch[2]);
	}
};