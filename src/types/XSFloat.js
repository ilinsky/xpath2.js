/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSFloat() {

};

cXSFloat.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|-?INF|NaN)$/;

cXSFloat.prototype	= new cXSAnyAtomicType;

//
cFunctionCall.dataTypes["float"]	= function(sValue) {
	var aMatch	= sValue.match(cXSFloat.RegExp);
	if (aMatch)
		return +sValue;
	throw new cXPath2Error("FORG0001");
};