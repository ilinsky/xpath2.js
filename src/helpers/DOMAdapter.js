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

// Node interface
cDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

cDOMAdapter.getProperty	= function(oNode, sName) {
	switch (sName) {
		// Node
		case "baseURI":
		case "textContent":
		case "nodeType":
		case "firstChild":
		case "lastChild":
		case "nextSibling":
		case "previousSibling":
		case "parentNode":
		case "ownerDocument":
			return oNode[sName];
		// Text
		case "wholeText":

		// Attribute
		case "ownerElement":

		// Element
		case "attributes":

		// Document
		case "documentElement":
	}
};

cDOMAdapter.isNameNode	= function(oNode, oNode2) {

};

cDOMAdapter.compareDocumentPosition	= function(oNode, oNode2) {

};

cDOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {

};

cDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {

};