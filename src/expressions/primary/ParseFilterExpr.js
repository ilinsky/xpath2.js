var cFilterExpr = require('./FilterExpr');

var fParsePrimaryExpr = require('./ParsePrimaryExpr');
//var fParseStepExprPredicates = require('./../path/ParseStepExprPredicates');

// Static members
function fParseFilterExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParsePrimaryExpr(oLexer, oStaticContext)))
		return;

	var oFilterExpr	= new cFilterExpr(oExpr);
	// Parse predicates
    fParseStepExprPredicates(oLexer, oStaticContext, oFilterExpr);

	// If no predicates found
	if (oFilterExpr.predicates.length == 0)
		return oFilterExpr.expression;

	return oFilterExpr;
};

function fParseStepExprPredicates(oLexer, oStaticContext, oStep) {
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

module.exports = fParseFilterExpr;