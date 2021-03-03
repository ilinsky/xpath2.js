var cComparisonExpr = require('./ComparisonExpr');

var cException = require('./../../classes/Exception');

var fParseRangeExpr = require('./../sequence/ParseRangeExpr');

// Static members
function fParseComparisonExpr(oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = fParseRangeExpr(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cComparisonExpr.operators))
		return oExpr;

	// Comparison expression
	var sOperator	= oLexer.peek();
	oLexer.next();
	if (oLexer.eof() ||!(oRight = fParseRangeExpr(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in comparison expression"
//<-Debug
		);
	return new cComparisonExpr(oExpr, oRight, sOperator);
};

//
module.exports = fParseComparisonExpr;
