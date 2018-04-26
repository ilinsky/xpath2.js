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
var cXSNCName = require('./XSNCName');

function cXSID(sValue) {
	this.value	= sValue;
};

cXSID.prototype	= new cXSNCName;
cXSID.prototype.builtInKind	= cXSConstants.ID_DT;

cXSID.cast	= function(vValue) {
	return new cXSID(cString(vValue));
};

//
cStaticContext.defineSystemDataType("ID",	cXSID);

//
module.exports = cXSID;
