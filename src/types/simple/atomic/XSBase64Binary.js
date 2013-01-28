/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSBase64Binary(sValue) {
	this.value	= sValue;
};

cXSBase64Binary.prototype	= new cXSAnyAtomicType;
cXSBase64Binary.prototype.builtInKind	= cXSConstants.BASE64BINARY_DT;
cXSBase64Binary.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_BASE64BINARY;

cXSBase64Binary.prototype.value	= null;

cXSBase64Binary.prototype.valueOf	= function() {
	return this.value;
};

cXSBase64Binary.prototype.toString	= function() {
	return this.value;
};

var rXSBase64Binary		= /^((([A-Za-z0-9+\/]\s*){4})*(([A-Za-z0-9+\/]\s*){3}[A-Za-z0-9+\/]|([A-Za-z0-9+\/]\s*){2}[AEIMQUYcgkosw048]\s*=|[A-Za-z0-9+\/]\s*[AQgw]\s*=\s*=))?$/;
cXSBase64Binary.cast	= function(vValue) {
	if (vValue instanceof cXSBase64Binary)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSBase64Binary);
		if (aMatch)
			return new cXSBase64Binary(aMatch[0]);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSHexBinary)
		throw "Casting from 'xs:" + "hexBinary"+ "' to 'xs:" + "base64Binary"+ "' not implemented";
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:hexBinary can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("base64Binary",	cXSBase64Binary);
