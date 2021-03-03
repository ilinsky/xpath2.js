var cAxisStep = require('./AxisStep');
var cKindTest = require('./tests/KindTest');

var cException = require('./../../classes/Exception');

//var fParseStepExprPredicates = require('./ParseStepExprPredicates');
var fParseNodeTest = require('./tests/ParseNodeTest');

// Static members
function fParseAxisStep(oLexer, oStaticContext) {
	var sAxis	= oLexer.peek(),
		oExpr,
		oStep;
	if (oLexer.peek(1) == '::') {
		if (!(sAxis in cAxisStep.axises))
			throw new cException("XPST0003"
//->Debug
					, "Unknown axis name: " + sAxis
//<-Debug
			);

		oLexer.next(2);
		if (oLexer.eof() ||!(oExpr = fParseNodeTest(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep(sAxis, oExpr);
	}
	else
	if (sAxis == '..') {
		oLexer.next();
		oStep	= new cAxisStep("parent", new cKindTest("node"));
	}
	else
	if (sAxis == '@') {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseNodeTest(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep("attribute", oExpr);
	}
	else {
		if (oLexer.eof() ||!(oExpr = fParseNodeTest(oLexer, oStaticContext)))
			return;
		oStep	= new cAxisStep(oExpr instanceof cKindTest && oExpr.name == "attribute" ? "attribute" : "child", oExpr);
	}
	//
	fParseStepExprPredicates(oLexer, oStaticContext, oStep);

	return oStep;
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

//
module.exports = fParseAxisStep;
