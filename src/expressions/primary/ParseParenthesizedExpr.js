var cParenthesizedExpr = require('./ParenthesizedExpr');

var fParseExpr = require('./../ParseExpr');

function fParseParenthesizedExpr(oLexer, oStaticContext) {
	if (oLexer.peek() == '(') {
		oLexer.next();
		// Check if not empty (allowed)
		var oExpr	= null;
		if (oLexer.peek() != ')')
			oExpr	= fParseExpr(oLexer, oStaticContext);

		//
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in parenthesized expression"
//<-Debug
			);

		oLexer.next();

		//
		return new cParenthesizedExpr(oExpr);
	}
};

//
module.exports = fParseParenthesizedExpr;
