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

var cString = global.String;

function cXSString(sValue) {
	this.value	= sValue;
};

cXSString.prototype	= new cXSAnyAtomicType;

cXSString.prototype.value	= null;
cXSString.prototype.builtInKind		= cXSConstants.STRING_DT;
cXSString.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_STRING;

cXSString.prototype.valueOf		= function() {
	return this.value;
};

cXSString.prototype.toString	= function() {
	return this.value;
};

cXSString.cast	= function(vValue) {
	return new cXSString(cString(vValue));
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:string can never succeed"
//<-Debug
	);
};

//
module.exports = cXSString;
