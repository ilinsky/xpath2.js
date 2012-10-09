/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathContext(oSequence, nPosition, oScope) {
	this.sequence	= oSequence || new cXPathSequence;
	this.position	= nPosition || 0;
	this.scope	= oScope || {};
	this.stack	= {};
};

cXPathContext.prototype.sequence	= null;
cXPathContext.prototype.position	= null;
cXPathContext.prototype.scope		= null;
cXPathContext.prototype.stack		= null;	// Variables stack

cXPathContext.prototype.pushVariable	= function(sName, vValue) {
	if (!this.stack.hasOwnProperty(sName))
		this.stack[sName]	= [];
	this.stack[sName].push(this.scope[sName]);
	this.scope[sName] = vValue;
};

cXPathContext.prototype.popVariable	= function(sName) {
	if (this.stack.hasOwnProperty(sName)) {
		this.scope[sName] = this.stack[sName].pop();
		if (typeof this.scope[sName] == "undefined")
			delete this.scope[sName];
		if (!this.stack[sName].length)
			delete this.stack[sName];
	}
};

cXPathContext.clone	= function(oContext) {
	// Make clone of scope
	var oScope	= {};
	for (var sKey in oContext.scope)
		if (oContext.scope.hasOwnProperty(sKey))
			oScope[sKey]	= oContext.scope[sKey];
	return new cXPathContext(oContext.node, oContext.position, oScope);
};