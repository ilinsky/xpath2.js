/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oMSXMLDOMAdapter	= new cXPath2.classes.DOMAdapter;

// Custom members
/*oMSXMLDOMAdapter.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};*/

oMSXMLDOMAdapter.getProperty	= function(oNode, sName) {
	if (sName == "localName")
		return oNode.nodeType == 7 ? null : oNode.baseName;
	if (sName == "textContent")
		return oNode.text;
	return oNode[sName];
};

// Standard members
oMSXMLDOMAdapter.isSameNode	= function(oNode, oNode2) {
	return oNode == oNode2;
};

oMSXMLDOMAdapter.compareDocumentPosition	= function(oNode, oChild) {
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

oMSXMLDOMAdapter.lookupPrefix	= function(oNode, sNameSpaceURI) {
	// TODO
	return oNode.lookupPrefix(sNameSpaceURI);
};

oMSXMLDOMAdapter.lookupNamespaceURI	= function(oNode, sPrefix) {
	// TODO
	return oNode.lookupNamespaceURI(sPrefix);
};

// Document object members
oMSXMLDOMAdapter.getElementById	= function(oDocument, sId) {
	return oDocument.nodeFromID(sId);
};

/*oMSXMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.selectSingleNode('/' + '/' + '*[@id="' + sId + '"]');
};*/
