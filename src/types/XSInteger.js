/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSInteger() {

};

cXSInteger.RegExp	= /^[-+]?[0-9]+$/;

cXSInteger.prototype	= new cXSDecimal;

//
cFunctionCall.dataTypes["integer"]	= function(sValue) {
	var aMatch	= sValue.match(cXSInteger.RegExp);
	if (aMatch)
		return +sValue;
	throw new cXPath2Error("FORG0001");
};