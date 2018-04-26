var cRangeExpr = require('./RangeExpr');

var fParseAdditiveExpr = require('./../arithmetic/ParseAdditiveExpr');

// Static members
function fParse(oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = fParseAdditiveExpr(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	if (oLexer.eof() ||!(oRight = fParseAdditiveExpr(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in range expression"
//<-Debug
		);
	return new cRangeExpr(oExpr, oRight);
};

//
module.exports = fParse;
