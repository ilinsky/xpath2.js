var cIfExpr = require('./if/IfExpr');
var cForExpr = require('./for/ForExpr');
var cQuantifiedExpr = require('./quantified/QuantifiedExpr');
var cSimpleQuantifiedBinding = require('./quantified/SimpleQuantifiedBinding');
var cSimpleForBinding = require('./for/SimpleForBinding');

var cException = require('./../classes/Exception');

var rNameTest	= /^(?:(?![0-9-])(\w[\w.-]*|\*)\:)?(?![0-9-])(\w[\w.-]*|\*)$/;

var fParseOrExpr = require('./logical/ParseOrExpr');

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

function fParseForExpr(oLexer, oStaticContext) {
	if (oLexer.peek() == "for" && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oForExpr	= new cForExpr,
			oExpr;
		do {
			oForExpr.bindings.push(fParseSimpleForBinding(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "return")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'return' token in for expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected return statement operand in for expression"
//<-Debug
			);

		oForExpr.returnExpr	= oExpr;

		return oForExpr;
	}
};

function fParseQuantifiedExpr(oLexer, oStaticContext) {
	var sQuantifier	= oLexer.peek();
	if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier),
			oExpr;
		do {
			oQuantifiedExpr.bindings.push(fParseSimpleQuantifiedBinding(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "satisfies")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'satisfies' token in quantified expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected satisfies statement operand in quantified expression"
//<-Debug
			);

		oQuantifiedExpr.satisfiesExpr	= oExpr;

		return oQuantifiedExpr;
	}
};

function fParseSimpleQuantifiedBinding(oLexer, oStaticContext) {
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

function fParseSimpleForBinding(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().substr(1).match(rNameTest);
	if (!aMatch)
		throw new cException("XPST0003"
//->Debug
				, "Expected binding in for expression"
//<-Debug
		);

	if (aMatch[1] == '*' || aMatch[2] == '*')
		throw new cException("XPST0003"
//->Debug
				, "Illegal use of wildcard in for expression binding variable name"
//<-Debug
		);

	oLexer.next();
	if (oLexer.peek() != "in")
		throw new cException("XPST0003"
//->Debug
				, "Expected 'in' token in for expression binding"
//<-Debug
		);

	oLexer.next();
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected in statement operand in for expression binding"
//<-Debug
		);

	return new cSimpleForBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
};

//var fParseIfExpr = require('./if/ParseIfExpr');
//var fParseForExpr = require('./for/ParseForExpr');
//var fParseQuantifiedExpr = require('./quantified/ParseQuantifiedExpr');
//var fParseOrExpr = require('./logical/ParseOrExpr');

function fParseExprSingle(oLexer, oStaticContext) {
    return fParseIfExpr(oLexer, oStaticContext)
		|| fParseForExpr(oLexer, oStaticContext)
		|| fParseQuantifiedExpr(oLexer, oStaticContext)
		|| fParseOrExpr(oLexer, oStaticContext);
};

module.exports = fParseExprSingle;