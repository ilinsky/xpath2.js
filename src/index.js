/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

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
var accessors = require('./functions/accessor');
var anyuri = require('./functions/anyuri');
var boolean = require('./functions/boolean');
var context = require('./functions/context');
var date = require('./functions/date');
var node = require('./functions/node');
var numeric = require('./functions/numeric');
var qname = require('./functions/qname');
var sequence = require('./functions/sequence');
var string = require('./functions/string');
var trace = require('./functions/trace');

// "load" operators
var binary = require('./operators/binary');
var boolean = require('./operators/boolean');
var date = require('./operators/date');
var node = require('./operators/node');
var notation = require('./operators/notation');
var numeric = require('./operators/numeric');
var qname = require('./operators/qname');
var sequence = require('./operators/sequence');

// "load" datatypes
var types = require('./types');

var cString = global.String;
var fIsNaN = global.isNaN;
var fIsFinite = global.isFinite;

var oDefaultStaticContext	= new cStaticContext;
var oDefaultDOMAdapter		= new cDOMAdapter;

function fCompile(sExpression, oStaticContext) {
	return new cExpression(sExpression, oStaticContext);
};

function fEvaluate(sExpression, vItem, oStaticContext, oScope, oDOMAdapter) {
	//
	if (!oStaticContext)
		oStaticContext	= oDefaultStaticContext;
	//
	if (!oDOMAdapter)
		oDOMAdapter		= oDefaultDOMAdapter;

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
	var oSequence	= fCompile(sExpression, oStaticContext).evaluate(oContext),
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
module.exports = {
    compile: fCompile,
    evaluate: fEvaluate,
    defaultDOMAdapter: oDefaultDOMAdapter,
    defaultStaticContext: oDefaultStaticContext
}