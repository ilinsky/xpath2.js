/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXTItem() {

};

// Utilities
function fXTItem_atomize(oItem, oContext) {
	// Untyped
	if (oItem == null)
		return null;

	// Node type
	if (oContext.DOMAdapter.isNode(oItem)) {
		var fGetProperty	= oContext.DOMAdapter.getProperty;
		switch (fGetProperty(oItem, "nodeType")) {
			case 1:	// ELEMENT_NODE
				return new cXSUntypedAtomic(fGetProperty(oItem, "textContent"));

			case 2:	// ATTRIBUTE_NODE
				return new cXSUntypedAtomic(fGetProperty(oItem, "value"));

			case 3:	// TEXT_NODE
			case 4:	// CDATA_SECTION_NODE
			case 8:	// COMMENT_NODE
				return new cXSUntypedAtomic(fGetProperty(oItem, "data"));

			case 7:	// PROCESSING_INSTRUCTION_NODE
				return new cXSUntypedAtomic(fGetProperty(oItem, "data"));

			case 9:	// DOCUMENT_NODE
				var oNode	= fGetProperty(oItem, "documentElement");
				return new cXSUntypedAtomic(oNode ? fGetProperty(oNode, "textContent") : '');
		}
	}

	// Base types
	if (oItem instanceof cXSAnyAtomicType)
		return oItem;

	// Other types
	return null;
};