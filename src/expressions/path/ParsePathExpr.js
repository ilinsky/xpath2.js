
var cPathExpr = require('./PathExpr');

var cFunctionCall = require('./../primary/FunctionCall');
var cAxisStep = require('./AxisStep');
var fParseStepExpr = require('./ParseStepExpr');
var cKindTest = require('./tests/KindTest');

// Static members
function fParse(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;
	var sSingleSlash	= '/',
		sDoubleSlash	= '/' + '/';

	var oPathExpr	= new cPathExpr(),
		sSlash	= oLexer.peek(),
		oExpr;
	// Parse first step
	if (sSlash == sDoubleSlash || sSlash == sSingleSlash) {
		oLexer.next();
		oPathExpr.items.push(new cFunctionCall(null, "root", sNS_XPF));
		//
		if (sSlash == sDoubleSlash)
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
	}

	//
	if (oLexer.eof() ||!(oExpr = fParseStepExpr(oLexer, oStaticContext))) {
		if (sSlash == sSingleSlash)
			return oPathExpr.items[0];	// '/' expression
		if (sSlash == sDoubleSlash)
			throw new cException("XPST0003"
//->Debug
					, "Expected path step expression"
//<-Debug
			);
		return;
	}
	oPathExpr.items.push(oExpr);

	// Parse other steps
	while ((sSlash = oLexer.peek()) == sSingleSlash || sSlash == sDoubleSlash) {
		if (sSlash == sDoubleSlash)
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
		//
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseStepExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected path step expression"
//<-Debug
			);
		//
		oPathExpr.items.push(oExpr);
	}

	if (oPathExpr.items.length == 1)
		return oPathExpr.items[0];

	//
	return oPathExpr;
};

//
module.exports = fParse;
