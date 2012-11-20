/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cUnaryExpr(sOperator, oExpr) {
	this.operator	= sOperator;
	this.expression	= oExpr;
};

cUnaryExpr.prototype.operator	= null;
cUnaryExpr.prototype.expression	= null;

//
cUnaryExpr.operators	= {};
cUnaryExpr.operators['-']	= function(oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oRight))
		return hXPath2StaticContext_operators["numeric-unary-minus"].call(oContext, oRight);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cUnaryExpr.operators['+']	= function(oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oRight))
		return hXPath2StaticContext_operators["numeric-unary-plus"].call(oContext, oRight);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Static members
// UnaryExpr	:= ("-" | "+")* ValueExpr
cUnaryExpr.parse	= function (oLexer, oStaticContext) {
	if (oLexer.eof())
		return;
	if (!(oLexer.peek() in cUnaryExpr.operators))
		return cValueExpr.parse(oLexer, oStaticContext);

	// Unary expression
	var sOperator	= '+',
		oExpr;
	while (oLexer.peek() in cUnaryExpr.operators) {
		if (oLexer.peek() == '-')
			sOperator	= sOperator == '-' ? '+' : '-';
		oLexer.next();
	}
	if (oLexer.eof() ||!(oExpr = cValueExpr.parse(oLexer, oStaticContext)))
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected operand in unary expression"
//<-Debug
		);
	return new cUnaryExpr(sOperator, oExpr);
};

cUnaryExpr.prototype.evaluate	= function (oContext) {
	var oRight	= cXPath2Sequence.atomize(this.expression.evaluate(oContext), oContext);

	//
	if (oRight.isEmpty())
		return new cXPath2Sequence;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
			, "second operand of '" + this.operator + "'"
//<-Debug
	);

	var vRight	= oRight.items[0];
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= cXSDouble.cast(vRight);	// cast to xs:double

	return new cXPath2Sequence(cUnaryExpr.operators[this.operator](vRight, oContext));
};