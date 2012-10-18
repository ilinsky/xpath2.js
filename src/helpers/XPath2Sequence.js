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
cXPath2Sequence.reverse	= function(oSequence1) {
	var oSequence	= new cXPath2Sequence();
	oSequence.items	= oSequence1.items.reverse();
	return oSequence;
};

cXPath2Sequence.union		= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	for (var nIndex = 0, nLength = oSequence2.items.length; nIndex < nLength; nIndex++)
		if (oSequence.items.indexOf(oSequence2.items[nIndex]) ==-1)
			oSequence.add(oSequence2.items[nIndex]);
	return oSequence;
};

cXPath2Sequence.except		= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (oSequence2.items.indexOf(oSequence1.items[nIndex]) ==-1)
			oSequence.add(oSequence1.items[nIndex]);
	return oSequence;
};

cXPath2Sequence.intersect	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (oSequence2.items.indexOf(oSequence1.items[nIndex]) >-1)
			oSequence.add(oSequence1.items[nIndex]);
	return oSequence;
};

cXPath2Sequence.atomize		= function(oSequence1) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length, vValue; nIndex < nLength; nIndex++)
		if ((vValue = cXPath2Sequence.atomizeItem(oSequence1.items[nIndex])) !== null)
			oSequence.add(vValue);
	return new cXPath2Sequence(oSequence);
};

cXPath2Sequence.atomizeItem		= function(oItem) {
	// Untyped
	if (oItem == null || typeof oItem == "undefined")
		return null;

	// Node type
	if (cXPath2.DOMAdapter.isNode(oItem)) {
		switch (cXPath2.DOMAdapter.getProperty(oItem, "nodeType")) {
			case 1:	// ELEMENT_NODE
				return cXPath2.DOMAdapter.getProperty(oItem, "textContent");

			case 2:	// ATTRIBUTE_NODE
				return cXPath2.DOMAdapter.getProperty(oItem, "value");

			case 3:	// TEXT_NODE
			case 4:	// CDATA_SECTION_NODE
			case 8:	// COMMENT_NODE
				return cXPath2.DOMAdapter.getProperty(oItem, "data");

			case 7:	// PROCESSING_INSTRUCTION_NODE
				return cXPath2.DOMAdapter.getProperty(oItem, "data");

			case 9:	// DOCUMENT_NODE
				var oNode	= cXPath2.DOMAdapter.getProperty(oItem, "documentElement");
				return oNode ? cXPath2.DOMAdapter.getProperty(oNode, "textContent") : '';
		}
	}

	// Base types
	if (typeof oItem == "boolean" || typeof oItem == "number" || typeof oItem == "string")
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
	if (cXPath2.DOMAdapter.isNode(oItem))	// TODO: add proper check for node using instanceof
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
	}

	throw "TypeError in XPathSequence.prototype.toBoolean";
};

// fn:number()
cXPath2Sequence.prototype.toNumber	= function() {
	if (!this.items.length)
		return nNaN;

	return +cXPath2Sequence.atomizeItem(this.items[0]);
};

// fn:string()
cXPath2Sequence.prototype.toString	= function() {
	if (!this.items.length)
		return '';

	return '' + cXPath2Sequence.atomizeItem(this.items[0]);
};

// Orders items in sequence in document order
cXPath2Sequence.prototype.order		= function() {

};
