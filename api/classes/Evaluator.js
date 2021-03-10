/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cExpression = require('./../../src/classes/Expression');
var cDOMAdapter = require('./../../src/classes/DOMAdapter');
var cStaticContext = require('./../../src/classes/StaticContext');
var cDynamicContext = require('./../../src/classes/DynamicContext');

var cXSString = require('./../../src/types/schema/simple/atomic/XSString');
var cXSDouble = require('./../../src/types/schema/simple/atomic/XSDouble');
var cXSDecimal = require('./../../src/types/schema/simple/atomic/XSDecimal');
var cXSBoolean = require('./../../src/types/schema/simple/atomic/XSBoolean');
var cXSInteger = require('./../../src/types/schema/simple/atomic/integer/XSInteger');

var cXSAnyAtomicType = require('./../../src/types/schema/simple/XSAnyAtomicType');

var cString = global.String;
var fIsNaN = global.isNaN;
var fIsFinite = global.isFinite;

function cEvaluator() {

};

cEvaluator.prototype.defaultStaticContext	= new cStaticContext;
cEvaluator.prototype.defaultDOMAdapter		= new cDOMAdapter;

cEvaluator.prototype.compile	= function(sExpression, oStaticContext) {
	return new cExpression(sExpression, oStaticContext);
};

cEvaluator.prototype.evaluate	= function(sExpression, vItem, oStaticContext, oScope, oDOMAdapter) {
	//
	if (!oStaticContext)
		oStaticContext	= this.defaultStaticContext;
	//
	if (!oDOMAdapter)
		oDOMAdapter		= this.defaultDOMAdapter;

	if (typeof vItem == "undefined")
		vItem	= null;

	var oXSScope	= {},
		oValue;
	if (typeof oScope == "object")
		for (var sKey in oScope) {
			oValue	= oScope[sKey];
			if (oScope.hasOwnProperty(sKey) && oValue != null)
				oXSScope[sKey]	= oDOMAdapter.isNode(oValue) ? oValue : fEvaluator_js2xs(oValue);
		}

	// Create dynamic context
	var oContext	= new cDynamicContext(oStaticContext, vItem == null || oDOMAdapter.isNode(vItem) ? vItem : fEvaluator_js2xs(vItem), oXSScope, oDOMAdapter);

	// Evaluate and convert types from XPath 2.0 to JavaScript
	var oSequence	= this.compile(sExpression, oStaticContext).evaluate(oContext),
		aReturn		= [];

	for (var nIndex = 0, nLength = oSequence.length, oItem; nIndex < nLength; nIndex++)
		aReturn[aReturn.length]	= oDOMAdapter.isNode(oItem = oSequence[nIndex]) ? oItem : fEvaluator_xs2js(oItem);
	//
	return aReturn;
};

// Converts non-null JavaScript object to XML Schema object
function fEvaluator_js2xs(vItem) {
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
function fEvaluator_xs2js(vItem) {
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
module.exports = cEvaluator;
