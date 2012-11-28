/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDouble(nValue) {
	this.value	= nValue;
};

cXSDouble.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;

cXSDouble.prototype	= new cXSAnyAtomicType;
cXSDouble.prototype.builtInKind		= cXSConstants.DOUBLE_DT;
cXSDouble.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DOUBLE;

cXSDouble.prototype.value	= null;

cXSDouble.prototype.valueOf	= function() {
	return this.value;
};

cXSDouble.prototype.toString	= function() {
	return cString(this.value);
};

cXSDouble.cast	= function(vValue) {
	if (vValue instanceof cXSDouble)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(cXSDouble.RegExp);
		if (aMatch)
			return new cXSDouble(aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSDouble(vValue * 1);
	if (fXSAnyAtomicType_isNumeric(vValue))
		return new cXSDouble(vValue.value);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:double can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("double",	cXSDouble);
