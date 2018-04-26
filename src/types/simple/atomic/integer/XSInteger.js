/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../../../../classes/StaticContext');
var cXSConstants = require('./../../../../classes/XSConstants');
var cXSDecimal = require('./../XSDecimal');

function cXSInteger(nValue) {
	this.value	= nValue;
};

cXSInteger.prototype	= new cXSDecimal;
cXSInteger.prototype.builtInKind	= cXSConstants.INTEGER_DT;

var rXSInteger	= /^[-+]?[0-9]+$/;
cXSInteger.cast	= function(vValue) {
	if (vValue instanceof cXSInteger)
		return new cXSInteger(vValue.value);
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSInteger);
		if (aMatch)
			return new cXSInteger(+vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSInteger(vValue * 1);
	if (fXSAnyAtomicType_isNumeric(vValue)) {
		if (!fIsNaN(vValue) && fIsFinite(vValue))
			return new cXSInteger(+vValue);
		throw new cException("FOCA0002"
//->Debug
				, "Cannot convert '" + vValue + "' to xs:integer"
//<-Debug
		);
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:integer can never succeed"
//<-Debug
	);
};

//
cStaticContext.defineSystemDataType("integer",	cXSInteger);

//
module.exports = cXSInteger;
