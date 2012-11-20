/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cComparisonExpr(oLeft, oRight, sOperator) {
	this.left	= oLeft;
	this.right	= oRight;
	this.operator	= sOperator;
};

cComparisonExpr.prototype.left	= null;
cComparisonExpr.prototype.right	= null;
cComparisonExpr.prototype.operator	= null;

// Static members
cComparisonExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cRangeExpr.parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in hComparisonExpr_operators))
		return oExpr;

	// Comparison expression
	var sOperator	= oLexer.peek();
	oLexer.next();
	if (oLexer.eof() ||!(oRight = cRangeExpr.parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in comparison expression"
//<-Debug
		);
	return new cComparisonExpr(oExpr, oRight, sOperator);
};

// Public members
cComparisonExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cSequence,
		oResult	= hComparisonExpr_operators[this.operator](this, oContext);
	if (oResult != null)
		oSequence.add(oResult);
	return oSequence;
};

// General comparison
function fComparisonExpr_GeneralComp(oExpr, oContext) {
	var oLeft	= fSequence_atomize(oExpr.left.evaluate(oContext), oContext);
	if (oLeft.isEmpty())
		return new cXSBoolean(false);

	var oRight	= fSequence_atomize(oExpr.right.evaluate(oContext), oContext);
	if (oRight.isEmpty())
		return new cXSBoolean(false);

	var bResult	= false,
		bLeft,
		bRight,
		vLeft,
		vRight;
	for (var nLeftIndex = 0, nLeftLength = oLeft.items.length; (nLeftIndex < nLeftLength) &&!bResult; nLeftIndex++) {
		for (var nRightIndex = 0, nRightLength = oRight.items.length; (nRightIndex < nRightLength) &&!bResult; nRightIndex++) {

			vLeft	= oLeft.items[nLeftIndex];
			vRight	= oRight.items[nRightIndex];

			bLeft	= vLeft instanceof cXSUntypedAtomic;
			bRight	= vRight instanceof cXSUntypedAtomic;

			if (bLeft && bRight) {
				// cast xs:untypedAtomic to xs:string
				vLeft	= cXSString.cast(vLeft);
				vRight	= cXSString.cast(vRight);
			}
			else
			if (bLeft)
				vLeft	= cXSAnyAtomicType.typeOf(vRight).cast(vLeft);
			else
			if (bRight)
				vRight	= cXSAnyAtomicType.typeOf(vLeft).cast(vRight);

			// cast xs:anyURI to xs:string
			if (vLeft instanceof cXSAnyURI)
				vLeft	= cXSString.cast(vLeft);
			if (vRight instanceof cXSAnyURI)
				vRight	= cXSString.cast(vRight);

			bResult	= hComparisonExpr_ValueComp_operators[hComparisonExpr_GeneralComp_map[oExpr.operator]](vLeft, vRight, oContext).valueOf();
		}
	}
	return new cXSBoolean(bResult);
};

var hComparisonExpr_GeneralComp_map	= {
	'=':	'eq',
	'!=':	'ne',
	'>':	'gt',
	'<':	'lt',
	'>=':	'ge',
	'<=':	'le'
};

// Value comparison
function fComparisonExpr_ValueComp(oExpr, oContext) {
	var oLeft	= fSequence_atomize(oExpr.left.evaluate(oContext), oContext);
	if (oLeft.isEmpty())
		return null;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
//->Debug
			, "first operand of '" + oExpr.operator + "'"
//<-Debug
	);

	var oRight	= fSequence_atomize(oExpr.right.evaluate(oContext), oContext);
	if (oRight.isEmpty())
		return null;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
			, "second operand of '" + oExpr.operator + "'"
//<-Debug
	);

	var vLeft	= oLeft.items[0],
		vRight	= oRight.items[0];

	// cast xs:untypedAtomic to xs:string
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSString.cast(vLeft);
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= cXSString.cast(vRight);

	// cast xs:anyURI to xs:string
	if (vLeft instanceof cXSAnyURI)
		vLeft	= cXSString.cast(vLeft);
	if (vRight instanceof cXSAnyURI)
		vRight	= cXSString.cast(vRight);

	//
	return hComparisonExpr_ValueComp_operators[oExpr.operator](vLeft, vRight, oContext);
};

