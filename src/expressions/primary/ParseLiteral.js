
var fParseStringLiteral = require('./ParseStringLiteral');
var fParseNumericLiteral = require('./ParseNumericLiteral');

function fParseLiteral(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseNumericLiteral(oLexer, oStaticContext)
			|| fParseStringLiteral(oLexer, oStaticContext);
};

//
module.exports = fParseLiteral;
