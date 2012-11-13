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
cAdditiveExpr.operators	={};

cAdditiveExpr.operators['+']	= function(oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-add"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDate) {
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["add-yearMonthDuration-to-date"].call(oContext, oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["add-dayTimeDuration-to-date"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSYearMonthDuration) {
		if (cRight == cXSDate)
			return hXPath2StaticContext_operators["add-yearMonthDuration-to-date"].call(oContext, oRight, oLeft);
		if (cRight == cXSDateTime)
			return hXPath2StaticContext_operators["add-yearMonthDuration-to-dateTime"].call(oContext, oRight, oLeft);
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["add-yearMonthDurations"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDayTimeDuration) {
		if (cRight == cXSDate)
			return hXPath2StaticContext_operators["add-dayTimeDuration-to-date"].call(oContext, oRight, oLeft);
		if (cRight == cXSTime)
			return hXPath2StaticContext_operators["add-dayTimeDuration-to-time"].call(oContext, oRight, oLeft);
		if (cRight == cXSDateTime)
			return hXPath2StaticContext_operators["add-dayTimeDuration-to-dateTime"].call(oContext, oRight, oLeft);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["add-dayTimeDurations"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSTime) {
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["add-dayTimeDuration-to-time"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDateTime) {
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["add-yearMonthDuration-to-dateTime"].call(oContext, oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["add-dayTimeDuration-to-dateTime"].call(oContext, oLeft, oRight);
	}
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cAdditiveExpr.operators['-']	= function (oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-subtract"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDate) {
		if (cRight == cXSDate)
			return hXPath2StaticContext_operators["subtract-dates"].call(oContext, oLeft, oRight);
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["subtract-yearMonthDuration-from-date"].call(oContext, oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["subtract-dayTimeDuration-from-date"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSTime) {
		if (cRight == cXSTime)
			return hXPath2StaticContext_operators["subtract-times"].call(oContext, oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["subtract-dayTimeDuration-from-time"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDateTime) {
		if (cRight == cXSDateTime)
			return hXPath2StaticContext_operators["subtract-dateTimes"].call(oContext, oLeft, oRight);
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["subtract-yearMonthDuration-from-dateTime"].call(oContext, oLeft, oRight);
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["subtract-dayTimeDuration-from-dateTime"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSYearMonthDuration) {
		if (cRight == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["subtract-yearMonthDurations"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cXSDayTimeDuration) {
		if (cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["subtract-dayTimeDurations"].call(oContext, oLeft, oRight);
	}
	//
	throw new cXPath2Error("XPTY0004"
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
	if (!(oLexer.peek() in cAdditiveExpr.operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cAdditiveExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oStaticContext)))
			throw "AdditiveExpr.parse: right operand missing";
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

// Public members
cAdditiveExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= cXPath2Sequence.atomize(this.left.evaluate(oContext), oContext);

	//
	if (oLeft.isEmpty())
		return new cXPath2Sequence;
	if (!oLeft.isSingleton())
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required cardinality of first operand of '" + this.items[0][0] + "' is zero or one; supplied value has cardinality one or more"
//<-Debug
		);

	var vLeft	= oLeft.items[0];
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSDouble.cast(vLeft);	// cast to xs:double

	for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
		oRight	= cXPath2Sequence.atomize(this.items[nIndex][1].evaluate(oContext), oContext);

		if (oRight.isEmpty())
			return new cXPath2Sequence;
		if (!oRight.isSingleton())
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "Required cardinality of second operand of '" + this.items[nIndex][0] + "' is zero or one; supplied value has cardinality one or more"
//<-Debug
			);

		vRight	= oRight.items[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= cAdditiveExpr.operators[this.items[nIndex][0]](vLeft, vRight, oContext);
	}
	return new cXPath2Sequence(vLeft);
};