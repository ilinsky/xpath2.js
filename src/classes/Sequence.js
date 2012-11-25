/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cSequence(oItem) {
	this.items	= [];
	if (arguments.length)
		this.add(oItem);
};

cSequence.prototype.items	= null;

// Public members
cSequence.prototype.add	= function(oItem) {
	if (oItem instanceof cSequence)
		for (var nIndex = 0, nLength = oItem.items.length; nIndex < nLength; nIndex++)
			this.items.push(oItem.items[nIndex]);
	else
		this.items.push(oItem);
};

cSequence.prototype.isEmpty	= function() {
	return this.items.length == 0;
};

cSequence.prototype.isSingleton	= function() {
	return this.items.length == 1;
};

cSequence.prototype.indexOf	= function(oItem) {
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		if (this.items[nIndex] == oItem)
			return nIndex;
	return -1;
};