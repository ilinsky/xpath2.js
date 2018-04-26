/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../../../classes/StaticContext');
var cXSConstants = require('./../../../classes/XSConstants');
var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');

function cXSNOTATION() {

};

cXSNOTATION.prototype	= new cXSAnyAtomicType;
cXSNOTATION.prototype.builtInKind	= cXSConstants.NOTATION_DT;
cXSNOTATION.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_NOTATION;

cXSNOTATION.cast	= function(vValue) {
	throw new cException("XPST0017"
//->Debug
			, "Abstract type used in constructor function xs:NOTATION"
//<-Debug
	);	//  {http://www.w3.org/2001/XMLSchema}NOTATION
};

//
cStaticContext.defineSystemDataType("NOTATION",	cXSNOTATION);

//
module.exports = cXSNOTATION;
