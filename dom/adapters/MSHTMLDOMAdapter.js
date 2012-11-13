/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oMSHTMLDOMAdapter	= new cXPath2.classes.DOMAdapter;
/*
// Custom members
oMSHTMLDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

oMSHTMLDOMAdapter.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
oMSHTMLDOMAdapter.isSameNode	= function(oNode, oNode2) {
	return oNode.isSameNode(oNode2);
};

oMSHTMLDOMAdapter.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

oMSHTMLDOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {
	return oNode.lookupPrefix(sNameSpaceURI);
};

oMSHTMLDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
oMSHTMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};
*/
