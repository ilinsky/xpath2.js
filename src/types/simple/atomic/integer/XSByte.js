/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSByte(nValue) {
	this.value	= nValue;
};

cXSByte.prototype	= new cXSShort;
cXSByte.prototype.builtInKind	= cXSConstants.BYTE_DT;

cXSByte.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 127 && oValue.value >= -128)
		return new cXSByte(oValue.value);
	//
	throw new cException("FORG0001");
};

//
fStaticContext_defineSystemDataType("byte",	cXSByte);
