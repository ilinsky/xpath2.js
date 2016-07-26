/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSAnyAtomicType() {

};

cXSAnyAtomicType.prototype	= new cXSAnySimpleType;
cXSAnyAtomicType.prototype.builtInKind	= cXSConstants.ANYATOMICTYPE_DT;

cXSAnyAtomicType.cast	= function(vValue) {
	throw new cException("XPST0017"
//->Debug
			, "Abstract type used in constructor function xs:anyAtomicType"
//<-Debug
	);	//  {http://www.w3.org/2001/XMLSchema}anyAtomicType
};

function fXSAnyAtomicType_isNumeric(vItem) {
	return vItem instanceof cXSFloat || vItem instanceof cXSDouble || vItem instanceof cXSDecimal;
};

//
fStaticContext_defineSystemDataType("anyAtomicType",	cXSAnyAtomicType);
