/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSHexBinary(vData) {
	this.data	= vData;
};

cXSHexBinary.RegExp	= /^([0-9a-fA-F]{2})*$/;

cXSHexBinary.prototype	= new cXSAnyAtomicType;

cXSHexBinary.prototype.data	= null;

cXSHexBinary.prototype.toString	= function() {
	return this.data;
};

cXSHexBinary.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSHexBinary:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= fString_trim.call(vValue).match(cXSHexBinary.RegExp);
			if (aMatch)
				return new cXSHexBinary(aMatch[0].toUpperCase());
			throw new cXPath2Error("FORG0001");
		case cXSBase64Binary:
			throw "Not implemented";

	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:hexBinary can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("hexBinary",	cXSHexBinary);