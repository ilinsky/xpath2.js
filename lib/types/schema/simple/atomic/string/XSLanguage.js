var cXSConstants = require('./../../../XSConstants');

var cXSToken = require('./XSToken');

var cString = global.String;

function cXSLanguage(sValue) {
	this.value	= sValue;
};

cXSLanguage.prototype	= new cXSToken;
cXSLanguage.prototype.builtInKind	= cXSConstants.LANGUAGE_DT;

cXSLanguage.cast	= function(vValue) {
	return new cXSLanguage(cString(vValue));
};

//
module.exports = cXSLanguage;
