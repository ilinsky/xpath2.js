/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2DynamicContext(oStaticContext, vItem, oScope, oDOMAdapter) {
	//
	this.staticContext	= oStaticContext;
	//
	this.item		= vItem;
	this.position	= 1;
	this.size		= 1;
	//
	this.scope		= oScope || {};
	this.stack		= {};
	//
	this.DOMAdapter	= oDOMAdapter || new cXPath2DOMAdapter;
	//
	var oDate	= new cDate,
		nOffset	= oDate.getTimezoneOffset();
	this.dateTime	= new cXSDateTime(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate(), oDate.getHours(), oDate.getMinutes(), oDate.getSeconds() + oDate.getMilliseconds() / 1000, nOffset);
	this.timezone	= new cXSDayTimeDuration(0, cMath.abs(~~(nOffset / 60)), cMath.abs(nOffset % 60), 0, nOffset > 0);
};

cXPath2DynamicContext.prototype.item		= null;
cXPath2DynamicContext.prototype.position	= null;
cXPath2DynamicContext.prototype.size		= null;
//
cXPath2DynamicContext.prototype.scope		= null;
cXPath2DynamicContext.prototype.stack		= null;	// Variables stack
//
cXPath2DynamicContext.prototype.dateTime	= null;
cXPath2DynamicContext.prototype.timezone	= null;
//
cXPath2DynamicContext.prototype.staticContext	= null;

// Stack management
cXPath2DynamicContext.prototype.pushVariable	= function(sName, vValue) {
	if (!this.stack.hasOwnProperty(sName))
		this.stack[sName]	= [];
	this.stack[sName].push(this.scope[sName]);
	this.scope[sName] = vValue;
};

cXPath2DynamicContext.prototype.popVariable	= function(sName) {
	if (this.stack.hasOwnProperty(sName)) {
		this.scope[sName] = this.stack[sName].pop();
		if (!this.stack[sName].length) {
			delete this.stack[sName];
			if (typeof this.scope[sName] == "undefined")
				delete this.scope[sName];
		}
	}
};