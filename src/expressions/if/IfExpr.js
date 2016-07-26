/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cIfExpr(oCondExpr, oThenExpr, oElseExpr) {
	this.condExpr	= oCondExpr;
	this.thenExpr		= oThenExpr;
	this.elseExpr		= oElseExpr;
};

cIfExpr.prototype.condExpr	= null;
cIfExpr.prototype.thenExpr	= null;
cIfExpr.prototype.elseExpr	= null;

// Static members
function fIfExpr_parse (oLexer, oStaticContext) {
	var oCondExpr,
		oThenExpr,
		oElseExpr;
	if (oLexer.peek() == "if" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		//
		if (oLexer.eof() ||!(oCondExpr = fExpr_parse(oLexer, oStaticContext)))
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
		if (oLexer.eof() ||!(oThenExpr = fExprSingle_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected then statement operand in condional expression"
//<-Debug
			);

		if (oLexer.peek() != "else")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'else' token in conditional if expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oElseExpr = fExprSingle_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected else statement operand in condional expression"
//<-Debug
			);
		//
		return new cIfExpr(oCondExpr, oThenExpr, oElseExpr);
	}
};

// Public members
cIfExpr.prototype.evaluate	= function (oContext) {
	return this[fFunction_sequence_toEBV(this.condExpr.evaluate(oContext), oContext) ? "thenExpr" : "elseExpr"].evaluate(oContext);
};
