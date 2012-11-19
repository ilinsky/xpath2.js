/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oW3HTMLDOMAdapter	= new cXPath2.classes.DOMAdapter;
/*
// Custom members
oW3HTMLDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

oW3HTMLDOMAdapter.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
oW3HTMLDOMAdapter.isSameNode	= function(oNode, oNode2) {
	return oNode.isSameNode(oNode2);
};

oW3HTMLDOMAdapter.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

oW3HTMLDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
oW3HTMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};
*/
