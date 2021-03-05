/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */
var fXSAnyAtomicType_isNumeric = require('./../../types/schema/isNumeric');

var fFunction_sequence_atomize = require('./../../functions/sequence').atomize;
var fFunction_sequence_assertSequenceCardinality = require('./../../functions/sequence').assertSequenceCardinality;

var cXSUntypedAtomic = require('./../../types/schema/simple/atomic/XSUntypedAtomic');

var cStaticContext = require('./../../classes/StaticContext');

//
var hStaticContext_operators = cStaticContext.operators;

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
		return hStaticContext_operators["numeric-unary-minus"].call(oContext, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cUnaryExpr.operators['+']	= function(oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oRight))
		return hStaticContext_operators["numeric-unary-plus"].call(oContext, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

cUnaryExpr.prototype.evaluate	= function (oContext) {
	var oRight	= fFunction_sequence_atomize(this.expression.evaluate(oContext), oContext);

	//
	if (!oRight.length)
		return [];
	// Assert cardinality
 	fFunction_sequence_assertSequenceCardinality(oRight, oContext, '?'
//->Debug
 			, "second operand of '" + this.operator + "'"
//<-Debug
 	);

	var vRight	= oRight[0];
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= cXSDouble.cast(vRight);	// cast to xs:double

	return [cUnaryExpr.operators[this.operator](vRight, oContext)];
};

//
module.exports = cUnaryExpr;
