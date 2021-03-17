var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');

var cXSInteger = require('./XSInteger');
var cXSNonNegativeInteger = require('./XSNonNegativeInteger');

function cXSPositiveInteger(nValue) {
	this.value	= nValue;
};

cXSPositiveInteger.prototype	= new cXSNonNegativeInteger;
cXSPositiveInteger.prototype.builtInKind	= cXSConstants.POSITIVEINTEGER_DT;

cXSPositiveInteger.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value >= 1)
		return new cXSPositiveInteger(oValue.value);
	//
	throw new cException("FORG0001");
};

//
module.exports = cXSPositiveInteger;
