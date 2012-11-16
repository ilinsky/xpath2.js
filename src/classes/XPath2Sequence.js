/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Sequence(oItem) {
	this.items	= [];
	if (arguments.length)
		this.add(oItem);
};

cXPath2Sequence.prototype.items	= null;

// Static members

// Orders items in sequence in document order
cXPath2Sequence.order		= function(oSequence1, oContext) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	oSequence.items.sort(function(oNode, oNode2) {
		var nPosition	= oContext.DOMAdapter.compareDocumentPosition(oNode, oNode2);
		return nPosition & 2 ? 1 : nPosition & 4 ?-1 : 0;
	});
	return oSequence;
};

cXPath2Sequence.reverse	= function(oSequence1) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	oSequence.items.reverse();
	return oSequence;
};

cXPath2Sequence.atomize		= function(oSequence1, oContext) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length, vValue; nIndex < nLength; nIndex++)
		if ((vValue = cXPath2Sequence.atomizeItem(oSequence1.items[nIndex], oContext)) !== null)
			oSequence.add(vValue);
	return oSequence;
};

cXPath2Sequence.atomizeItem		= function(oItem, oContext) {
	// Untyped
	if (oItem === null)
		return null;

	// Node type
	if (oContext.DOMAdapter.isNode(oItem)) {
		switch (oContext.DOMAdapter.getProperty(oItem, "nodeType")) {
			case 1:	// ELEMENT_NODE
				return new cXSUntypedAtomic(oContext.DOMAdapter.getProperty(oItem, "textContent"));

			case 2:	// ATTRIBUTE_NODE
				return new cXSUntypedAtomic(oContext.DOMAdapter.getProperty(oItem, "value"));

			case 3:	// TEXT_NODE
			case 4:	// CDATA_SECTION_NODE
			case 8:	// COMMENT_NODE
				return new cXSUntypedAtomic(oContext.DOMAdapter.getProperty(oItem, "data"));

			case 7:	// PROCESSING_INSTRUCTION_NODE
				return new cXSUntypedAtomic(oContext.DOMAdapter.getProperty(oItem, "data"));

			case 9:	// DOCUMENT_NODE
				var oNode	= oContext.DOMAdapter.getProperty(oItem, "documentElement");
				return new cXSUntypedAtomic(oNode ? oContext.DOMAdapter.getProperty(oNode, "textContent") : '');
		}
	}

	// Base types
	if (oItem instanceof cXSAnyAtomicType)
		return oItem;

	// Other types
	return null;
};

// Public members
cXPath2Sequence.prototype.add	= function(oItem) {
	if (oItem instanceof cXPath2Sequence)
		for (var nIndex = 0, nLength = oItem.items.length; nIndex < nLength; nIndex++)
			this.items.push(oItem.items[nIndex]);
	else
		this.items.push(oItem);
};

cXPath2Sequence.prototype.isEmpty	= function() {
	return this.items.length == 0;
};

cXPath2Sequence.prototype.isSingleton	= function() {
	return this.items.length == 1;
};

// EBV calculation (fn:boolean())
cXPath2Sequence.prototype.toBoolean	= function(oContext) {
	if (!this.items.length)
		return false;

	var oItem	= this.items[0];
	if (oContext.DOMAdapter.isNode(oItem))
		return true;

	if (this.items.length == 1) {
		if (oItem instanceof cXSBoolean)
			return oItem.value;
		if (oItem instanceof cXSString)
			return !!oItem.value.length;
		if (oItem instanceof cXSDecimal || oItem instanceof cXSDouble || oItem instanceof cXSFloat)
			return !(fIsNaN(oItem.value) || oItem.value == 0);

		throw new cXPath2Error("FORG0006"
//->Debug
				, "Effective boolean value is defined only for sequences containing booleans, strings, numbers, URIs, or nodes"
//<-Debug
		);
	}

	throw new cXPath2Error("FORG0006"
//->Debug
			, "Effective boolean value is not defined for a sequence of two or more items"
//<-Debug
	);
};

cXPath2Sequence.prototype.indexOf	= function(oItem) {
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		if (this.items[nIndex] === oItem)
			return nIndex;
	return -1;
};