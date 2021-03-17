var cXSConstants = require('./../../../XSConstants');

var cXSNCName = require('./XSNCName');

var cString = global.String;

function cXSIDREF(sValue) {
	this.value	= sValue;
};

cXSIDREF.prototype	= new cXSNCName;
cXSIDREF.prototype.builtInKind	= cXSConstants.IDREF_DT;

cXSIDREF.cast	= function(vValue) {
	return new cXSIDREF(cString(vValue));
};

//
module.exports = cXSIDREF;
