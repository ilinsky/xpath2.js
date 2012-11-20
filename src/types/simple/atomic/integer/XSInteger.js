/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSInteger(nValue) {
	this.value	= nValue;
};

cXSInteger.RegExp	= /^[-+]?[0-9]+$/;

cXSInteger.prototype	= new cXSDecimal;

cXSInteger.cast	= function(vValue) {
	if (vValue instanceof cXSInteger)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim.call(vValue).match(cXSInteger.RegExp);
		if (aMatch)
			return new cXSInteger(~~vValue);
		throw new cXPath2Error("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSInteger(vValue * 1);
	if (fXSAnyAtomicType_isNumeric(vValue))
		return new cXSInteger(~~vValue.value);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:integer can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("integer",	cXSInteger);
