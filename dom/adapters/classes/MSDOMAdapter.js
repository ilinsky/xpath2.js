/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cMSDOMAdapter() {

};

cMSDOMAdapter.prototype	= new cXPath2.classes.DOMAdapter;

// Standard members
cMSDOMAdapter.prototype.getProperty	= function(oNode, sName) {
//	if (sName == "baseURI") {
//		var sBaseURI	= '';
//		for (var oParent = oNode, sUri; oParent; oParent = oParent.parentNode)
//			if (oParent.nodeType == 1 /* cNode.ELEMENT_NODE */ && (sUri = oParent.getAttribute("xml:base")))
//				sBaseURI	= _resolve_uri_(sUri, sBaseURI);
//		return sBaseURI;
//	}
	return oNode[sName];
};

cMSDOMAdapter.prototype.isSameNode	= function(oNode, oNode2) {
	return oNode == oNode2;
};

cMSDOMAdapter.prototype.compareDocumentPosition	= function(oNode, oChild) {
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

cMSDOMAdapter.prototype.lookupNamespaceURI	= function(oNode, sPrefix) {
	for (; oNode && oNode.nodeType != 9 /* cNode.DOCUMENT_NODE */ ; oNode = oNode.parentNode)
		if (sPrefix == this.getProperty(oChild, "prefix"))
			return this.getProperty(oNode, "namespaceURI");
		else
		if (oNode.nodeType == 1)	// cNode.ELEMENT_NODE
			for (var oAttributes = this.getProperty(oNode, "attributes"), nIndex = 0, nLength = oAttributes.length, sName = "xmlns:" + sPrefix; nIndex < nLength; nIndex++)
				if (this.getProperty(oAttributes[nIndex], "nodeName") == sName)
					return this.getProperty(oAttributes[nIndex], "value");
	return null;
};

// Element/Document object members
cMSDOMAdapter.prototype.getElementsByTagNameNS	= function(oNode, sNameSpaceURI, sLocalName) {
	var aElements	= [],
		bNameSpaceURI	= '*' == sNameSpaceURI,
		bLocalName		= '*' == sLocalName;
	(function(oNode) {
		for (var nIndex = 0, oChild; oChild = oNode.childNodes[nIndex]; nIndex++)
			if (oChild.nodeType == 1) {	// cNode.ELEMENT_NODE
				if ((bLocalName || sLocalName == this.getProperty(oChild, "localName")) && (bNameSpaceURI || sNameSpaceURI == this.getProperty(oChild, "namespaceURI")))
					aElements[aElements.length]	= oChild;
				if (oChild.firstChild)
					arguments.callee(oChild);
			}
	})(oNode);
	return aElements;
};
