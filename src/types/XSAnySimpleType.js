/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSAnySimpleType() {

};

cXSAnySimpleType.prototype	= new cXSAnyType;

cXSAnySimpleType.prototype.primitiveKind= null;

cXSAnySimpleType.PRIMITIVE_ANYURI		= 18;
cXSAnySimpleType.PRIMITIVE_BASE64BINARY	= 17;
cXSAnySimpleType.PRIMITIVE_BOOLEAN		= 3;
cXSAnySimpleType.PRIMITIVE_DATE			= 10;
cXSAnySimpleType.PRIMITIVE_DATETIME		= 8;
cXSAnySimpleType.PRIMITIVE_DECIMAL		= 4;
cXSAnySimpleType.PRIMITIVE_DOUBLE		= 6;
cXSAnySimpleType.PRIMITIVE_DURATION		= 7;
cXSAnySimpleType.PRIMITIVE_FLOAT		= 5;
cXSAnySimpleType.PRIMITIVE_GDAY			= 14;
cXSAnySimpleType.PRIMITIVE_GMONTH		= 15;
cXSAnySimpleType.PRIMITIVE_GMONTHDAY	= 13;
cXSAnySimpleType.PRIMITIVE_GYEAR		= 12;
cXSAnySimpleType.PRIMITIVE_GYEARMONTH	= 11;
cXSAnySimpleType.PRIMITIVE_HEXBINARY	= 16;
cXSAnySimpleType.PRIMITIVE_NOTATION		= 20;
cXSAnySimpleType.PRIMITIVE_QNAME		= 19;
cXSAnySimpleType.PRIMITIVE_STRING		= 2;
cXSAnySimpleType.PRIMITIVE_TIME			= 9;
