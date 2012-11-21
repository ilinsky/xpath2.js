/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oMSXMLDOMAdapter	= new cMSDOMAdapter;

//
oMSXMLDOMAdapter.getProperty	= function(oNode, sName) {
	if (sName == "localName")
		return oNode.nodeType == 7 ? null : oNode.baseName;
	if (sName == "prefix" || sName == "namespaceURI")
		return oNode[sName] || null;
	if (sName == "textContent")
		return oNode.text;
	return oNode[sName];
};

// Document object members
oMSXMLDOMAdapter.getElementById	= function(oDocument, sId) {
	return oDocument.nodeFromID(sId);
};

/*oMSXMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.selectSingleNode('/' + '/' + '*[@id="' + sId + '"]');
};*/

oMSXMLDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	for (; oNode && oNode.nodeType != 9 /* cNode.DOCUMENT_NODE */ ; oNode = oNode.parentNode)
		if (sPrefix ==(oNode.prefix || null))	// IE uses empty string instead of null for no prefix values
			return oNode.namespaceURI;
		else
		if (oNode.nodeType == 1)	// cNode.ELEMENT_NODE
			for (var oAttributes = oNode.attributes, nIndex = 0, nLength = oAttributes.length, sName = "xmlns:" + sPrefix; nIndex < nLength; nIndex++)
				if (oAttributes[nIndex].nodeName == sName)
					return oAttributes[nIndex].nodeValue;
	return null;
};

// Element/Document object members
oMSXMLDOMAdapter.getElementsByTagNameNS	= function(oNode, sNameSpaceURI, sLocalName) {
	return oNode.getElementsByTagNameNS(sNameSpaceURI, sLocalName);
};
