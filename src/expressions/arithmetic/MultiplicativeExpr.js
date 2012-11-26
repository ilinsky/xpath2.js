/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cMultiplicativeExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cMultiplicativeExpr.prototype.left	= null;
cMultiplicativeExpr.prototype.items	= null;

//
var hMultiplicativeExpr_operators	= {};
hMultiplicativeExpr_operators['*']		= function (oLeft, oRight, oContext) {
	var sOperator	= '',
		bReverse	= false;

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
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
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "multiply-yearMonthDuration";
		}
		else
		if (oLeft instanceof cXSDayTimeDuration) {
			if (fXSAnyAtomicType_isNumeric(oRight))
				sOperator	= "multiply-dayTimeDuration";
		}
	}

	// Call operator function
	if (sOperator)
		return hStaticContext_operators[sOperator].call(oContext, bReverse ? oRight : oLeft, bReverse ? oLeft : oRight);

	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
hMultiplicativeExpr_operators['div']	= function (oLeft, oRight, oContext) {
	var sOperator	= '';

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "numeric-divide";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "divide-yearMonthDuration";
		else
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "divide-yearMonthDuration-by-yearMonthDuration";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "divide-dayTimeDuration";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "divide-dayTimeDuration-by-dayTimeDuration";
	}
	// Call operator function
	if (sOperator)
		return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
hMultiplicativeExpr_operators['idiv']	= function (oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft) && fXSAnyAtomicType_isNumeric(oRight))
		return hStaticContext_operators["numeric-integer-divide"].call(oContext, oLeft, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
hMultiplicativeExpr_operators['mod']	= function (oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft) && fXSAnyAtomicType_isNumeric(oRight))
		return hStaticContext_operators["numeric-mod"].call(oContext, oLeft, oRight);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Static members
function fMultiplicativeExpr_parse (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fUnionExpr_parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in hMultiplicativeExpr_operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in hMultiplicativeExpr_operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fUnionExpr_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in multiplicative expression"
//<-Debug
			);
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

// Public members
cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= fFunction_sequence_atomize(this.left.evaluate(oContext), oContext);

	//
	if (!oLeft.length)
		return [];
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
//->Debug
			, "first operand of '" + this.items[0][0] + "'"
//<-Debug
	);

	var vLeft	= oLeft[0];
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSDouble.cast(vLeft);	// cast to xs:double

	for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
		oRight	= fFunction_sequence_atomize(this.items[nIndex][1].evaluate(oContext), oContext);

		if (!oRight.length)
			return [];
		// Assert cardinality
		fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
				, "second operand of '" + this.items[nIndex][0] + "'"
//<-Debug
		);

		vRight	= oRight[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= hMultiplicativeExpr_operators[this.items[nIndex][0]](vLeft, vRight, oContext);
	}
	return [vLeft];
};