var cAxisStep = require('./AxisStep');
var cKindTest = require('./tests/KindTest');

var fParseStepExprPredicates = require('./ParseStepExprPredicates');
var fParseNodeTest = require('./tests/ParseNodeTest');

// Static members
function fParse(oLexer, oStaticContext) {
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

//
module.exports = fParse;
