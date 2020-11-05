var fParseExpr = require('./../ParseExpr');

function fParseStepExprPredicate(oLexer, oStaticContext, oStep) {
	var oExpr;
	// Parse predicates
	while (oLexer.peek() == '[') {
		oLexer.next();

		if (oLexer.eof() ||!(oExpr = fParseExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression in predicate"
//<-Debug
			);

		oStep.predicates.push(oExpr);

		if (oLexer.peek() != ']')
			throw new cException("XPST0003"
//->Debug
					, "Expected ']' token in predicate"
//<-Debug
			);

		oLexer.next();
	}
};

//
module.exports = fParseStepExprPredicate;
