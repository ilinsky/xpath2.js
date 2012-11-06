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

cMultiplicativeExpr.operators['*']		= function (oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-multiply"](oLeft, oRight);
		if (cRight == cXSYearMonthDuration)
			return cFunctionCall.operators["multiply-yearMonthDuration"](oRight, oLeft);
		if (cRight == cXSDayTimeDuration)
			return cFunctionCall.operators["multiply-dayTimeDuration"](oRight, oLeft);
	}
	else {
		if (cLeft == cXSYearMonthDuration) {
			if (cXSAnyAtomicType.isNumeric(cRight))
				return cFunctionCall.operators["multiply-yearMonthDuration"](oLeft, oRight);
		}
		else
		if (cLeft == cXSDayTimeDuration) {
			if (cXSAnyAtomicType.isNumeric(cRight))
				return cFunctionCall.operators["multiply-dayTimeDuration"](oLeft, oRight);
		}
	}
	//
	throw new cXPath2Error("XPTY0004");	// Arithmetic operator is not defined for arguments of types
};
cMultiplicativeExpr.operators['div']	= function (oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-divide"](oLeft, oRight);
	}
	else
	if (cLeft == cXSYearMonthDuration) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["divide-yearMonthDuration"](oLeft, oRight);
		if (cRight == cXSYearMonthDuration)
			return cFunctionCall.operators["divide-yearMonthDuration-by-yearMonthDuration"](oLeft, oRight);
	}
	else
	if (cLeft == cXSDayTimeDuration) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["divide-dayTimeDuration"](oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return cFunctionCall.operators["divide-dayTimeDuration-by-dayTimeDuration"](oLeft, oRight);
	}
	//
	throw new cXPath2Error("XPTY0004");	// Arithmetic operator is not defined for arguments of types
};
cMultiplicativeExpr.operators['idiv']	= function (oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft) && cXSAnyAtomicType.isNumeric(cRight))
		return cFunctionCall.operators["numeric-integer-divide"](oLeft, oRight);
	//
	throw new cXPath2Error("XPTY0004");	// Arithmetic operator is not defined for arguments of types
};
cMultiplicativeExpr.operators['mod']	= function (oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft) && cXSAnyAtomicType.isNumeric(cRight))
		return cFunctionCall.operators["numeric-mod"](oLeft, oRight);
	//
	throw new cXPath2Error("XPTY0004");	// Arithmetic operator is not defined for arguments of types
};

// Static members
cMultiplicativeExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cUnionExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cMultiplicativeExpr.operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cMultiplicativeExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cUnionExpr.parse(oLexer, oResolver)))
			throw "MultiplicativeExpr.parse: right operand missing";
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

// Public members
cMultiplicativeExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= cXPath2Sequence.atomize(this.left.evaluate(oContext));

	//
	if (oLeft.isEmpty())
		return new cXPath2Sequence;
	if (!oLeft.isSingleton())
		throw new cXPath2Error("XPTY0004");

	var vLeft	= oLeft.items[0];
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSDouble.cast(vLeft);	// cast to xs:double

	for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
		oRight	= cXPath2Sequence.atomize(this.items[nIndex][1].evaluate(oContext));

		if (oRight.isEmpty())
			return new cXPath2Sequence;
		if (!oRight.isSingleton())
			throw new cXPath2Error("XPTY0004");

		vRight	= oRight.items[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= cMultiplicativeExpr.operators[this.items[nIndex][0]](vLeft, vRight);
	}
	return new cXPath2Sequence(vLeft);
};