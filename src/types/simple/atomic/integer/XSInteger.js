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

cXSInteger.prototype	= new cXSDecimal;
cXSInteger.prototype.builtInKind	= cXSConstants.INTEGER_DT;

var rXSInteger	= /^[-+]?[0-9]+$/;
cXSInteger.cast	= function(vValue) {
	if (vValue instanceof cXSInteger)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSInteger);
		if (aMatch)
			return new cXSInteger(~~vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSInteger(vValue * 1);
	if (fXSAnyAtomicType_isNumeric(vValue)) {
		if (fIsNaN(vValue) || !fIsFinite(vValue))
			throw new cException("FOCA0002"
//->Debug
					, "Cannot convert '" + vValue + "' to xs:integer"
//<-Debug
			);
		return new cXSInteger(~~vValue);
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:integer can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("integer",	cXSInteger);
