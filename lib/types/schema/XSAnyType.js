var cXSConstants = require('./XSConstants');

function cXSAnyType() {

};

cXSAnyType.prototype.builtInKind	= cXSConstants.ANYTYPE_DT;

//
module.exports = cXSAnyType;
