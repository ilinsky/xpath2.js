/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSConstants = require('./../../classes/XSConstants');
var cXSAnySimpleType = require('./../XSAnySimpleType');
// var cXSDecimal = require('./atomic/XSDecimal');
// var cXSDouble = require('./atomic/XSDouble');
// var cXSFloat = require('./atomic/XSFloat');

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

cXSAnyAtomicType.isNumeric = function(vItem) {
	return true;//return vItem instanceof cXSFloat || vItem instanceof cXSDouble || vItem instanceof cXSDecimal;
};

// FIXME: move

//
module.exports = cXSAnyAtomicType;
