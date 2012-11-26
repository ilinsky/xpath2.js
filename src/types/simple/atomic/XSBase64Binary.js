/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSBase64Binary(sValue) {
	this.value	= sValue;
};

cXSBase64Binary.RegExp	= /^((([A-Za-z0-9+\/]\s*){4})*(([A-Za-z0-9+\/]\s*){3}[A-Za-z0-9+\/]|([A-Za-z0-9+\/]\s*){2}[AEIMQUYcgkosw048]\s*=|[A-Za-z0-9+\/]\s*[AQgw]\s*=\s*=))?$/;

cXSBase64Binary.prototype	= new cXSAnyAtomicType;

cXSBase64Binary.prototype.value	= null;

cXSBase64Binary.prototype.valueOf	= function() {
	return this.value;
};

cXSBase64Binary.prototype.toString	= function() {
	return this.value;
};

cXSBase64Binary.cast	= function(vValue) {
	if (vValue instanceof cXSBase64Binary)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(cXSBase64Binary.RegExp);
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
