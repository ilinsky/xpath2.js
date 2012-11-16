/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSBoolean(bValue) {
	this.value	= bValue;
};

cXSBoolean.RegExp	= /^(0|1|true|false)$/;

cXSBoolean.prototype	= new cXSAnyAtomicType;

cXSBoolean.prototype.value	= null;

cXSBoolean.prototype.valueOf	= function() {
	return this.value;
};

cXSBoolean.prototype.toString	= function() {
	return cString(this.value);
};

cXSBoolean.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSBoolean:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch;
			if (aMatch = fString_trim.call(vValue).match(cXSBoolean.RegExp))
				return new cXSBoolean(aMatch[1] == "1" || aMatch[1] == "true");
			throw new cXPath2Error("FORG0001");
		case cXSFloat:
		case cXSDouble:
		case cXSDecimal:
		case cXSInteger:
			return new cXSBoolean(vValue != 0);
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:boolean can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("boolean",	cXSBoolean);
