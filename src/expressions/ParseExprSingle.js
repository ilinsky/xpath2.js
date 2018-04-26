var fParseIfExpr = require('./if/ParseIfExpr');
var fParseForExpr = require('./for/ParseForExpr');
var fParseQuantifiedExpr = require('./quantified/ParseQuantifiedExpr');
var fParseOrExpr = require('./logical/ParseOrExpr');

// Static members
function fParse(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseIfExpr(oLexer, oStaticContext)
			|| fParseForExpr(oLexer, oStaticContext)
			|| fParseQuantifiedExpr(oLexer, oStaticContext)
			|| fParseOrExpr(oLexer, oStaticContext);
};

//
module.exports = fParse;
