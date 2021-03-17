var cXSConstants = require('./../../../XSConstants');

var cXSName = require('./XSName');

var cString = global.String;

function cXSNCName(sValue) {
	this.value	= sValue;
};

cXSNCName.prototype	= new cXSName;
cXSNCName.prototype.builtInKind	= cXSConstants.NCNAME_DT;

cXSNCName.cast	= function(vValue) {
	return new cXSNCName(cString(vValue));
};

//
module.exports = cXSNCName;
