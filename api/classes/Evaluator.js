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

var fParseXSNumeric = require('./../../src/types').parseXSNumeric;
var cXSString = require('./../../src/types/schema/simple/atomic/XSString');
var cXSDouble = require('./../../src/types/schema/simple/atomic/XSDouble');
var cXSBoolean = require('./../../src/types/schema/simple/atomic/XSBoolean');

var fXSAnyAtomicType_isNumeric = require('./../../src/types/schema/simple/XSAnyAtomicType').isNumeric;

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
	if (typeof vItem == "boolean")
		vItem	= new cXSBoolean(vItem);
	else
	if (typeof vItem == "number")
		vItem	=(!fIsNaN(vItem) && fIsFinite(vItem)) ? fParseXSNumeric(cString(vItem)) : new cXSDouble(vItem);
	else
		vItem	= new cXSString(cString(vItem));
	//
	return vItem;
};

// Converts non-null XML Schema object to JavaScript object
function fEvaluator_xs2js(vItem) {
	if (vItem instanceof cXSBoolean)
		vItem	= vItem.valueOf();
	else
	if (fXSAnyAtomicType_isNumeric(vItem))
		vItem	= vItem.valueOf();
	else
		vItem	= vItem.toString();
	//
	return vItem;
};

//
module.exports = cEvaluator;
