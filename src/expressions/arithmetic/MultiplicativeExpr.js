var cException = require('./../../classes/Exception');
var cSequence = require('./../../classes/Sequence');
var cStaticContext = require('./../../classes/StaticContext');

var cXSUntypedAtomic = require('./../../types/schema/simple/atomic/XSUntypedAtomic');
var cXSYearMonthDuration = require('./../../types/schema/simple/atomic/duration/XSYearMonthDuration');
var cXSDayTimeDuration = require('./../../types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSAnyAtomicType = require('./../../types/schema/simple/XSAnyAtomicType');

function cMultiplicativeExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cMultiplicativeExpr.prototype.left	= null;
cMultiplicativeExpr.prototype.items	= null;

//
cMultiplicativeExpr.operators	= {};
cMultiplicativeExpr.operators['*']		= function (oLeft, oRight, oContext) {
	var sOperator	= '',
		bReverse	= false;

	if (cXSAnyAtomicType.isNumeric(oLeft)) {
		if (cXSAnyAtomicType.isNumeric(oRight))
			sOperator	= "numeric-multiply";
		else
		if (oRight instanceof cXSYearMonthDuration) {
			sOperator	= "multiply-yearMonthDuration";
			bReverse	= true;
		}
		else
		if (oRight instanceof cXSDayTimeDuration) {
			sOperator	= "multiply-dayTimeDuration";
			bReverse	= true;
		}
	}
	else {
		if (oLeft instanceof cXSYearMonthDuration) {
			if (cXSAnyAtomicType.isNumeric(oRight))
				sOperator	= "multiply-yearMonthDuration";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (cXSAnyAtomicType.isNumeric(oRight))
				sOperator	= "multiply-dayTimeDuration";
		}
	}

	// Call operator function
	if (sOperator)
		return cStaticContext.operators[sOperator].call(oContext, bReverse ? oRight : oLeft, bReverse ? oLeft : oRight);

	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cMultiplicativeExpr.operators['div']	= function (oLeft, oRight, oContext) {
	var sOperator	= '';

	if (cXSAnyAtomicType.isNumeric(oLeft)) {
		if (cXSAnyAtomicType.isNumeric(oRight))
			sOperator	= "numeric-divide";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (cXSAnyAtomicType.isNumeric(oRight))
			sOperator	= "divide-yearMonthDuration";
		else
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "divide-yearMonthDuration-by-yearMonthDuration";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (cXSAnyAtomicType.isNumeric(oRight))
			sOperator	= "divide-dayTimeDuration";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "divide-dayTimeDuration-by-dayTimeDuration";
	}
	// Call operator function
	if (sOperator)
		return cStaticContext.operators[sOperator].call(oContext, oLeft, oRight);

	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cMultiplicativeExpr.operators['idiv']	= function (oLeft, oRight, oContext) {
	if (cXSAnyAtomicType.isNumeric(oLeft) && cXSAnyAtomicType.isNumeric(oRight))
		return cStaticContext.operators["numeric-integer-divide"].call(oContext, oLeft, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cMultiplicativeExpr.operators['mod']	= function (oLeft, oRight, oContext) {
	if (cXSAnyAtomicType.isNumeric(oLeft) && cXSAnyAtomicType.isNumeric(oRight))
		return cStaticContext.operators["numeric-mod"].call(oContext, oLeft, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Public members
cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= cSequence.atomize(this.left.evaluate(oContext), oContext);

	//
	if (!oLeft.length)
		return [];
	// Assert cardinality
 	cSequence.assertSequenceCardinality(oLeft, oContext, '?'
//->Debug
 			, "first operand of '" + this.items[0][0] + "'"
//<-Debug
 	);

	var vLeft	= oLeft[0];
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSDouble.cast(vLeft);	// cast to xs:double

	for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
		oRight	= cSequence.atomize(this.items[nIndex][1].evaluate(oContext), oContext);

		if (!oRight.length)
			return [];
		// Assert cardinality
 		cSequence.assertSequenceCardinality(oRight, oContext, '?'
//->Debug
 				, "second operand of '" + this.items[nIndex][0] + "'"
//<-Debug
 		);

		vRight	= oRight[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= cMultiplicativeExpr.operators[this.items[nIndex][0]](vLeft, vRight, oContext);
	}
	return [vLeft];
};

//
module.exports = cMultiplicativeExpr;
