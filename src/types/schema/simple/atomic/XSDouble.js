/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../../../classes/Exception');

var cXSConstants = require('./../../XSConstants');

var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');
var cXSUntypedAtomic = require('./XSUntypedAtomic');
var cXSBoolean = require('./XSBoolean');
var cXSString = require('./XSString');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSDouble(nValue) {
	this.value	= nValue;
};

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

var rXSDouble	= /^([+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][+\-]?\d+)?|(-?INF)|NaN)$/;
cXSDouble.cast	= function(vValue) {
	if (vValue instanceof cXSDouble)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDouble);
		if (aMatch)
			return new cXSDouble(aMatch[7] ? +aMatch[7].replace("INF", "Infinity") : +vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSDouble(vValue * 1);
	if (vValue.primitiveKind == cXSAnySimpleType.PRIMITIVE_DECIMAL || vValue.primitiveKind == cXSAnySimpleType.PRIMITIVE_FLOAT)
		return new cXSDouble(vValue.value);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:double can never succeed"
//<-Debug
	);
};

//
module.exports = cXSDouble;
