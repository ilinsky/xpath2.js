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
var cXSToken = require('./XSToken');

function cXSNMTOKEN(sValue) {
	this.value	= sValue;
};

cXSNMTOKEN.prototype	= new cXSToken;
cXSNMTOKEN.prototype.builtInKind	= cXSConstants.NMTOKEN_DT;

cXSNMTOKEN.cast	= function(vValue) {
	return new cXSNMTOKEN(cString(vValue));
};

//
cStaticContext.defineSystemDataType("NMTOKEN",	cXSNMTOKEN);

//
module.exports = cXSNMTOKEN;
