/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNameTest(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cNameTest.RegExp	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cNameTest.prototype	= new cNodeTest;

cNameTest.prototype.prefix			= null;
cNameTest.prototype.localName		= null;
cNameTest.prototype.namespaceURI	= null;

// Static members
cNameTest.parse	= function (oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(cNameTest.RegExp);
	if (aMatch) {
		if (aMatch[1] == '*' && aMatch[2] == '*')
			throw "NameTest.parse: illegal wildcard value";
		oLexer.next();
		return new cNameTest(aMatch[1] || null, aMatch[2], aMatch[1] ? aMatch[1] == '*' ? '*' : oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultElementNamespace);
	}
};

// Public members
cNameTest.prototype.test	= function (oNode, oContext) {
	var nType	= oContext.DOMAdapter.getProperty(oNode, "nodeType"),
		sLocalName		= oContext.DOMAdapter.getProperty(oNode, "localName"),
		sNameSpaceURI	= oContext.DOMAdapter.getProperty(oNode, "namespaceURI");
	return nType == 1 ?
				(this.localName == '*' || sLocalName == this.localName)
					&& (this.namespaceURI == '*' ||(this.namespaceURI ? sNameSpaceURI == this.namespaceURI : true))
				: nType == 2 ?
					(this.localName == '*' || sLocalName == this.localName)
						&& (this.namespaceURI == '*' ||(this.namespaceURI && this.prefix ? sNameSpaceURI == this.namespaceURI : true))
					: false;
};