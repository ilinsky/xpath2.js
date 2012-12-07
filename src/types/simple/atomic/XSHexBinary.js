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

cXSHexBinary.prototype	= new cXSAnyAtomicType;
cXSHexBinary.prototype.builtInKind		= cXSConstants.HEXBINARY_DT;
cXSHexBinary.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_HEXBINARY;

cXSHexBinary.prototype.value	= null;

cXSHexBinary.prototype.valueOf	= function() {
	return this.value;
};

cXSHexBinary.prototype.toString	= function() {
	return this.value;
};

var rXSHexBinary	= /^([0-9a-fA-F]{2})*$/;
cXSHexBinary.cast	= function(vValue) {
	if (vValue instanceof cXSHexBinary)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSHexBinary);
		if (aMatch)
			return new cXSHexBinary(aMatch[0].toUpperCase());
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBase64Binary)
		throw "Casting from 'xs:" + "base64Binary"+ "' to 'xs:" + "hexBinary"+ "' not implemented";
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:hexBinary can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("hexBinary",	cXSHexBinary);
