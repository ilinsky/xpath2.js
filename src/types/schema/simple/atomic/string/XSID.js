var cXSConstants = require('./../../../XSConstants');

var cXSNCName = require('./XSNCName');

var cString = global.String;

function cXSID(sValue) {
	this.value	= sValue;
};

cXSID.prototype	= new cXSNCName;
cXSID.prototype.builtInKind	= cXSConstants.ID_DT;

cXSID.cast	= function(vValue) {
	return new cXSID(cString(vValue));
};

//
module.exports = cXSID;
