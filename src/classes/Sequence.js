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
		this.add(oItem);
};

cSequence.prototype	= new cArray;

// Public members
cSequence.prototype.add	= function(oItem) {
	if (oItem instanceof cSequence) {
		for (var nIndex = 0; nIndex < oItem.length; nIndex++)
			this.push(oItem[nIndex]);
	}
	else
		this.push(oItem);
};