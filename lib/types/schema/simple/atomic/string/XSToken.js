var cXSConstants = require('./../../../XSConstants');

var cXSNormalizedString = require('./XSNormalizedString');

var cString = global.String;

function cXSToken(sValue) {
	this.value	= sValue;
};

cXSToken.prototype	= new cXSNormalizedString;
cXSToken.prototype.builtInKind	= cXSConstants.TOKEN_DT;

cXSToken.cast	= function(vValue) {
	return new cXSToken(cString(vValue));
};

//
module.exports = cXSToken;
