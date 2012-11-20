/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSFloat(nValue) {
	this.value	= nValue;
};

cXSFloat.RegExp	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;

cXSFloat.prototype	= new cXSAnyAtomicType;

cXSFloat.prototype.value	= null;

cXSFloat.prototype.valueOf	= function() {
	return this.value;
};

cXSFloat.prototype.toString	= function() {
	return cString(this.value);
};

cXSFloat.cast	= function(vValue) {
	if (vValue instanceof cXSFloat)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim.call(vValue).match(cXSFloat.RegExp);
		if (aMatch)
			return new cXSFloat(aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSFloat(vValue * 1);
	if (fXSAnyAtomicType_isNumeric(vValue))
		return new cXSFloat(vValue.value);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:float can never succeed"
//<-Debug
	);
};

//
fStaticContext_defineSystemDataType("float",	cXSFloat);
