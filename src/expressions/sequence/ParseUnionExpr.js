var fParseIntersectExceptExpr = require('./../sequence/ParseIntersectExceptExpr');

var cUnionExpr = require('./../sequence/UnionExpr');

function fParseUnionExpr(oLexer, oStaticContext) {
	var oExpr,
		sOperator;
	if (oLexer.eof() ||!(oExpr = fParseIntersectExceptExpr(oLexer, oStaticContext)))
		return;
	if (!((sOperator = oLexer.peek()) == '|' || sOperator == "union"))
		return oExpr;

	// Union expression
	var oUnionExpr	= new cUnionExpr(oExpr);
	while ((sOperator = oLexer.peek()) == '|' || sOperator == "union") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseIntersectExceptExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in union expression"
//<-Debug
			);
		oUnionExpr.items.push(oExpr);
	}
	return oUnionExpr;
};

module.exports = fParseUnionExpr;
