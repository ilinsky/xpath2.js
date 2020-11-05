
var fParseAxisStep = require('./../path/ParseAxisStep');
var fParseExprSingle = require('./../ParseExprSingle');

var cFunctionCall = require('./FunctionCall');
var cKindTest = require('./../path/tests/KindTest');

// TODO: Copied over from cNameTest
var rNameTest	= /^(?:(?![0-9-])(\w[\w.-]*|\*)\:)?(?![0-9-])(\w[\w.-]*|\*)$/;

function fParseFunctionCall(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch && oLexer.peek(1) == '(') {
		// Reserved "functions"
		if (!aMatch[1] && (aMatch[2] in cKindTest.names))
			return fParseAxisStep(oLexer, oStaticContext);
		// Other functions
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of wildcard in function name"
//<-Debug
			);

		var oFunctionCallExpr	= new cFunctionCall(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultFunctionNamespace),
			oExpr;
		oLexer.next(2);
		//
		if (oLexer.peek() != ')') {
			do {
				if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
					throw new cException("XPST0003"
//->Debug
							, "Expected function call argument"
//<-Debug
					);
				//
				oFunctionCallExpr.args.push(oExpr);
			}
			while (oLexer.peek() == ',' && oLexer.next());
			//
			if (oLexer.peek() != ')')
				throw new cException("XPST0003"
//->Debug
						, "Expected ')' token in function call"
//<-Debug
				);
		}
		oLexer.next();
		return oFunctionCallExpr;
	}
};

//
module.exports = fParseFunctionCall;
