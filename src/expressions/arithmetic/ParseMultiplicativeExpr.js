var cMultiplicativeExpr = require('./MultiplicativeExpr');

var fParseUnionExpr = require('./../sequence/ParseUnionExpr');

function fParseMultiplicativeExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseUnionExpr(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cMultiplicativeExpr.operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cMultiplicativeExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseUnionExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in multiplicative expression"
//<-Debug
			);
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

module.exports = fParseMultiplicativeExpr;
