
var fParseFilterExpr = require('./../primary/ParseFilterExpr');
var fParseAxisStep = require('./ParseAxisStep');

// Static members
function fParseStepExpr(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseFilterExpr(oLexer, oStaticContext)
			|| fParseAxisStep(oLexer, oStaticContext);
};

//
module.exports = fParseStepExpr;
