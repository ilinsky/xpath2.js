var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');

var cException = require('./../../../../../classes/Exception');

var cXSInt = require('./XSInt');
var cXSInteger = require('./XSInteger');

function cXSShort(nValue) {
	this.value	= nValue;
};

cXSShort.prototype	= new cXSInt;
cXSShort.prototype.builtInKind	= cXSConstants.SHORT_DT;

cXSShort.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 32767 && oValue.value >= -32768)
		return new cXSShort(oValue.value);
	//
	throw new cException("FORG0001");
};

//
module.exports = cXSShort;
