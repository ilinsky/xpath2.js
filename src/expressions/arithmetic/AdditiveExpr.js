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

cAdditiveExpr.operators['+']	= function(oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-add"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["add-yearMonthDuration-to-date"](oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["add-dayTimeDuration-to-date"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSDate)
			return cFunctionCall.operators["add-yearMonthDuration-to-date"](oRight, oLeft);
		if (oRight instanceof cXSDateTime)
			return cFunctionCall.operators["add-yearMonthDuration-to-dateTime"](oRight, oLeft);
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["add-yearMonthDurations"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDate)
			return cFunctionCall.operators["add-dayTimeDuration-to-date"](oRight, oLeft);
		if (oRight instanceof cXSTime)
			return cFunctionCall.operators["add-dayTimeDuration-to-time"](oRight, oLeft);
		if (oRight instanceof cXSDateTime)
			return cFunctionCall.operators["add-dayTimeDuration-to-dateTime"](oRight, oLeft);
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["add-dayTimeDurations"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["add-dayTimeDuration-to-time"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["add-yearMonthDuration-to-dateTime"](oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["add-dayTimeDuration-to-dateTime"](oLeft, oRight);
	}
	//
	throw new cXPath2Error("XPTY0004");	// Arithmetic operator is not defined for arguments of types
};
cAdditiveExpr.operators['-']	= function (oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-subtract"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return cFunctionCall.operators["subtract-dates"](oLeft, oRight);
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["subtract-yearMonthDuration-from-date"](oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["subtract-dayTimeDuration-from-date"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return cFunctionCall.operators["subtract-times"](oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["subtract-dayTimeDuration-from-time"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return cFunctionCall.operators["subtract-dateTimes"](oLeft, oRight);
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["subtract-yearMonthDuration-from-dateTime"](oLeft, oRight);
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["subtract-dayTimeDuration-from-dateTime"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["subtract-yearMonthDurations"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["subtract-dayTimeDurations"](oLeft, oRight);
	}
	//
	throw new cXPath2Error("XPTY0004");	// Arithmetic operator is not defined for arguments of types
};

// Static members
cAdditiveExpr.parse	= function (oLexer, oResolver) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cAdditiveExpr.operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cAdditiveExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cMultiplicativeExpr.parse(oLexer, oResolver)))
			throw "AdditiveExpr.parse: right operand missing";
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

// Public members
cAdditiveExpr.prototype.evaluate	= function (oContext) {
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

		vLeft	= cAdditiveExpr.operators[this.items[nIndex][0]](vLeft, vRight);
	}
	return new cXPath2Sequence(vLeft);
};