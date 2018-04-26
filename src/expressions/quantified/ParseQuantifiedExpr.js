var cQuantifiedExpr = require('./QuantifiedExpr');

var fParseExprSingle = require('./../ParseExprSingle');
var fParseSimpleQuantifiedBinding = require('./ParseSimpleQuantifiedBinding');

function fParse(oLexer, oStaticContext) {
	var sQuantifier	= oLexer.peek();
	if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier),
			oExpr;
		do {
			oQuantifiedExpr.bindings.push(fParseSimpleQuantifiedBinding(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "satisfies")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'satisfies' token in quantified expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected satisfies statement operand in quantified expression"
//<-Debug
			);

		oQuantifiedExpr.satisfiesExpr	= oExpr;

		return oQuantifiedExpr;
	}
};

//
module.exports = fParse;
