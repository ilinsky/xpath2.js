/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSHexBinary(sValue) {
	this.value	= sValue;
};

cXSHexBinary.RegExp	= /^([0-9a-fA-F]{2})*$/;

cXSHexBinary.prototype	= new cXSAnyAtomicType;

cXSHexBinary.prototype.value	= null;

cXSHexBinary.prototype.valueOf	= function() {
	return this.value;
};

cXSHexBinary.prototype.toString	= function() {
	return this.value;
};

cXSHexBinary.cast	= function(vValue) {
	if (vValue instanceof cXSHexBinary)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim.call(vValue).match(cXSHexBinary.RegExp);
		if (aMatch)
			return new cXSHexBinary(aMatch[0].toUpperCase());
		throw new cXPath2Error("FORG0001");
	}
	if (vValue instanceof cXSBase64Binary)
		throw "Casting from 'xs:" + "base64Binary"+ "' to 'xs:" + "hexBinary"+ "' not implemented";
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:hexBinary can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("hexBinary",	cXSHexBinary);
