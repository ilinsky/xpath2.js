var cNumericLiteral = require('./NumericLiteral');
var fParseXSNumeric = require('./../../types').parseXSNumeric;

// Integer | Decimal | Double
function fParseNumericLiteral(oLexer, oStaticContext) {
	var sValue	= oLexer.peek(),
		vValue	= fParseXSNumeric(sValue);
	if (vValue) {
		oLexer.next();
		return new cNumericLiteral(vValue);
	}
};

//
module.exports = fParseNumericLiteral;
