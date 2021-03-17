var cException = require('./../classes/Exception');
var cSequence = require('./../classes/Sequence');

var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSAnyURI = require('./../types/schema/simple/atomic/XSAnyURI');
var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSQName = require('./../types/schema/simple/atomic/XSQName');

/*
	2 Accessors
		node-name
		nilled
		string
		data
		base-uri
		document-uri

*/

// fn:node-name($arg as node()?) as xs:QName?
function fNodeName(oNode) {
	if (oNode != null) {
		var fGetProperty	= this.DOMAdapter.getProperty;
		switch (fGetProperty(oNode, "nodeType")) {
			case 1:		// ELEMENT_NAME
			case 2:		// ATTRIBUTE_NODE
				return new cXSQName(fGetProperty(oNode, "prefix"), fGetProperty(oNode, "localName"), fGetProperty(oNode, "namespaceURI"));
			case 5:		// ENTITY_REFERENCE_NODE
				throw "Not implemented";
			case 6:		// ENTITY_NODE
				throw "Not implemented";
			case 7:		// PROCESSING_INSTRUCTION_NODE
				return new cXSQName(null, fGetProperty(oNode, "nodeName"), null); // same as "target"
			case 10:	// DOCUMENT_TYPE_NODE
				return new cXSQName(null, fGetProperty(oNode, "name"), null);
		}
	}
	//
	return null;
};

// fn:nilled($arg as node()?) as xs:boolean?
function fNilled(oNode) {
	if (oNode != null) {
		if (this.DOMAdapter.getProperty(oNode, "nodeType") == 1)
			return new cXSBoolean(false);	// TODO: Determine if node is nilled
	}
	//
	return null;
};

// fn:string() as xs:string
// fn:string($arg as item()?) as xs:string
function fString(/*[*/oItem/*]*/) {
	if (!arguments.length) {
		if (!this.item)
			throw new cException("XPDY0002");
		oItem	= this.item;
	}
	return oItem == null ? new cXSString('') : cXSString.cast(cSequence.atomize([oItem], this)[0]);
};

// fn:data($arg as item()*) as xs:anyAtomicType*
function fData(oSequence) {
	return cSequence.atomize(oSequence, this);
};

// fn:base-uri() as xs:anyURI?
// fn:base-uri($arg as node()?) as xs:anyURI?
function fBaseUri(oNode) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "base-uri() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}
	//
	return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oNode, "baseURI") || ''));
};

// fn:document-uri($arg as node()?) as xs:anyURI?
function fDocumentUri(oNode) {
	if (oNode != null) {
		var fGetProperty	= this.DOMAdapter.getProperty;
		if (fGetProperty(oNode, "nodeType") == 9)
			return cXSAnyURI.cast(new cXSString(fGetProperty(oNode, "documentURI") || ''));
	}
	//
	return null;
};

module.exports = {
    fNodeName: fNodeName,
    fNilled: fNilled,
    fString: fString,
    fData: fData,
    fBaseUri: fBaseUri,
    fDocumentUri: fDocumentUri
};