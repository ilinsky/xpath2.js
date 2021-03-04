/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cString = String;

var cXSConstants = require('./../../../XSConstants');
var cXSString = require('./../XSString');

function cXSNormalizedString(sValue) {
	this.value	= sValue;
};

cXSNormalizedString.prototype	= new cXSString;
cXSNormalizedString.prototype.builtInKind	= cXSConstants.NORMALIZEDSTRING_DT;

cXSNormalizedString.cast	= function(vValue) {
	return new cXSNormalizedString(cString(vValue));
};

//
module.exports = cXSNormalizedString;
