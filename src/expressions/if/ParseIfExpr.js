var cIfExpr = require('./IfExpr');

var cException = require('./../../classes/Exception');

var fParseExpr = require('./../ParseExpr');
var fParseExprSingle = require('./../ParseExprSingle');

// Static members
function fParseIfExpr(oLexer, oStaticContext) {
	var oCondExpr,
		oThenExpr,
		oElseExpr;
	if (oLexer.peek() == "if" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		//
		if (oLexer.eof() ||!(oCondExpr = fParseExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected if statement operand in conditional expression"
//<-Debug
			);
		//
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in for expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.peek() != "then")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'then' token in conditional if expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oThenExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected then statement operand in conditional expression"
//<-Debug
			);

		if (oLexer.peek() != "else")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'else' token in conditional if expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oElseExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected else statement operand in conditional expression"
//<-Debug
			);
		//
		return new cIfExpr(oCondExpr, oThenExpr, oElseExpr);
	}
};

//
module.exports = fParseIfExpr;
