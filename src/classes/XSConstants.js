/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSConstants(){};

// XML Schema 1.0 Datatypes
cXSConstants.ANYSIMPLETYPE_DT		= 1;
cXSConstants.STRING_DT				= 2;
cXSConstants.BOOLEAN_DT				= 3;
cXSConstants.DECIMAL_DT				= 4;
cXSConstants.FLOAT_DT				= 5;
cXSConstants.DOUBLE_DT				= 6;
cXSConstants.DURATION_DT			= 7;
cXSConstants.DATETIME_DT			= 8;
cXSConstants.TIME_DT				= 9;
cXSConstants.DATE_DT				= 10;
cXSConstants.GYEARMONTH_DT			= 11;
cXSConstants.GYEAR_DT				= 12;
cXSConstants.GMONTHDAY_DT			= 13;
cXSConstants.GDAY_DT				= 14;
cXSConstants.GMONTH_DT				= 15;
cXSConstants.HEXBINARY_DT			= 16;
cXSConstants.BASE64BINARY_DT		= 17;
cXSConstants.ANYURI_DT				= 18;
cXSConstants.QNAME_DT				= 19;
cXSConstants.NOTATION_DT			= 20;
cXSConstants.NORMALIZEDSTRING_DT	= 21;
cXSConstants.TOKEN_DT				= 22;
cXSConstants.LANGUAGE_DT			= 23;
cXSConstants.NMTOKEN_DT				= 24;
cXSConstants.NAME_DT				= 25;
cXSConstants.NCNAME_DT				= 26;
cXSConstants.ID_DT					= 27;
cXSConstants.IDREF_DT				= 28;
cXSConstants.ENTITY_DT				= 29;
cXSConstants.INTEGER_DT				= 30;
cXSConstants.NONPOSITIVEINTEGER_DT	= 31;
cXSConstants.NEGATIVEINTEGER_DT		= 32;
cXSConstants.LONG_DT				= 33;
cXSConstants.INT_DT					= 34;
cXSConstants.SHORT_DT				= 35;
cXSConstants.BYTE_DT				= 36;
cXSConstants.NONNEGATIVEINTEGER_DT	= 37;
cXSConstants.UNSIGNEDLONG_DT		= 38;
cXSConstants.UNSIGNEDINT_DT			= 39;
cXSConstants.UNSIGNEDSHORT_DT		= 40;
cXSConstants.UNSIGNEDBYTE_DT		= 41;
cXSConstants.POSITIVEINTEGER_DT		= 42;
cXSConstants.LISTOFUNION_DT			= 43;
cXSConstants.LIST_DT				= 44;
cXSConstants.UNAVAILABLE_DT			= 45;

// XML Schema 1.1 Datatypes
cXSConstants.DATETIMESTAMP_DT		= 46;
cXSConstants.DAYMONTHDURATION_DT	= 47;
cXSConstants.DAYTIMEDURATION_DT		= 48;
cXSConstants.PRECISIONDECIMAL_DT	= 49;
cXSConstants.ANYATOMICTYPE_DT		= 50;
cXSConstants.ANYTYPE_DT				= 51;

//
cXSConstants.XT_YEARMONTHDURATION_DT=-1;
cXSConstants.XT_UNTYPEDATOMIC_DT	=-2;
