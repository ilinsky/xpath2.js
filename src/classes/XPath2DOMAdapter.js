/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2DOMAdapter() {

};

// Custom members
cXPath2DOMAdapter.prototype.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

cXPath2DOMAdapter.prototype.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
cXPath2DOMAdapter.prototype.isSameNode	= function(oNode, oNode2) {
	return oNode.isSameNode(oNode2);
};

cXPath2DOMAdapter.prototype.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

cXPath2DOMAdapter.prototype.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
cXPath2DOMAdapter.prototype.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};

// Element/Document object members
cXPath2DOMAdapter.prototype.getElementsByTagNameNS	= function(oNode, sNameSpaceURI, sLocalName) {
	return oNode.getElementsByTagNameNS(sNameSpaceURI, sLocalName);
};
