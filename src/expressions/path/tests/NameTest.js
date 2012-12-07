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

cNameTest.prototype	= new cNodeTest;

cNameTest.prototype.prefix			= null;
cNameTest.prototype.localName		= null;
cNameTest.prototype.namespaceURI	= null;

// Static members
var rNameTest	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;
function fNameTest_parse (oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch) {
		if (aMatch[1] == '*' && aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of *:* wildcard in name test"
//<-Debug
			);
		oLexer.next();
		return new cNameTest(aMatch[1] || null, aMatch[2], aMatch[1] ? aMatch[1] == '*' ? '*' : oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultElementNamespace);
	}
};

// Public members
cNameTest.prototype.test	= function (oNode, oContext) {
	var fGetProperty	= oContext.DOMAdapter.getProperty,
		nType	= fGetProperty(oNode, "nodeType");
	if (nType == 1 || nType == 2) {
		if (this.localName == '*')
			return (nType == 1 || (fGetProperty(oNode, "prefix") != "xmlns" && fGetProperty(oNode, "localName") != "xmlns")) && (!this.prefix || fGetProperty(oNode, "namespaceURI") == this.namespaceURI);
		if (this.localName == fGetProperty(oNode, "localName"))
			return this.namespaceURI == '*' || (nType == 2 && !this.prefix && !fGetProperty(oNode, "prefix")) || fGetProperty(oNode, "namespaceURI") == this.namespaceURI;
	}
	//
	return false;
};