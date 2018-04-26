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
var cXSUnsignedShort = require('./XSUnsignedShort');

function cXSUnsignedByte(nValue) {
	this.value	= nValue;
};

cXSUnsignedByte.prototype	= new cXSUnsignedShort;
cXSUnsignedByte.prototype.builtInKind	= cXSConstants.UNSIGNEDBYTE_DT;

cXSUnsignedByte.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value >= 1 && oValue.value <= 255)
		return new cXSUnsignedByte(oValue.value);
	//
	throw new cException("FORG0001");
};

//
cStaticContext.defineSystemDataType("unsignedByte",	cXSUnsignedByte);

//
module.exports = cXSUnsignedByte;
