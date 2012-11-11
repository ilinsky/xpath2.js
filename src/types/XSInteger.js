/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSInteger() {

};

cXSInteger.RegExp	= /^[-+]?[0-9]+$/;

cXSInteger.prototype	= new cXSDecimal;

cXSInteger.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSInteger:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= fString_trim.call(vValue).match(cXSInteger.RegExp);
			if (aMatch)
				return ~~vValue;
			throw new cXPath2Error("FORG0001");
		case cXSBoolean:
			vValue	= vValue * 1;
		case cXSFloat:
		case cXSDouble:
		case cXSDecimal:
			return ~~vValue;
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:integer can never succeed"
//<-Debug
	);
};

//
cFunctionCall.dataTypes["integer"]	= cXSInteger;
