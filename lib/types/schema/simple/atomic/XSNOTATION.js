var cException = require('./../../../../classes/Exception');

var cXSConstants = require('./../../XSConstants');

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
module.exports = cXSNOTATION;
