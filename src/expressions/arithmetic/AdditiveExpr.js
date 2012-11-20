/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAdditiveExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cAdditiveExpr.prototype.left	= null;
cAdditiveExpr.prototype.items	= null;

//
var hAdditiveExpr_operators	= {};
hAdditiveExpr_operators['+']	= function(oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-add"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["add-yearMonthDuration-to-date"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["add-dayTimeDuration-to-date"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSDate)
			return hStaticContext_operators["add-yearMonthDuration-to-date"].call(oContext, oRight, oLeft);
		if (oRight instanceof cXSDateTime)
			return hStaticContext_operators["add-yearMonthDuration-to-dateTime"].call(oContext, oRight, oLeft);
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["add-yearMonthDurations"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDate)
			return hStaticContext_operators["add-dayTimeDuration-to-date"].call(oContext, oRight, oLeft);
		if (oRight instanceof cXSTime)
			return hStaticContext_operators["add-dayTimeDuration-to-time"].call(oContext, oRight, oLeft);
		if (oRight instanceof cXSDateTime)
			return hStaticContext_operators["add-dayTimeDuration-to-dateTime"].call(oContext, oRight, oLeft);
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["add-dayTimeDurations"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["add-dayTimeDuration-to-time"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["add-yearMonthDuration-to-dateTime"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["add-dayTimeDuration-to-dateTime"].call(oContext, oLeft, oRight);
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
hAdditiveExpr_operators['-']	= function (oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-subtract"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return hStaticContext_operators["subtract-dates"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["subtract-yearMonthDuration-from-date"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["subtract-dayTimeDuration-from-date"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return hStaticContext_operators["subtract-times"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["subtract-dayTimeDuration-from-time"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return hStaticContext_operators["subtract-dateTimes"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["subtract-yearMonthDuration-from-dateTime"].call(oContext, oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["subtract-dayTimeDuration-from-dateTime"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["subtract-yearMonthDurations"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["subtract-dayTimeDurations"].call(oContext, oLeft, oRight);
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Static members
cAdditiveExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in hAdditiveExpr_operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in hAdditiveExpr_operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in additive expression"
//<-Debug
			);
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

// Public members
cAdditiveExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= fSequence_atomize(this.left.evaluate(oContext), oContext);

	if (oLeft.isEmpty())
		return new cSequence;
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
		oRight	= fSequence_atomize(this.items[nIndex][1].evaluate(oContext), oContext);

		if (oRight.isEmpty())
			return new cSequence;
		// Assert cardinality
		fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
				, "first operand of '" + this.items[nIndex][0] + "'"
//<-Debug
		);

		vRight	= oRight.items[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= hAdditiveExpr_operators[this.items[nIndex][0]](vLeft, vRight, oContext);
	}
	return new cSequence(vLeft);
};