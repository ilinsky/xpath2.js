var cStringLiteral = require('./StringLiteral');
var cXSString = require('./../../types').XSString;

var rStringLiteral	= /^'([^']*(?:''[^']*)*)'|"([^"]*(?:""[^"]*)*)"$/;
function fParse(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rStringLiteral);
	if (aMatch) {
		oLexer.next();
		return new cStringLiteral(new cXSString(aMatch[1] ? aMatch[1].replace("''", "'") : aMatch[2] ? aMatch[2].replace('""', '"') : ''));
	}
};

//
module.exports = fParse;
