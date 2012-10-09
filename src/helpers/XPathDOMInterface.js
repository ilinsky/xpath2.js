function cXPathDOMInterface(oNode) {
	this.node	= oNode;
};

// Node interface
cXPathDOMInterface.prototype.getProperty	= function(oNode, sName) {
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

cXPathDOMInterface.prototype.compareDocumentPosition	= function(oNode) {

};

cXPathDOMInterface.prototype.lookupPrefix	= function(sNameSpaceURI) {

};

cXPathDOMInterface.prototype.lookupNamespaceURI	= function(sPrefix) {

};