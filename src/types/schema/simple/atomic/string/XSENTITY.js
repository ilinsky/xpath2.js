var cXSConstants = require('./../../../XSConstants');

var cXSNCName = require('./XSNCName');

var cString = global.String;

function cXSENTITY(sValue) {
	this.value	= sValue;
};

cXSENTITY.prototype	= new cXSNCName;
cXSENTITY.prototype.builtInKind	= cXSConstants.ENTITY_DT;

cXSENTITY.cast	= function(vValue) {
	return new cXSENTITY(cString(vValue));
};

//
module.exports = cXSENTITY;
