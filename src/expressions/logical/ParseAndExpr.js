var cAndExpr = require('./AndExpr');

var fParseComparisonExpr = require('./../comparison/ParseComparisonExpr');

// Static members
function fParse(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseComparisonExpr(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "and")
		return oExpr;

	// And expression
	var oAndExpr	= new cAndExpr(oExpr);
	while (oLexer.peek() == "and") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseComparisonExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in logical expression"
//<-Debug
			);
		oAndExpr.items.push(oExpr);
	}
	return oAndExpr;
};

//
module.exports = fParse;
