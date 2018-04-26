var cForExpr = require('./ForExpr');
var fParseExprSingle = require('./../ParseExprSingle');
var fParseSimpleForBinding = require('./ParseSimpleForBinding');

function fParse(oLexer, oStaticContext) {
	if (oLexer.peek() == "for" && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oForExpr	= new cForExpr,
			oExpr;
		do {
			oForExpr.bindings.push(fParseSimpleForBinding(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "return")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'return' token in for expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected return statement operand in for expression"
//<-Debug
			);

		oForExpr.returnExpr	= oExpr;

		return oForExpr;
	}
};

//
module.exports = fParse;
