/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cSequence(oItem) {
	if (arguments.length)
		this.push(oItem);
};

cSequence.prototype.length	= 0;

// Public members
cSequence.prototype.push	= function(oItem) {
	this[this.length++]	= oItem;
};

cSequence.prototype.indexOf	= function(oItem) {
	for (var nIndex = 0; nIndex < this.length; nIndex++)
		if (this[nIndex] == oItem)
			return nIndex;
	return-1;
};

cSequence.prototype.concat	= function(oSequence1) {
	var oSequence	= new cSequence;
	for (var nIndex = 0; nIndex < this.length; nIndex++)
		oSequence.push(this[nIndex]);
	for (var nIndex = 0; nIndex < oSequence1.length; nIndex++)
		oSequence.push(oSequence1[nIndex]);
	return oSequence;
};

cSequence.prototype.slice	= function(nStart, nEnd) {
	var oSequence	= new cSequence;
	for (var nIndex = nStart; nIndex < nEnd; nIndex++)
		oSequence.push(this[nIndex]);
	return oSequence;
};

cSequence.prototype.sort	= function(fCallback) {
	var aValue	= [];
	for (var nIndex = 0; nIndex < this.length; nIndex++)
		aValue.push(this[nIndex]);
	aValue.sort(fCallback);
	for (var nIndex = 0; nIndex < this.length; nIndex++)
		this[nIndex]	= aValue[nIndex];
	return this;
};

cSequence.prototype.reverse	= function() {
	for (var nIndex = 0, oItem, nLength = this.length / 2; nIndex < nLength; nIndex++) {
		oItem	= this[this.length - nIndex - 1];
		this[this.length - nIndex - 1]	= this[nIndex];
		this[nIndex]	= oItem;
	}
	return this;
};