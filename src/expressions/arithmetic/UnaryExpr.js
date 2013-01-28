/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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
var hUnaryExpr_operators	= {};
hUnaryExpr_operators['-']	= function(oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oRight))
		return hStaticContext_operators["numeric-unary-minus"].call(oContext, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
hUnaryExpr_operators['+']	= function(oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oRight))
		return hStaticContext_operators["numeric-unary-plus"].call(oContext, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Static members
// UnaryExpr	:= ("-" | "+")* ValueExpr
function fUnaryExpr_parse (oLexer, oStaticContext) {
	if (oLexer.eof())
		return;
	if (!(oLexer.peek() in hUnaryExpr_operators))
		return fValueExpr_parse(oLexer, oStaticContext);

	// Unary expression
	var sOperator	= '+',
		oExpr;
	while (oLexer.peek() in hUnaryExpr_operators) {
		if (oLexer.peek() == '-')
			sOperator	= sOperator == '-' ? '+' : '-';
		oLexer.next();
	}
	if (oLexer.eof() ||!(oExpr = fValueExpr_parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected operand in unary expression"
//<-Debug
		);
	return new cUnaryExpr(sOperator, oExpr);
};

cUnaryExpr.prototype.evaluate	= function (oContext) {
	var oRight	= fFunction_sequence_atomize(this.expression.evaluate(oContext), oContext);

	//
	if (!oRight.length)
		return [];
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
			, "second operand of '" + this.operator + "'"
//<-Debug
	);

	var vRight	= oRight[0];
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= cXSDouble.cast(vRight);	// cast to xs:double

	return [hUnaryExpr_operators[this.operator](vRight, oContext)];
};