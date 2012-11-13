/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oMSXMLDOMAdapter	= new cXPath2.classes.DOMAdapter;
/*
// Custom members
oMSXMLDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

oMSXMLDOMAdapter.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
oMSXMLDOMAdapter.isSameNode	= function(oNode, oNode2) {
	return oNode.isSameNode(oNode2);
};

oMSXMLDOMAdapter.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

oMSXMLDOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {
	return oNode.lookupPrefix(sNameSpaceURI);
};

oMSXMLDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
oMSXMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};
*/
