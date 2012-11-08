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
cXPath2Sequence.order		= function(oSequence1) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	oSequence.items.sort(function(oNode, oNode2) {
		var nPosition	= cXPath2.DOMAdapter.compareDocumentPosition(oNode, oNode2);
		return nPosition & 2 ? 1 : nPosition & 4 ?-1 : 0;
	});
	return oSequence;
};

cXPath2Sequence.reverse	= function(oSequence1) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	oSequence.items.reverse();
	return oSequence;
};

cXPath2Sequence.atomize		= function(oSequence1) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length, vValue; nIndex < nLength; nIndex++)
		if ((vValue = cXPath2Sequence.atomizeItem(oSequence1.items[nIndex])) !== null)
			oSequence.add(vValue);
	return oSequence;
};

cXPath2Sequence.atomizeItem		= function(oItem) {
	// Untyped
	if (oItem === null || typeof oItem == "undefined")
		return null;

	// Node type
	if (cXPath2.DOMAdapter.isNode(oItem)) {
		switch (cXPath2.DOMAdapter.getProperty(oItem, "nodeType")) {
			case 1:	// ELEMENT_NODE
				return new cXSUntypedAtomic(cXPath2.DOMAdapter.getProperty(oItem, "textContent"));

			case 2:	// ATTRIBUTE_NODE
				return new cXSUntypedAtomic(cXPath2.DOMAdapter.getProperty(oItem, "value"));

			case 3:	// TEXT_NODE
			case 4:	// CDATA_SECTION_NODE
			case 8:	// COMMENT_NODE
				return new cXSUntypedAtomic(cXPath2.DOMAdapter.getProperty(oItem, "data"));

			case 7:	// PROCESSING_INSTRUCTION_NODE
				return new cXSUntypedAtomic(cXPath2.DOMAdapter.getProperty(oItem, "data"));

			case 9:	// DOCUMENT_NODE
				var oNode	= cXPath2.DOMAdapter.getProperty(oItem, "documentElement");
				return new cXSUntypedAtomic(oNode ? cXPath2.DOMAdapter.getProperty(oNode, "textContent") : '');
		}
	}

	// Base types
	if (typeof oItem == "boolean" || typeof oItem == "number" || typeof oItem == "string" || oItem instanceof cXSAnyAtomicType)
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
cXPath2Sequence.prototype.toBoolean	= function() {
	if (!this.items.length)
		return false;

	var oItem	= this.items[0];
	if (cXPath2.DOMAdapter.isNode(oItem))
		return true;

	if (this.items.length == 1) {
		if (typeof oItem == "boolean")
			return oItem;
		else
		if (typeof oItem == "string")
			return !!oItem.length;
		else
		if (typeof oItem == "number")
			return !(fIsNaN(oItem) || oItem == 0);

		throw new cXPath2Error("FORG0006", "Effective boolean value is defined only for sequences containing booleans, strings, numbers, URIs, or nodes");
	}

	throw new cXPath2Error("FORG0006", "Effective boolean value is not defined for a sequence of two or more items");
};

// fn:string()
cXPath2Sequence.prototype.toString	= function() {
	var oItem;
	return this.items.length && (oItem = cXPath2Sequence.atomizeItem(this.items[0])) !== null ? '' + oItem : '';
};

cXPath2Sequence.prototype.indexOf	= function(oItem) {
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		if (this.items[nIndex] === oItem)
			return nIndex;
	return -1;
};