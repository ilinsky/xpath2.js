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
var cXSToken = require('./XSToken');

function cXSName(sValue) {
	this.value	= sValue;
};

cXSName.prototype	= new cXSToken;
cXSName.prototype.builtInKind	= cXSConstants.NAME_DT;

cXSName.cast	= function(vValue) {
	return new cXSName(cString(vValue));
};

//
module.exports = cXSName;
