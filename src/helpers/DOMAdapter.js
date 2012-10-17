/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cDOMAdapter() {
	throw "Illegal constructor";
};

// Custom members
cDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

cDOMAdapter.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
cDOMAdapter.isNameNode	= function(oNode, oNode2) {
	return oNode.isSameNode(oNode2);
};

cDOMAdapter.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

cDOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {
	return oNode.lookupPrefix(sNameSpaceURI);
};

cDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};