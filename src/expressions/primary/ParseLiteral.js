
var fParseStringLiteral = require('./ParseStringLiteral');
var fParseNumericLiteral = require('./ParseNumericLiteral');

function fParse(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseNumericLiteral(oLexer, oStaticContext)
			|| fParseStringLiteral(oLexer, oStaticContext);
};

//
module.exports = fParse;
