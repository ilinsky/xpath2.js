var fParsePathExpr = require('./../path/ParsePathExpr');

// Static members
function fParse(oLexer, oStaticContext) {
	return fParsePathExpr(oLexer, oStaticContext);
};

//
module.exports = fParse;
