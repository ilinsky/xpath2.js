/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSShort(nValue) {
	this.value	= nValue;
};

cXSShort.prototype	= new cXSInt;
cXSShort.prototype.builtInKind	= cXSConstants.SHORT_DT;

cXSShort.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 32767 && oValue.value >= -32768)
		return new cXSShort(oValue.value);
	//
	throw new cException("FORG0001");
};

//
fStaticContext_defineSystemDataType("short",	cXSShort);
