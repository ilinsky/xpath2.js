/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNameTest(sNameSpaceURI, sLocalName) {
	this.namespaceURI	= sNameSpaceURI;
	this.localName		= sLocalName;
};

cNameTest.RegExp	= /^(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+|\*)$/;

cNameTest.prototype	= new cNodeTest;

cNameTest.prototype.namespaceURI	= null;
cNameTest.prototype.localName		= null;

// Static members
cNameTest.parse	= function (oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cNameTest.RegExp);
	if (aMatch) {
		oLexer.next();
		return new cNameTest(aMatch[1] ? oResolver(aMatch[1]) : null, aMatch[2]);
	}
};

// Public members
cNameTest.prototype.test	= function (oNode, fResolver) {
	return oNode.nodeType == 1 && (this.localName == '*' || oNode.localName == this.localName)/* && oNode.lookupNamespaceUri(oNode.prefix) == fResolver(this.prefix)*/;
};