var cMath = global.Math;

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

cDOMAdapter.prototype.compareDocumentPosition	= function(oNode, oChild) {
	// Run native if there is one
	if ("compareDocumentPosition" in oNode)
		return oNode.compareDocumentPosition(oChild);

	// Otherwise run JS fallback
	if (oChild == oNode)
		return 0;

	//
	var oAttr1	= null,
		oAttr2	= null,
		aAttributes,
		oAttr, oElement, nIndex, nLength;
	if (this.getProperty(oNode, "nodeType") == 2 /* cNode.ATTRIBUTE_NODE */) {
		oAttr1	= oNode;
		oNode	= this.getProperty(oAttr1, "ownerElement");
	}
	if (this.getProperty(oChild, "nodeType") == 2 /* cNode.ATTRIBUTE_NODE */) {
		oAttr2	= oChild;
		oChild	= this.getProperty(oAttr2, "ownerElement");
	}

	// Compare attributes from same element
	if (oAttr1 && oAttr2 && oNode && oNode == oChild) {
		for (nIndex = 0, aAttributes = this.getProperty(oNode, "attributes"), nLength = aAttributes.length; nIndex < nLength; nIndex++) {
			oAttr	= aAttributes[nIndex];
			if (oAttr == oAttr1)
				return 32 /* cNode.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC */ | 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */;
			if (oAttr == oAttr2)
				return 32 /* cNode.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC */ | 2 /* cNode.DOCUMENT_POSITION_PRECEDING */;
		}
	}

	//
	var aChain1	= [], nLength1, oNode1,
		aChain2	= [], nLength2, oNode2;
	//
	if (oAttr1)
		aChain1.push(oAttr1);
	for (oElement = oNode; oElement; oElement = this.getProperty(oElement, "parentNode"))
		aChain1.push(oElement);
	if (oAttr2)
		aChain2.push(oAttr2);
	for (oElement = oChild; oElement; oElement = this.getProperty(oElement, "parentNode"))
		aChain2.push(oElement);
	// If nodes are from different documents or if they do not have common top, they are disconnected
	if (((this.getProperty(oNode, "ownerDocument") || oNode) != (this.getProperty(oChild, "ownerDocument") || oChild)) || (aChain1[aChain1.length - 1] != aChain2[aChain2.length - 1]))
		return 32 /* cNode.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC */ | 1 /* cNode.DOCUMENT_POSITION_DISCONNECTED */;
	//
	for (nIndex = cMath.min(nLength1 = aChain1.length, nLength2 = aChain2.length); nIndex; --nIndex)
		if ((oNode1 = aChain1[--nLength1]) != (oNode2 = aChain2[--nLength2])) {
			//
			if (this.getProperty(oNode1, "nodeType") == 2 /* cNode.ATTRIBUTE_NODE */)
				return 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */;
			if (this.getProperty(oNode2, "nodeType") == 2 /* cNode.ATTRIBUTE_NODE */)
				return 2 /* cNode.DOCUMENT_POSITION_PRECEDING */;
			//
			if (!this.getProperty(oNode2, "nextSibling"))
				return 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */;
			if (!this.getProperty(oNode1, "nextSibling"))
				return 2 /* cNode.DOCUMENT_POSITION_PRECEDING */;
			for (oElement = this.getProperty(oNode2, "previousSibling"); oElement; oElement = this.getProperty(oElement, "previousSibling"))
				if (oElement == oNode1)
					return 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */;
			return 2 /* cNode.DOCUMENT_POSITION_PRECEDING */;
		}
	//
	return nLength1 < nLength2 ? 4 /* cNode.DOCUMENT_POSITION_FOLLOWING */ | 16 /* cNode.DOCUMENT_POSITION_CONTAINED_BY */ : 2 /* cNode.DOCUMENT_POSITION_PRECEDING */ | 8 /* cNode.DOCUMENT_POSITION_CONTAINS */;
};

cDOMAdapter.prototype.lookupNamespaceURI	= function(oNode, sPrefix) {
	// Run native if there is one
	if ("lookupNamespaceURI" in oNode)
		return oNode.lookupNamespaceURI(sPrefix);

	// Otherwise run JS fallback
	for (; oNode && this.getProperty(oNode, "nodeType") != 9 /* cNode.DOCUMENT_NODE */ ; oNode = this.getProperty(oNode, "parentNode"))
		if (sPrefix == this.getProperty(oNode, "prefix"))
			return this.getProperty(oNode, "namespaceURI");
		else
		if (this.getProperty(oNode, "nodeType") == 1)	// cNode.ELEMENT_NODE
			for (var oAttributes = this.getProperty(oNode, "attributes"), nIndex = 0, nLength = oAttributes.length, sName = "xmlns" + ':' + sPrefix; nIndex < nLength; nIndex++)
				if (this.getProperty(oAttributes[nIndex], "nodeName") == sName)
					return this.getProperty(oAttributes[nIndex], "value");
	return null;
};

// Document object members
cDOMAdapter.prototype.getElementById	= function(oNode, sId) {
	return oNode.getElementById(sId);
	// FIXME: Implement tree walking to lookup id attribute value
};

//
module.exports = cDOMAdapter;
