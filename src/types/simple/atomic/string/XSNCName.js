/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../../../../classes/StaticContext');
var cXSConstants = require('./../../../../classes/XSConstants');
var cXSName = require('./XSName');

function cXSNCName(sValue) {
	this.value	= sValue;
};

cXSNCName.prototype	= new cXSName;
cXSNCName.prototype.builtInKind	= cXSConstants.NCNAME_DT;

cXSNCName.cast	= function(vValue) {
	return new cXSNCName(cString(vValue));
};

//
cStaticContext.defineSystemDataType("NCName",	cXSNCName);

//
module.exports = cXSNCName;
