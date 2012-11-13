/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2DOMAdapter() {
	throw "Illegal constructor";
};

// Custom members
cXPath2DOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

cXPath2DOMAdapter.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
cXPath2DOMAdapter.isSameNode	= function(oNode, oNode2) {
	return oNode.isSameNode(oNode2);
};

cXPath2DOMAdapter.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

cXPath2DOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {
	return oNode.lookupPrefix(sNameSpaceURI);
};

cXPath2DOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
cXPath2DOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};
