/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathNSResolver(oNode) {
	this.node	= oNode;
};

cXPathNSResolver.prototype.lookupNamespaceURI	= function(sPrefix) {
	// validate API
//	fGuard(arguments, [
//		["expression",	cString,	true,	true]
//	]);

	// Invoke implementation
	return this.node.lookupNamespaceURI(sPrefix);
};