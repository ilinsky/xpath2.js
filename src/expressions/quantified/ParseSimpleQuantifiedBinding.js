var cSimpleQuantifiedBinding = require('./SimpleQuantifiedBinding');

var fParseExprSingle = require('./../ParseExprSingle');

function fParse(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().substr(1).match(rNameTest);
	if (!aMatch)
		throw new cException("XPST0003"
//->Debug
				, "Expected binding in quantified expression"
//<-Debug
		);

	if (aMatch[1] == '*' || aMatch[2] == '*')
		throw new cException("XPST0003"
//->Debug
				, "Illegal use of wildcard in quantified expression binding variable name"
//<-Debug
		);

	oLexer.next();
	if (oLexer.peek() != "in")
		throw new cException("XPST0003"
//->Debug
				, "Expected 'in' token in quantified expression binding"
//<-Debug
		);

	oLexer.next();
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected in statement operand in quantified expression binding"
//<-Debug
		);

	return new cSimpleQuantifiedBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
};

//
module.exports = fParse;
