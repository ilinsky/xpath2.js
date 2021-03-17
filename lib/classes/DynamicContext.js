var cDOMAdapter = require('./DOMAdapter');

var cXSDateTime = require('./../types/schema/simple/atomic/XSDateTime');
var cXSDayTimeDuration = require('./../types/schema/simple/atomic/duration/XSDayTimeDuration');

var cDate = global.Date;
var cMath = global.Math;
var cObject = global.Object;

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

//
module.exports = cDynamicContext;
