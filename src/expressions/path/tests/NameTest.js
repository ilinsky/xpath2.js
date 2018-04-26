/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNameTest(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cNameTest.prototype.prefix			= null;
cNameTest.prototype.localName		= null;
cNameTest.prototype.namespaceURI	= null;

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

//
module.exports = cNameTest;
