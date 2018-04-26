/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cDOMAdapter() {

};

// Custom members
cDOMAdapter.prototype.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

cDOMAdapter.prototype.getProperty	= function(oNode, sName) {
	return oNode[sName];
};

// Standard members
cDOMAdapter.prototype.isSameNode	= function(oNode, oNode2) {
	return oNode == oNode2;
};

cDOMAdapter.prototype.compareDocumentPosition	= function(oNode, oNode2) {
	return oNode.compareDocumentPosition(oNode2);
};

cDOMAdapter.prototype.lookupNamespaceURI	= function(oNode, sPrefix) {
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
cDOMAdapter.prototype.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};

// Element/Document object members
cDOMAdapter.prototype.getElementsByTagNameNS	= function(oNode, sNameSpaceURI, sLocalName) {
	return oNode.getElementsByTagNameNS(sNameSpaceURI, sLocalName);
};

//
module.exports = cDOMAdapter;
