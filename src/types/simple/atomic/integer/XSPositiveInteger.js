/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSPositiveInteger(nValue) {
	this.value	= nValue;
};

cXSPositiveInteger.prototype	= new cXSNonNegativeInteger;
cXSPositiveInteger.prototype.builtInKind	= cXSConstants.POSITIVEINTEGER_DT;

cXSPositiveInteger.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value >= 1)
		return new cXSPositiveInteger(oValue.value);
	//
	throw new cException("FORG0001");
};

//
fStaticContext_defineSystemDataType("positiveInteger",	cXSPositiveInteger);
