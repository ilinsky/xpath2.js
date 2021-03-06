var cException = require('./../../../classes/Exception');

var cXSConstants = require('./../XSConstants');

var cXSAnySimpleType = require('./../XSAnySimpleType');

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
	return vItem.primitiveKind == cXSAnySimpleType.PRIMITIVE_FLOAT || vItem.primitiveKind == cXSAnySimpleType.PRIMITIVE_DOUBLE || vItem.primitiveKind == cXSAnySimpleType.PRIMITIVE_DECIMAL;
};

//
module.exports = cXSAnyAtomicType;
