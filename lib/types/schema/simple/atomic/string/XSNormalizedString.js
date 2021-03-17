var cXSConstants = require('./../../../XSConstants');

var cXSString = require('./../XSString');

var cString = global.String;

function cXSNormalizedString(sValue) {
	this.value	= sValue;
};

cXSNormalizedString.prototype	= new cXSString;
cXSNormalizedString.prototype.builtInKind	= cXSConstants.NORMALIZEDSTRING_DT;

cXSNormalizedString.cast	= function(vValue) {
	return new cXSNormalizedString(cString(vValue));
};

//
module.exports = cXSNormalizedString;