//
var hComparisonExpr_ValueComp_operators	= {};
hComparisonExpr_ValueComp_operators['eq']	= function(oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			return hStaticContext_operators["boolean-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-equal"].call(oContext, hStaticContext_functions["compare"].call(oContext, new cSequence(oLeft), new cSequence(oRight)), new cXSInteger(0));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return hStaticContext_operators["date-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return hStaticContext_operators["time-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return hStaticContext_operators["dateTime-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDuration) {
		if (oRight instanceof cXSDuration)
			return hStaticContext_operators["duration-equal"].call(oContext, oLeft, oRight);
	}
	// skipped: Gregorian
	// skipped: xs:anyURI (covered by xs:string)
	else
	if (oLeft instanceof cXSQName) {
		if (oRight instanceof cXSQName)
			return hStaticContext_operators["QName-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSHexBinary) {
		if (oRight instanceof cXSHexBinary)
			return hStaticContext_operators["hexBinary-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSBase64Binary) {
		if (oRight instanceof cXSBase64Binary)
			return hStaticContext_operators["base64Binary-equal"].call(oContext, oLeft, oRight);
	}

	// skipped: xs:NOTATION
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['ne']	= function(oLeft, oRight, oContext) {
	return new cXSBoolean(!hComparisonExpr_ValueComp_operators['eq'](oLeft, oRight, oContext).valueOf());
};
hComparisonExpr_ValueComp_operators['gt']	= function(oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			return hStaticContext_operators["boolean-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-greater-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, new cSequence(oLeft), new cSequence(oRight)), new cXSInteger(0));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return hStaticContext_operators["date-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return hStaticContext_operators["time-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return hStaticContext_operators["dateTime-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["yearMonthDuration-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["dayTimeDuration-greater-than"].call(oContext, oLeft, oRight);
	}

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['lt']	= function(oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			return hStaticContext_operators["boolean-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-less-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, new cSequence(oLeft), new cSequence(oRight)), new cXSInteger(0));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return hStaticContext_operators["date-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return hStaticContext_operators["time-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return hStaticContext_operators["dateTime-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return hStaticContext_operators["yearMonthDuration-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return hStaticContext_operators["dayTimeDuration-less-than"].call(oContext, oLeft, oRight);
	}

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['ge']	= function(oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-greater-than"].call(oContext, oLeft, oRight) || hStaticContext_operators["numeric-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			return !hStaticContext_operators["boolean-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-greater-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, new cSequence(oLeft), new cSequence(oRight)), new cXSInteger(-1));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return !hStaticContext_operators["date-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return !hStaticContext_operators["time-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return !hStaticContext_operators["dateTime-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return !hStaticContext_operators["yearMonthDuration-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return !hStaticContext_operators["dayTimeDuration-less-than"].call(oContext, oLeft, oRight);
	}

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['le']	= function(oLeft, oRight, oContext) {
	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			return hStaticContext_operators["numeric-less-than"].call(oContext, oLeft, oRight) || hStaticContext_operators["numeric-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			return !hStaticContext_operators["boolean-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-less-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, new cSequence(oLeft), new cSequence(oRight)), new cXSInteger(1));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return !hStaticContext_operators["date-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return !hStaticContext_operators["time-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return !hStaticContext_operators["dateTime-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return !hStaticContext_operators["yearMonthDuration-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return !hStaticContext_operators["dayTimeDuration-greater-than"].call(oContext, oLeft, oRight);
	}

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};

// Node comparison
function fComparisonExpr_NodeComp(oExpr, oContext) {
	var oLeft	= oExpr.left.evaluate(oContext);
	if (oLeft.isEmpty())
		return null;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
//->Debug
			, "first operand of '" + oExpr.operator + "'"
//<-Debug
	);
	// Assert item type
	fFunctionCall_assertSequenceItemType(oContext, oLeft, cXTNode
//->Debug
			, "first operand of '" + oExpr.operator + "'"
//<-Debug
	);

	var oRight	= oExpr.right.evaluate(oContext);
	if (oRight.isEmpty())
		return null;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
			, "second operand of '" + oExpr.operator + "'"
//<-Debug
	);
	// Assert item type
	fFunctionCall_assertSequenceItemType(oContext, oRight, cXTNode
//->Debug
			, "second operand of '" + oExpr.operator + "'"
//<-Debug
	);

	return hComparisonExpr_NodeComp_operators[oExpr.operator](oLeft.items[0], oRight.items[0], oContext);
};

var hComparisonExpr_NodeComp_operators	= {};
hComparisonExpr_NodeComp_operators['is']	= function(oLeft, oRight, oContext) {
	return hStaticContext_operators["is-same-node"].call(oContext, oLeft, oRight);
};
hComparisonExpr_NodeComp_operators['>>']	= function(oLeft, oRight, oContext) {
	return hStaticContext_operators["node-after"].call(oContext, oLeft, oRight);
};
hComparisonExpr_NodeComp_operators['<<']	= function(oLeft, oRight, oContext) {
	return hStaticContext_operators["node-before"].call(oContext, oLeft, oRight);
};

// Operators
var hComparisonExpr_operators	= {
	// GeneralComp
	'=':	fComparisonExpr_GeneralComp,
	'!=':	fComparisonExpr_GeneralComp,
	'<':	fComparisonExpr_GeneralComp,
	'<=':	fComparisonExpr_GeneralComp,
	'>':	fComparisonExpr_GeneralComp,
	'>=':	fComparisonExpr_GeneralComp,
	// ValueComp
	'eq':	fComparisonExpr_ValueComp,
	'ne':	fComparisonExpr_ValueComp,
	'lt':	fComparisonExpr_ValueComp,
	'le':	fComparisonExpr_ValueComp,
	'gt':	fComparisonExpr_ValueComp,
	'ge':	fComparisonExpr_ValueComp,
	// NodeComp
	'is':	fComparisonExpr_NodeComp,
	'>>':	fComparisonExpr_NodeComp,
	'<<':	fComparisonExpr_NodeComp
};