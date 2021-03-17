var cLiteral = require('./Literal');

function cNumericLiteral(oValue) {
	this.value	= oValue;
};

cNumericLiteral.prototype	= new cLiteral;

//
module.exports = cNumericLiteral;
