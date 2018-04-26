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
var cXSNormalizedString = require('./XSNormalizedString');

function cXSToken(sValue) {
	this.value	= sValue;
};

cXSToken.prototype	= new cXSNormalizedString;
cXSToken.prototype.builtInKind	= cXSConstants.TOKEN_DT;

cXSToken.cast	= function(vValue) {
	return new cXSToken(cString(vValue));
};

//
cStaticContext.defineSystemDataType("token",	cXSToken);

//
module.exports = cXSToken;
