/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNameTest(sPrefix, sLocalName) {
	this.prefix		= sPrefix;
	this.localName	= sLocalName;
};

cNameTest.QNAME	= /^(?:([\w-]+|\*):)?([\w-]+|\*)$/i;

cNameTest.prototype	= new cNodeTest;

cNameTest.prototype.prefix		= null;
cNameTest.prototype.localName	= null;

// Static members
cNameTest.parse	= function (oLexer) {
	if (oLexer.peek().match(cNameTest.QNAME)) {
		oLexer.next();
		return new cNameTest(cRegExp.$1 || null, cRegExp.$2 || null);
	}
};

// Public members
cNameTest.prototype.test	= function (oNode, fResolver) {
	return oNode.nodeType == 1 && (this.localName == '*' || oNode.localName == this.localName)/* && oNode.lookupNamespaceUri(oNode.prefix) == fResolver(this.prefix)*/;
};