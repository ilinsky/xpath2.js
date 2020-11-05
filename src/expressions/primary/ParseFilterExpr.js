var cFilterExpr = require('./FilterExpr');

var fParsePrimaryExpr = require('./ParsePrimaryExpr');
var fParseStepExprPredicates = require('./../path/ParseStepExprPredicates');

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

module.exports = fParseFilterExpr;