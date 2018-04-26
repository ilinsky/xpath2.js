/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStaticContext = require('./../../classes/StaticContext');

//
var hStaticContext_operators = cStaticContext.operators;

function cComparisonExpr(oLeft, oRight, sOperator) {
	this.left	= oLeft;
	this.right	= oRight;
	this.operator	= sOperator;
};

cComparisonExpr.prototype.left	= null;
cComparisonExpr.prototype.right	= null;
cComparisonExpr.prototype.operator	= null;

// Public members
cComparisonExpr.prototype.evaluate	= function (oContext) {
	var oResult	= cComparisonExpr.operators[this.operator](this, oContext);
	return oResult == null ? [] : [oResult];
};

// General comparison
function fComparisonExpr_GeneralComp(oExpr, oContext) {
	var oLeft	= fFunction_sequence_atomize(oExpr.left.evaluate(oContext), oContext);
	if (!oLeft.length)
		return new cXSBoolean(false);

	var oRight	= fFunction_sequence_atomize(oExpr.right.evaluate(oContext), oContext);
	if (!oRight.length)
		return new cXSBoolean(false);

	var bResult	= false;
	for (var nLeftIndex = 0, nLeftLength = oLeft.length, bLeft, vLeft; (nLeftIndex < nLeftLength) &&!bResult; nLeftIndex++) {
		for (var nRightIndex = 0, nRightLength = oRight.length, bRight, vRight; (nRightIndex < nRightLength) &&!bResult; nRightIndex++) {

			vLeft	= oLeft[nLeftIndex];
			vRight	= oRight[nRightIndex];

			bLeft	= vLeft instanceof cXSUntypedAtomic;
			bRight	= vRight instanceof cXSUntypedAtomic;

			if (bLeft && bRight) {
				// cast xs:untypedAtomic to xs:string
				vLeft	= cXSString.cast(vLeft);
				vRight	= cXSString.cast(vRight);
			}
			else {
				//
				if (bLeft) {
					// Special: durations
					if (vRight instanceof cXSDayTimeDuration)
						vLeft	= cXSDayTimeDuration.cast(vLeft);
					else
					if (vRight instanceof cXSYearMonthDuration)
						vLeft	= cXSYearMonthDuration.cast(vLeft);
					else
					//
					if (vRight.primitiveKind)
						vLeft	= hStaticContext_dataTypes[vRight.primitiveKind].cast(vLeft);
				}
				else
				if (bRight) {
					// Special: durations
					if (vLeft instanceof cXSDayTimeDuration)
						vRight	= cXSDayTimeDuration.cast(vRight);
					else
					if (vLeft instanceof cXSYearMonthDuration)
						vRight	= cXSYearMonthDuration.cast(vRight);
					else
					//
					if (vLeft.primitiveKind)
						vRight	= hStaticContext_dataTypes[vLeft.primitiveKind].cast(vRight);
				}

				// cast xs:anyURI to xs:string
				if (vLeft instanceof cXSAnyURI)
					vLeft	= cXSString.cast(vLeft);
				if (vRight instanceof cXSAnyURI)
					vRight	= cXSString.cast(vRight);
			}

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
	var oLeft	= fFunction_sequence_atomize(oExpr.left.evaluate(oContext), oContext);
	if (!oLeft.length)
		return null;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
//->Debug
			, "first operand of '" + oExpr.operator + "'"
//<-Debug
	);

	var oRight	= fFunction_sequence_atomize(oExpr.right.evaluate(oContext), oContext);
	if (!oRight.length)
		return null;
	// Assert cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
			, "second operand of '" + oExpr.operator + "'"
//<-Debug
	);

	var vLeft	= oLeft[0],
		vRight	= oRight[0];

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
	var sOperator	= '';

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "numeric-equal";
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			sOperator	= "boolean-equal";
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-equal"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(0));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			sOperator	= "date-equal";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			sOperator	= "time-equal";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			sOperator	= "dateTime-equal";
	}
	else
	if (oLeft instanceof cXSDuration) {
		if (oRight instanceof cXSDuration)
			sOperator	= "duration-equal";
	}
	else
	if (oLeft instanceof cXSGYearMonth) {
		if (oRight instanceof cXSGYearMonth)
			sOperator	= "gYearMonth-equal";
	}
	else
	if (oLeft instanceof cXSGYear) {
		if (oRight instanceof cXSGYear)
			sOperator	= "gYear-equal";
	}
	else
	if (oLeft instanceof cXSGMonthDay) {
		if (oRight instanceof cXSGMonthDay)
			sOperator	= "gMonthDay-equal";
	}
	else
	if (oLeft instanceof cXSGMonth) {
		if (oRight instanceof cXSGMonth)
			sOperator	= "gMonth-equal";
	}
	else
	if (oLeft instanceof cXSGDay) {
		if (oRight instanceof cXSGDay)
			sOperator	= "gDay-equal";
	}
	// skipped: xs:anyURI (covered by xs:string)
	else
	if (oLeft instanceof cXSQName) {
		if (oRight instanceof cXSQName)
			sOperator	= "QName-equal";
	}
	else
	if (oLeft instanceof cXSHexBinary) {
		if (oRight instanceof cXSHexBinary)
			sOperator	= "hexBinary-equal";
	}
	else
	if (oLeft instanceof cXSBase64Binary) {
		if (oRight instanceof cXSBase64Binary)
			sOperator	= "base64Binary-equal";
	}
	else
	if (oLeft instanceof cXSNOTATION) {
		if (oRight instanceof cXSNOTATION)
			sOperator = "NOTATION-equal";
	}

	// Call operator function
	if (sOperator)
		return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

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
	var sOperator	= '';

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "numeric-greater-than";
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			sOperator	= "boolean-greater-than";
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-greater-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(0));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			sOperator	= "date-greater-than";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			sOperator	= "time-greater-than";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			sOperator	= "dateTime-greater-than";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "yearMonthDuration-greater-than";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "dayTimeDuration-greater-than";
	}

	// Call operator function
	if (sOperator)
		return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['lt']	= function(oLeft, oRight, oContext) {
	var sOperator	= '';

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "numeric-less-than";
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			sOperator	= "boolean-less-than";
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-less-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(0));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			sOperator	= "date-less-than";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			sOperator	= "time-less-than";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			sOperator	= "dateTime-less-than";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "yearMonthDuration-less-than";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "dayTimeDuration-less-than";
	}

	// Call operator function
	if (sOperator)
		return hStaticContext_operators[sOperator].call(oContext, oLeft, oRight);

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['ge']	= function(oLeft, oRight, oContext) {
	var sOperator	= '';

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "numeric-less-than";
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			sOperator	= "boolean-less-than";
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-greater-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(-1));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			sOperator	= "date-less-than";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			sOperator	= "time-less-than";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			sOperator	= "dateTime-less-than";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "yearMonthDuration-less-than";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "dayTimeDuration-less-than";
	}

	// Call operator function
	if (sOperator)
		return new cXSBoolean(!hStaticContext_operators[sOperator].call(oContext, oLeft, oRight).valueOf());

	// skipped: xs:anyURI (covered by xs:string)
	throw new cException("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
hComparisonExpr_ValueComp_operators['le']	= function(oLeft, oRight, oContext) {
	var sOperator	= '';

	if (fXSAnyAtomicType_isNumeric(oLeft)) {
		if (fXSAnyAtomicType_isNumeric(oRight))
			sOperator	= "numeric-greater-than";
	}
	else
	if (oLeft instanceof cXSBoolean) {
		if (oRight instanceof cXSBoolean)
			sOperator	= "boolean-greater-than";
	}
	else
	if (oLeft instanceof cXSString) {
		if (oRight instanceof cXSString)
			return hStaticContext_operators["numeric-less-than"].call(oContext, hStaticContext_functions["compare"].call(oContext, oLeft, oRight), new cXSInteger(1));
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			sOperator	= "date-greater-than";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			sOperator	= "time-greater-than";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			sOperator	= "dateTime-greater-than";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "yearMonthDuration-greater-than";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "dayTimeDuration-greater-than";
	}

	// Call operator function
	if (sOperator)
		return new cXSBoolean(!hStaticContext_operators[sOperator].call(oContext, oLeft, oRight).valueOf());

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
	if (!oLeft.length)
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
	if (!oRight.length)
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

	return hComparisonExpr_NodeComp_operators[oExpr.operator](oLeft[0], oRight[0], oContext);
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
cComparisonExpr.operators	= {
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

//
module.exports = cComparisonExpr;
