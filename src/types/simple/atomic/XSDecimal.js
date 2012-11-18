/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDecimal(nValue) {
	this.value	= nValue;
};

cXSDecimal.RegExp	= /^[+\-]?((\d+(\.\d*)?)|(\.\d+))$/;

cXSDecimal.prototype	= new cXSAnyAtomicType;

cXSDecimal.prototype.value	= null;

cXSDecimal.prototype.valueOf	= function() {
	return this.value;
};

cXSDecimal.prototype.toString	= function() {
	return cString(this.value);
};

cXSDecimal.cast	= function(vValue) {
	if (vValue instanceof cXSDecimal)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim.call(vValue).match(cXSDecimal.RegExp);
		if (aMatch)
			return new cXSDecimal(+vValue);
		throw new cXPath2Error("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSDecimal(vValue * 1);
	if (cXSAnyAtomicType.isNumeric(vValue))
		return new cXSDecimal(vValue.value);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:decimal can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("decimal",	cXSDecimal);
