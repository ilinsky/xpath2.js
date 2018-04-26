
var cFilterExpr = require('./../primary/FilterExpr');
var fParseAxisStep = require('./ParseAxisStep');

// Static members
function fParse(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return cFilterExpr.parse(oLexer, oStaticContext)
			|| fParseAxisStep(oLexer, oStaticContext);
};

//
module.exports = fParse;
