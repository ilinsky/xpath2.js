function cXPathDOMInterface() {
	throw "Illegal constructor";
};

// Node interface
cXPathDOMInterface.isNode		= function(oNode) {
	return oNode &&!!oNode.nodeType;
};

cXPathDOMInterface.getProperty	= function(oNode, sName) {
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

cXPathDOMInterface.compareDocumentPosition	= function(oNode, oNode2) {

};

cXPathDOMInterface.lookupPrefix	= function(oNode, sNameSpaceURI) {

};

cXPathDOMInterface.lookupNamespaceURI	= function(oNode, sPrefix) {

};