var cAdditiveExpr = require('./AdditiveExpr');

var cMultiplicativeExpr = require('./MultiplicativeExpr');

// Static members
function fParse(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cAdditiveExpr.operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cAdditiveExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in additive expression"
//<-Debug
			);
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

//
module.exports = fParse;
