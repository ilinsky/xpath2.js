/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSUnsignedShort(nValue) {
	this.value	= nValue;
};

cXSUnsignedShort.prototype	= new cXSUnsignedInt;
cXSUnsignedShort.prototype.builtInKind	= cXSConstants.UNSIGNEDSHORT_DT;

cXSUnsignedShort.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value >= 1 && oValue.value <= 65535)
		return new cXSUnsignedShort(oValue.value);
	//
	throw new cException("FORG0001");
};

//
fStaticContext_defineSystemDataType("unsignedShort",	cXSUnsignedShort);
