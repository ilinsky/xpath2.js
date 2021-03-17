var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');

var cXSInteger = require('./XSInteger');

function cXSNonPositiveInteger(nValue) {
	this.value	= nValue;
};

cXSNonPositiveInteger.prototype	= new cXSInteger;
cXSNonPositiveInteger.prototype.builtInKind	= cXSConstants.NONPOSITIVEINTEGER_DT;

cXSNonPositiveInteger.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 0)
		return new cXSNonPositiveInteger(oValue.value);
	//
	throw new cException("FORG0001");
};

//
module.exports = cXSNonPositiveInteger;
