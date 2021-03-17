var cLiteral = require('./Literal');

function cStringLiteral(oValue) {
	this.value	= oValue;
};

cStringLiteral.prototype	= new cLiteral;

//
module.exports = cStringLiteral;
