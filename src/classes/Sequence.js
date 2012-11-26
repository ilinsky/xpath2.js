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
		this.items	= this.items.concat(oItem.items);
	else
		this.items.push(oItem);
};