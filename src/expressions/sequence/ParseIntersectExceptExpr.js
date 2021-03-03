var cIntersectExceptExpr = require('./../sequence/IntersectExceptExpr');

var fParseInstanceofExpr = require('./../type/ParseInstanceofExpr');

function fParseIntersectExceptExpr(oLexer, oStaticContext) {
	var oExpr,
		sOperator;
	if (oLexer.eof() ||!(oExpr = fParseInstanceofExpr(oLexer, oStaticContext)))
		return;
	if (!((sOperator = oLexer.peek()) == "intersect" || sOperator == "except"))
		return oExpr;

	// IntersectExcept expression
	var oIntersectExceptExpr	= new cIntersectExceptExpr(oExpr);
	while ((sOperator = oLexer.peek()) == "intersect" || sOperator == "except") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseInstanceofExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in " + sOperator + " expression"
//<-Debug
			);
		oIntersectExceptExpr.items.push([sOperator, oExpr]);
	}
	return oIntersectExceptExpr;
};

module.exports = fParseIntersectExceptExpr;
