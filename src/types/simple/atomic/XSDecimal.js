/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cString = String;

var cXSConstants = require('./../../../classes/XSConstants');
var cXSUntypedAtomic = require('./../atomic/XSUntypedAtomic');
var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');
var cXSString = require('./../atomic/XSString');
var cXSBoolean = require('./../atomic/XSBoolean');

var fIsNaN = global.isNaN;

function cXSDecimal(nValue) {
	this.value	= nValue;
};

cXSDecimal.prototype	= new cXSAnyAtomicType;
cXSDecimal.prototype.builtInKind	= cXSConstants.DECIMAL_DT;
cXSDecimal.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_DECIMAL;

cXSDecimal.prototype.value	= null;

cXSDecimal.prototype.valueOf	= function() {
	return this.value;
};

cXSDecimal.prototype.toString	= function() {
	return cString(this.value);
};

var rXSDecimal	= /^[+\-]?((\d+(\.\d*)?)|(\.\d+))$/;
cXSDecimal.cast	= function(vValue) {
	if (vValue instanceof cXSDecimal)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDecimal);
		if (aMatch)
			return new cXSDecimal(+vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSDecimal(vValue * 1);
	if (fXSAnyAtomicType_isNumeric(vValue)) {
		if (!fIsNaN(vValue) && fIsFinite(vValue))
			return new cXSDecimal(+vValue);
		throw new cException("FOCA0002"
//->Debug
				, "Cannot convert '" + vValue + "' to xs:decimal"
//<-Debug
		);
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:decimal can never succeed"
//<-Debug
	);
};

//
module.exports = cXSDecimal;
