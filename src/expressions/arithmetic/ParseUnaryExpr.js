var cUnaryExpr = require('./UnaryExpr');

var fParseValueExpr = require('./ParseValueExpr');

// UnaryExpr	:= ("-" | "+")* ValueExpr
function fParseUnaryExpr(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;
	if (!(oLexer.peek() in cUnaryExpr.operators))
		return fParseValueExpr(oLexer, oStaticContext);

	// Unary expression
	var sOperator	= '+',
		oExpr;
	while (oLexer.peek() in cUnaryExpr.operators) {
		if (oLexer.peek() == '-')
			sOperator	= sOperator == '-' ? '+' : '-';
		oLexer.next();
	}
	if (oLexer.eof() ||!(oExpr = fParseValueExpr(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected operand in unary expression"
//<-Debug
		);
	return new cUnaryExpr(sOperator, oExpr);
};

//
module.exports = fParseUnaryExpr;
