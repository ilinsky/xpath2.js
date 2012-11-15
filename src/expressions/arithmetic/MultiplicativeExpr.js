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
cMultiplicativeExpr.operators	={};

cMultiplicativeExpr.operators['*']		= function (oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-multiply"].call(oContext, oLeft, oRight);
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["multiply-yearMonthDuration"].call(oContext, oRight, oLeft);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["multiply-dayTimeDuration"].call(oContext, oRight, oLeft);
	}
	else {
		if (cLeft == cXSYearMonthDuration) {
			if (cXSAnyAtomicType.isNumeric(cRight))
				return hXPath2StaticContext_operators["multiply-yearMonthDuration"].call(oContext, oLeft, oRight);
		}
		else
		if (cLeft == cXSDayTimeDuration) {
			if (cXSAnyAtomicType.isNumeric(cRight))
				return hXPath2StaticContext_operators["multiply-dayTimeDuration"].call(oContext, oLeft, oRight);
		}
	}
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cMultiplicativeExpr.operators['div']	= function (oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-divide"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSYearMonthDuration) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["divide-yearMonthDuration"].call(oContext, oLeft, oRight);
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["divide-yearMonthDuration-by-yearMonthDuration"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDayTimeDuration) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["divide-dayTimeDuration"].call(oContext, oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["divide-dayTimeDuration-by-dayTimeDuration"].call(oContext, oLeft, oRight);
	}
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cMultiplicativeExpr.operators['idiv']	= function (oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft) && cXSAnyAtomicType.isNumeric(cRight))
		return hXPath2StaticContext_operators["numeric-integer-divide"].call(oContext, oLeft, oRight);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cMultiplicativeExpr.operators['mod']	= function (oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft) && cXSAnyAtomicType.isNumeric(cRight))
		return hXPath2StaticContext_operators["numeric-mod"].call(oContext, oLeft, oRight);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Static members
cMultiplicativeExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cUnionExpr.parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cMultiplicativeExpr.operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cMultiplicativeExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cUnionExpr.parse(oLexer, oStaticContext)))
			throw "MultiplicativeExpr.parse: right operand missing";
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

// Public members
cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= cXPath2Sequence.atomize(this.left.evaluate(oContext), oContext);

	//
	if (oLeft.isEmpty())
		return new cXPath2Sequence;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
//->Debug
			, "first operand of '" + this.items[0][0] + "'"
//<-Debug
	);

	var vLeft	= oLeft.items[0];
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSDouble.cast(vLeft);	// cast to xs:double

	for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
		oRight	= cXPath2Sequence.atomize(this.items[nIndex][1].evaluate(oContext), oContext);

		if (oRight.isEmpty())
			return new cXPath2Sequence;
		// Assert cardinality
		fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
				, "second operand of '" + this.items[nIndex][0] + "'"
//<-Debug
		);

		vRight	= oRight.items[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= cMultiplicativeExpr.operators[this.items[nIndex][0]](vLeft, vRight, oContext);
	}
	return new cXPath2Sequence(vLeft);
};