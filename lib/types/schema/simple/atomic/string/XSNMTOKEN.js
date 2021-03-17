var cXSConstants = require('./../../../XSConstants');

var cXSToken = require('./XSToken');

var cString = global.String;

function cXSNMTOKEN(sValue) {
	this.value	= sValue;
};

cXSNMTOKEN.prototype	= new cXSToken;
cXSNMTOKEN.prototype.builtInKind	= cXSConstants.NMTOKEN_DT;

cXSNMTOKEN.cast	= function(vValue) {
	return new cXSNMTOKEN(cString(vValue));
};

//
module.exports = cXSNMTOKEN;
