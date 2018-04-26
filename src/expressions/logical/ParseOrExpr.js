var cOrExpr = require('./OrExpr');

var fParseAndExpr = require('./ParseAndExpr');

// Static members
function fParse(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseAndExpr(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "or")
		return oExpr;

	// Or expression
	var oOrExpr	= new cOrExpr(oExpr);
	while (oLexer.peek() == "or") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseAndExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in logical expression"
//<-Debug
			);
		oOrExpr.items.push(oExpr);
	}
	return oOrExpr;
};

//
module.exports = fParse;
