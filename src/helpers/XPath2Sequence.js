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

cXPath2Sequence.atomize		= function(oSequence) {
	return new cXPath2Sequence(oSequence);
};

cXPath2Sequence.atomizeItem		= function(oItem) {
	if (oItem == null || typeof oItem == "undefined")
		return null;
	else
	if (typeof oItem == "boolean" || typeof oItem == "number" || typeof oItem == "string")
		return oItem;
	else
	if (oItem.nodeType)
		return oItem.nodeValue ? oItem.nodeValue : "aaa" /*get_text_content(oItem)*/;
	else
		return null;
};

// Public members
cXPath2Sequence.prototype.add	= function(oItem) {
	if (oItem instanceof cXPath2Sequence)
		for (var nIndex = 0; nIndex < oItem.items.length; nIndex++)
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
	else
	if (this.items[0].nodeType)	// TODO: add proper check for node using instanceof
		return true;
	else
	if (this.items.length == 1) {
		if (typeof this.items[0] == "boolean")
			return this.items[0];
		else
		if (typeof this.items[0] == "string")
			return !!this.items[0].length;
		else
		if (typeof this.items[0] == "number")
			return !(fIsNaN(this.items[0]) || this.items[0] == 0);
	}

	throw "TypeError in XPathSequence.prototype.toBoolean";
};

cXPath2Sequence.prototype.toNumber	= function() {
	return this.items.length && typeof this.items[0] == "number" ? this.items[0] : nNaN;
};

// Orders items in sequence in document order
cXPath2Sequence.prototype.order		= function() {

};

// Reverses items order in sequence
cXPath2Sequence.prototype.reverse	= function() {

};