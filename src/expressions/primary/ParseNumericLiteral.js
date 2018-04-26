var cNumericLiteral = require('./NumericLiteral');
var cXSInteger = require('./../../types').XSInteger;

// Integer | Decimal | Double
var rNumericLiteral	= /^[+\-]?(?:(?:(\d+)(?:\.(\d*))?)|(?:\.(\d+)))(?:[eE]([+-])?(\d+))?$/;
function fParse(oLexer, oStaticContext) {
	var sValue	= oLexer.peek(),
		vValue	= fParseValue(sValue);
	if (vValue) {
		oLexer.next();
		return new cNumericLiteral(vValue);
	}
};

function fParseValue(sValue) {
	var aMatch	= sValue.match(rNumericLiteral);
	if (aMatch) {
		var cType	= cXSInteger;
		if (aMatch[5])
			cType	= cXSDouble;
		else
		if (aMatch[2] || aMatch[3])
			cType	= cXSDecimal;
		return new cType(+sValue);
	}
};

//
module.exports = fParse;
