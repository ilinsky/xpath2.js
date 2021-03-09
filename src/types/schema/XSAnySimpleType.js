/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSConstants = require('./XSConstants');

var cXSAnyType = require('./XSAnyType');

function cXSAnySimpleType() {

};

cXSAnySimpleType.prototype	= new cXSAnyType;

cXSAnySimpleType.prototype.builtInKind	= cXSConstants.ANYSIMPLETYPE_DT;
cXSAnySimpleType.prototype.primitiveKind= null;

cXSAnySimpleType.PRIMITIVE_ANYURI		= "anyURI";		//18;
cXSAnySimpleType.PRIMITIVE_BASE64BINARY	= "base64Binary";	// 17;
cXSAnySimpleType.PRIMITIVE_BOOLEAN		= "boolean";	// 3;
cXSAnySimpleType.PRIMITIVE_DATE			= "date";		// 10;
cXSAnySimpleType.PRIMITIVE_DATETIME		= "dateTime";	// 8;
cXSAnySimpleType.PRIMITIVE_DECIMAL		= "decimal";	// 4;
cXSAnySimpleType.PRIMITIVE_DOUBLE		= "double";		// 6;
cXSAnySimpleType.PRIMITIVE_DURATION		= "duration";	// 7;
cXSAnySimpleType.PRIMITIVE_FLOAT		= "float";		// 5;
cXSAnySimpleType.PRIMITIVE_GDAY			= "gDay";		// 14;
cXSAnySimpleType.PRIMITIVE_GMONTH		= "gMonth";		// 15;
cXSAnySimpleType.PRIMITIVE_GMONTHDAY	= "gMonthDay";	// 13;
cXSAnySimpleType.PRIMITIVE_GYEAR		= "gYear";		// 12;
cXSAnySimpleType.PRIMITIVE_GYEARMONTH	= "gYearMonth";	// 11;
cXSAnySimpleType.PRIMITIVE_HEXBINARY	= "hexBinary";	// 16;
cXSAnySimpleType.PRIMITIVE_NOTATION		= "NOTATION";	// 20;
cXSAnySimpleType.PRIMITIVE_QNAME		= "QName";		// 19;
cXSAnySimpleType.PRIMITIVE_STRING		= "string";		// 2;
cXSAnySimpleType.PRIMITIVE_TIME			= "time";		// 9;

//
module.exports = cXSAnySimpleType;
