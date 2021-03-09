/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../classes/Exception');
var cStaticContext = require('./../../classes/StaticContext');

var cXSAnyAtomicType = require('./../../types/schema/simple/XSAnyAtomicType');
var cXSUntypedAtomic = require('./../../types/schema/simple/atomic/XSUntypedAtomic');

var fFunction_sequence_atomize = require('./../../functions/sequence').atomize;
var fFunction_sequence_assertSequenceCardinality = require('./../../functions/sequence').assertSequenceCardinality;

function cUnaryExpr(sOperator, oExpr) {
	this.operator	= sOperator;
	this.expression	= oExpr;
};

cUnaryExpr.prototype.operator	= null;
cUnaryExpr.prototype.expression	= null;

//
cUnaryExpr.operators	= {};
cUnaryExpr.operators['-']	= function(oRight, oContext) {
	if (cXSAnyAtomicType.isNumeric(oRight))
		return cStaticContext.operators["numeric-unary-minus"].call(oContext, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cUnaryExpr.operators['+']	= function(oRight, oContext) {
	if (cXSAnyAtomicType.isNumeric(oRight))
		return cStaticContext.operators["numeric-unary-plus"].call(oContext, oRight);
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
