var cExpression = require('./classes/Expression');
var cDOMAdapter = require('./classes/DOMAdapter');
var cStaticContext = require('./classes/StaticContext');
var cDynamicContext = require('./classes/DynamicContext');

// "load" functions
require('./functions');
// "load" operators
require('./operators');
// "load" datatypes
require('./types');

var cObject = global.Object;

var oDefaultStaticContext	= new cStaticContext;
var oDefaultDOMAdapter		= new cDOMAdapter;

/**
 * Compiles expression using static context
 */
function fCompile(sExpression, oStaticContext) {
    if (!(typeof sExpression == "string")) {
        throw "Missing or inappropriate type of the expression parameter. String required.";
    }
    if (!(oStaticContext instanceof cStaticContext)) {
        throw "Missing or inappropriate type of the static context parameter. StaticContext type required.";
    }
	return new cExpression(sExpression, oStaticContext);
};

/**
 * Executes expression using dynamic context
 */
function fExecute(oExpression, oDynamicContext) {
    if (!(oExpression instanceof cExpression)) {
        throw "Missing or inappropriate type of the expression parameter. Expression type required.";
    }
    if (!(oDynamicContext instanceof cDynamicContext)) {
        throw "Missing or inappropriate type of the dynamic context parameter. DynamicContext type required.";
    }

	var oSequence	= oExpression.evaluate(oDynamicContext),
		aReturn		= [];

	// Convert types from XML Schema to JavaScript
	for (var nIndex = 0, nLength = oSequence.length, oItem; nIndex < nLength; nIndex++)
		aReturn[aReturn.length]	= oDynamicContext.DOMAdapter.isNode(oItem = oSequence[nIndex]) ? oItem : cDynamicContext.xs2js(oItem);
	//
	return aReturn;
};

/**
 *
 */
function fEvaluate(sExpression, vItem, vStaticContext, oScope, oDOMAdapter) {
    if (!(typeof sExpression == "string")) {
        throw "Missing or inappropriate type of the expression parameter";
    }
    var oStaticContext = typeof vStaticContext == "function" ? new cStaticContext(vStaticContext) : vStaticContext;
    var oDynamicContext = fCreateDynamicContext(oStaticContext, vItem, oScope, oDOMAdapter);
    var oExpression = fCompile(sExpression, oDynamicContext.staticContext);
    return fExecute(oExpression, oDynamicContext);
}

/**
 * Creates static context object
 */
function fCreateStaticContext(vResolver, sBaseURI) {
    return new cStaticContext(vResolver, sBaseURI);
};

/**
 * Creates dynamic context object
 */
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
				oXSScope[sKey]	= oDOMAdapter.isNode(oValue) ? oValue : cDynamicContext.js2xs(oValue);
		}

	// Create dynamic context
	return new cDynamicContext(oStaticContext, vItem == null || oDOMAdapter.isNode(vItem) ? vItem : cDynamicContext.js2xs(vItem), oXSScope, oDOMAdapter);
};

//
module.exports = {
    compile: fCompile,
    execute: fExecute,
	evaluate: fEvaluate,
	createStaticContext: fCreateStaticContext,
	createDynamicContext: fCreateDynamicContext,
	defaultDOMAdapter: oDefaultDOMAdapter,
	defaultStaticContext: oDefaultStaticContext
};
