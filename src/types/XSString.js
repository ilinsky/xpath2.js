/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSString() {

};

cXSString.prototype	= new cXSAnyAtomicType;

cXSString.parse	= function(sValue) {
	return sValue;
};
//
cFunctionCall.dataTypes["string"]	= cXSString;