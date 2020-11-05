/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cString = String;

var cXSConstants = require('./../../../../classes/XSConstants');
var cXSToken = require('./XSToken');

function cXSLanguage(sValue) {
	this.value	= sValue;
};

cXSLanguage.prototype	= new cXSToken;
cXSLanguage.prototype.builtInKind	= cXSConstants.LANGUAGE_DT;

cXSLanguage.cast	= function(vValue) {
	return new cXSLanguage(cString(vValue));
};

//
module.exports = cXSLanguage;
