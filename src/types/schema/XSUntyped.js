var cXSConstants = require('./XSConstants');

var cXSAnyType = require('./XSAnyType');

function cXSUntyped() {

};

cXSUntyped.prototype	= new cXSAnyType;
cXSUntyped.prototype.builtInKind	= cXSConstants.UNAVAILABLE_DT;

//
module.exports = cXSUntyped;
