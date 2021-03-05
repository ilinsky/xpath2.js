var cXSDecimal = require('./simple/atomic/XSDecimal');
var cXSDouble = require('./simple/atomic/XSDouble');
var cXSFloat = require('./simple/atomic/XSFloat');

function isNumeric(vItem) {
	return vItem instanceof cXSFloat || vItem instanceof cXSDouble || vItem instanceof cXSDecimal;
};

module.exports = isNumeric;