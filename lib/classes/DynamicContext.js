var cDOMAdapter = require('./DOMAdapter');

var cXSDateTime = require('./../types/schema/simple/atomic/XSDateTime');
var cXSDayTimeDuration = require('./../types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSAnyAtomicType = require('./../types/schema/simple/XSAnyAtomicType');
var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSDouble = require('./../types/schema/simple/atomic/XSDouble');
var cXSDecimal = require('./../types/schema/simple/atomic/XSDecimal');
var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');

var cDate = global.Date;
var cMath = global.Math;
var cObject = global.Object;
var fIsNaN = global.isNaN;
var fIsFinite = global.isFinite;

function cDynamicContext(oStaticContext, vItem, oScope, oDOMAdapter) {
	//
	this.staticContext	= oStaticContext;
	//
	this.item		= vItem;
	//
	this.scope		= oScope || {};
	this.stack		= {};
	//
	this.DOMAdapter	= oDOMAdapter || new cDOMAdapter;
	//
	var oDate	= new cDate,
		nOffset	= oDate.getTimezoneOffset();
	this.dateTime	= new cXSDateTime(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate(), oDate.getHours(), oDate.getMinutes(), oDate.getSeconds() + oDate.getMilliseconds() / 1000, -nOffset);
	this.timezone	= new cXSDayTimeDuration(0, cMath.abs(~~(nOffset / 60)), cMath.abs(nOffset % 60), 0, nOffset > 0);
};

cDynamicContext.prototype.item		= null;
cDynamicContext.prototype.position	= 0;
cDynamicContext.prototype.size		= 0;
//
cDynamicContext.prototype.scope		= null;
cDynamicContext.prototype.stack		= null;	// Variables stack
//
cDynamicContext.prototype.dateTime	= null;
cDynamicContext.prototype.timezone	= null;
//
cDynamicContext.prototype.staticContext	= null;

// Stack management
cDynamicContext.prototype.pushVariable	= function(sName, vValue) {
	if (!cObject.hasOwnProperty.call(this.stack, sName))
		this.stack[sName]	= [];
	this.stack[sName].push(this.scope[sName]);
	this.scope[sName] = vValue;
};

cDynamicContext.prototype.popVariable	= function(sName) {
	if (cObject.hasOwnProperty.call(this.stack, sName)) {
		this.scope[sName] = this.stack[sName].pop();
		if (!this.stack[sName].length) {
			delete this.stack[sName];
			if (typeof this.scope[sName] == "undefined")
				delete this.scope[sName];
		}
	}
};

// Converts non-null JavaScript object to XML Schema object
cDynamicContext.js2xs = function(vItem) {
	// Convert types from JavaScript to XPath 2.0
	var cType;
	if (typeof vItem == "boolean")
		cType = cXSBoolean;
	else
	if (typeof vItem == "number") {
		if (fIsNaN(vItem) || !fIsFinite(vItem) || /e/i.test(vItem))
			cType = cXSDouble;
		else
		if (vItem % 1)
			cType = cXSDecimal;
		else
			cType = cXSInteger;
    }
	//
	return cType ? new cType(vItem) : new cXSString(vItem.toString());
};

// Converts non-null XML Schema object to JavaScript object
cDynamicContext.xs2js = function(vItem) {
	if (vItem instanceof cXSBoolean)
		vItem	= vItem.valueOf();
	else
	if (cXSAnyAtomicType.isNumeric(vItem))
		vItem	= vItem.valueOf();
	else
		vItem	= vItem.toString();
	//
	return vItem;
};

//
module.exports = cDynamicContext;
