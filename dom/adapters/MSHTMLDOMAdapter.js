/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oMSHTMLDOMAdapter	= new cXPath2.classes.DOMAdapter;

// Custom members
/*oMSHTMLDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};*/

oMSHTMLDOMAdapter.getProperty	= function(oNode, sName) {
	if (sName == "localName")
		return oNode.nodeName == '' ? '' : oNode.nodeName.toLowerCase();
	if (sName == "namespaceURI")
		return "http://www.w3.org/1999/xhtml";
	if (sName == "textContent")
		return oNode.innerText;
	if (sName == "attributes") {
		var aAttributes	= [];
		for (var nIndex = 0, oAttributes = oNode.attributes, nLength = oAttributes.length; nIndex < nLength; nIndex++)
			if (oAttributes[nIndex].specified)
				aAttributes[aAttributes.length]	= oAttributes[nIndex];
		return aAttributes;
	}
	return oNode[sName];
};

// Standard members
oMSHTMLDOMAdapter.isSameNode	= function(oNode, oNode2) {
	return oNode == oNode2;
};

oMSHTMLDOMAdapter.compareDocumentPosition	= function(oNode, oChild) {
	if (oChild == oNode)
		return 0;

	var aChain1	= [], nLength1, oNode1,
		aChain2	= [], nLength2, oNode2,
		oElement, nIndex;
	//
	for (oElement = oNode; oElement; oElement = oElement.parentNode)
		aChain1.push(oElement);
	for (oElement = oChild; oElement; oElement = oElement.parentNode)
		aChain2.push(oElement);
	// If nodes are from different documents or if they do not have common top, they are disconnected
	if (((oNode.ownerDocument || oNode) != (oChild.ownerDocument || oChild)) || (aChain1[aChain1.length - 1] != aChain2[aChain2.length - 1]))
		return 32 /* cNode.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC */ | 1 /* cNode.DOCUMENT_POSITION_DISCONNECTED */;
	//
	for (nIndex = Math.min(nLength1 = aChain1.length, nLength2 = aChain2.length); nIndex; --nIndex)
		if ((oNode1 = aChain1[--nLength1]) != (oNode2 = aChain2[--nLength2])) {
			if (!oNode2.nextSibling)
				return 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */;
			if (!oNode1.nextSibling)
				return 2 /* cNode.DOCUMENT_POSITION_PRECEDING */;
			for (oElement = oNode2.previousSibling; oElement; oElement = oElement.previousSibling)
				if (oElement == oNode1)
					return 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */;
			return 2 /* cNode.DOCUMENT_POSITION_PRECEDING */;
		}
	//
	return nLength1 < nLength2 ? 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */ | 16 /* cNode.DOCUMENT_POSITION_CONTAINED_BY */ : 2 /* cNode.DOCUMENT_POSITION_PRECEDING */ | 8 /* cNode.DOCUMENT_POSITION_CONTAINS */;
};

oMSHTMLDOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {
	// TODO
	return oNode.lookupPrefix(sNameSpaceURI);
};

oMSHTMLDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	// TODO
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
/*oMSHTMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
};*/

