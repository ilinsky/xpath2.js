var cException = require('./../../classes/Exception');
var cSequence = require('./../../classes/Sequence');
var cStaticContext = require('./../../classes/StaticContext');

var cXSAnyAtomicType = require('./../../types/schema/simple/XSAnyAtomicType');
var cXSUntypedAtomic = require('./../../types/schema/simple/atomic/XSUntypedAtomic');

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
	var oRight	= cSequence.atomize(this.expression.evaluate(oContext), oContext);

	//
	if (!oRight.length)
		return [];
	// Assert cardinality
 	cSequence.assertSequenceCardinality(oRight, oContext, '?'
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
