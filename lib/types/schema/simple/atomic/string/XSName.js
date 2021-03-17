var cXSConstants = require('./../../../XSConstants');

var cXSToken = require('./XSToken');

var cString = global.String;

function cXSName(sValue) {
	this.value	= sValue;
};

cXSName.prototype	= new cXSToken;
cXSName.prototype.builtInKind	= cXSConstants.NAME_DT;

cXSName.cast	= function(vValue) {
	return new cXSName(cString(vValue));
};

//
module.exports = cXSName;
