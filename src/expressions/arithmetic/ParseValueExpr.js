var fParsePathExpr = require('./../path/ParsePathExpr');

// Static members
function fParseValueExpr(oLexer, oStaticContext) {
	return fParsePathExpr(oLexer, oStaticContext);
};

//
module.exports = fParseValueExpr;
