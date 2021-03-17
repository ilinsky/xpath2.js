var cExpression = require('./classes/Expression');
var cDOMAdapter = require('./classes/DOMAdapter');
var cStaticContext = require('./classes/StaticContext');
var cDynamicContext = require('./classes/DynamicContext');

var cXSAnyAtomicType = require('./types/schema/simple/XSAnyAtomicType');
var cXSString = require('./types/schema/simple/atomic/XSString');
var cXSDouble = require('./types/schema/simple/atomic/XSDouble');
var cXSDecimal = require('./types/schema/simple/atomic/XSDecimal');
var cXSBoolean = require('./types/schema/simple/atomic/XSBoolean');
var cXSInteger = require('./types/schema/simple/atomic/integer/XSInteger');

// "load" functions
require('./functions');
// "load" operators
require('./operators');
// "load" datatypes
require('./types');

var cObject = global.Object;
var fIsNaN = global.isNaN;
var fIsFinite = global.isFinite;

var oDefaultStaticContext	= new cStaticContext;
var oDefaultDOMAdapter		= new cDOMAdapter;

function fCompile(sExpression, oStaticContext) {
	return new cExpression(sExpression, oStaticContext);
};

function fEvaluate(sExpression, vItem, vStaticContext, oScope, oDOMAdapter) {
    var oStaticContext = typeof vStaticContext == "function" ? new cStaticContext(vStaticContext) : vStaticContext;
    return fExecute(sExpression, fCreateDynamicContext(oStaticContext, vItem, oScope, oDOMAdapter));
}

function fExecute(sExpression, oDynamicContext) {
    if (!(typeof sExpression == "string")) {
        throw "Missing or inappropriate type of the expression parameter";
    }
    if (!(oDynamicContext instanceof cDynamicContext)) {
        throw "Missing or inappropriate type of the dynamic context parameter";
    }

	var oSequence	= fCompile(sExpression, oDynamicContext.staticContext).evaluate(oDynamicContext),
		aReturn		= [];

	// Convert types from XML Schema to JavaScript
	for (var nIndex = 0, nLength = oSequence.length, oItem; nIndex < nLength; nIndex++)
		aReturn[aReturn.length]	= oDynamicContext.DOMAdapter.isNode(oItem = oSequence[nIndex]) ? oItem : fEvaluator_xs2js(oItem);
	//
	return aReturn;
};

function fCreateStaticContext(vResolver, sBaseURI) {
    return new cStaticContext(vResolver, sBaseURI);
};

function fCreateDynamicContext(oStaticContext, vItem, oScope, oDOMAdapter) {
	//
	if (!oStaticContext)
		oStaticContext	= oDefaultStaticContext;

	if (typeof vItem == "undefined")
		vItem	= null;

	//
	if (!oDOMAdapter)
		oDOMAdapter		= oDefaultDOMAdapter;

    // Convert types from JavaScript to XML Schema
	var oXSScope	= {},
		oValue;
	if (typeof oScope == "object")
		for (var sKey in oScope) {
			oValue	= oScope[sKey];
			if (cObject.hasOwnProperty.call(oScope, sKey) && oValue != null)
				oXSScope[sKey]	= oDOMAdapter.isNode(oValue) ? oValue : fEvaluator_js2xs(oValue);
		}

	// Create dynamic context
	return new cDynamicContext(oStaticContext, vItem == null || oDOMAdapter.isNode(vItem) ? vItem : fEvaluator_js2xs(vItem), oXSScope, oDOMAdapter);
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
module.exports = {
    execute: fExecute,
	evaluate: fEvaluate,
	createStaticContext: fCreateStaticContext,
	createDynamicContext: fCreateDynamicContext,
	js2xs: fEvaluator_js2xs,
	xs2js: fEvaluator_xs2js,
	defaultDOMAdapter: oDefaultDOMAdapter,
	defaultStaticContext: oDefaultStaticContext
};
