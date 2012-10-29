/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDecimal() {

};

cXSDecimal.prototype	= new cXSAnyAtomicType;

//
cFunctionCall.dataTypes["decimal"]	= function(sValue) {
	var nValue	=+sValue;
	if (sValue != '' && !fIsNaN(nValue))
		return nValue;
	throw new cXPath2Error("FORG0001");
};