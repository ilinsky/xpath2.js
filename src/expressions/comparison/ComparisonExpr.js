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
cComparisonExpr.parse	= function (oLexer, oResolver) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cRangeExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cComparisonExpr.operators))
		return oExpr;

	// Comparison expression
	var sOperator	= oLexer.peek();
	oLexer.next();
	if (oLexer.eof() ||!(oRight = cRangeExpr.parse(oLexer, oResolver)))
		throw "ComparisonExpr.parse: right operand missing";
	return new cComparisonExpr(oExpr, oRight, sOperator);
};

// Public members
cComparisonExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPath2Sequence,
		bResult	= cComparisonExpr.operators[this.operator](this, oContext);
	if (bResult !== null)
		oSequence.add(bResult);
	return oSequence;
};

// General comparison
cComparisonExpr.GeneralComp	= function(oExpr, oContext) {
	var oLeft	= cXPath2Sequence.atomize(oExpr.left.evaluate(oContext));
	if (oLeft.isEmpty())
		return false;

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext));
	if (oRight.isEmpty())
		return false;

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

			if (bLeft || bRight) {
				if (bLeft && bRight) {
					vLeft	= '' + vLeft;
					vRight	= '' + vRight;
				}
				else
				if (bLeft) {
					if (typeof vRight == "number")
						vLeft	=+vLeft;	// cast to xs:double
					else
					if (vRight instanceof cXSDayTimeDuration)
						vLeft	= cXSDayTimeDuration.parse(vLeft);
					else
					if (vRight instanceof cXSYearMonthDuration)
						vLeft	= cXSYearMonthDuration.parse(vLeft);
					else	// TODO: Convert left value to base type of right value
						vLeft	= '' + vLeft;	// cast to xs:string
				}
				else {
					if (typeof vLeft == "number")
						vRight	=+vRight;	// cast to xs:double
					else
					if (vLeft instanceof cXSDayTimeDuration)
						vRight	= cXSDayTimeDuration.parse(vRight);
					else
					if (vLeft instanceof cXSYearMonthDuration)
						vRight	= cXSYearMonthDuration.parse(vRight);
					else	// TODO: Convert right value to base type of left value
						vRight	= '' + vRight;	// cast to xs:string
				}
			}
			bResult	= cComparisonExpr.ValueComp.operators[cComparisonExpr.GeneralComp.map[oExpr.operator]](vLeft, vRight);
		}
	}
	return bResult;
};

cComparisonExpr.GeneralComp.map	= {
	'=':	'eq',
	'!=':	'ne',
	'>':	'gt',
	'<':	'lt',
	'>=':	'ge',
	'<=':	'le'
};

// Value comparison
cComparisonExpr.ValueComp	= function(oExpr, oContext) {
	var oLeft	= cXPath2Sequence.atomize(oExpr.left.evaluate(oContext));
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())		// Must be singleton
		throw new cXPath2Error("XPTY0004");

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext));
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton
		throw new cXPath2Error("XPTY0004");

	var vLeft	= oLeft.items[0],
		vRight	= oRight.items[0];

	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= '' + vLeft;	// cast to xs:string
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= '' + vRight;	// cast to xs:string

	//
	return cComparisonExpr.ValueComp.operators[oExpr.operator](vLeft, vRight);
};

cComparisonExpr.ValueComp.operators	= {};
cComparisonExpr.ValueComp.operators['eq']	= function(oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-equal"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "boolean") {
		if (typeof oRight == "boolean")
			return cFunctionCall.operators["boolean-equal"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "string") {
		if (typeof oRight == "string") {
			return cFunctionCall.operators["numeric-equal"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)).items[0], 0);
		}
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return cFunctionCall.operators["date-equal"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return cFunctionCall.operators["time-equal"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return cFunctionCall.operators["dateTime-equal"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDuration) {
		if (oRight instanceof cXSDuration)
			return cFunctionCall.operators["duration-equal"](oLeft, oRight);
	}
	// skipped: Gregorian
	// skipped: xs:hexBinary
	// skipped: xs:base64Binary
	// skipped: xs:anyURI (covered by xs:string)
	else
	if (oLeft instanceof cXSQName) {
		if (oRight instanceof cXSQName)
			return cFunctionCall.operators["QName-equal"](oLeft, oRight);
	}
	// skipped: xs:NOTATION
	throw new cXPath2Error("XPTY0004");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['ne']	= function(oLeft, oRight) {
	return !cComparisonExpr.ValueComp.operators['eq'](oLeft, oRight);
};
cComparisonExpr.ValueComp.operators['gt']	= function(oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-greater-than"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "boolean") {
		if (typeof oRight == "boolean")
			return cFunctionCall.operators["boolean-greater-than"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "string") {
		if (typeof oRight == "string")
			return cFunctionCall.operators["numeric-greater-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)).items[0], 0);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return cFunctionCall.operators["date-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return cFunctionCall.operators["time-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return cFunctionCall.operators["dateTime-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["yearMonthDuration-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["dayTimeDuration-greater-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['lt']	= function(oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-less-than"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "boolean") {
		if (typeof oRight == "boolean")
			return cFunctionCall.operators["boolean-less-than"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "string") {
		if (typeof oRight == "string")
			return cFunctionCall.operators["numeric-less-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)).items[0], 0);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return cFunctionCall.operators["date-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return cFunctionCall.operators["time-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return cFunctionCall.operators["dateTime-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return cFunctionCall.operators["yearMonthDuration-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return cFunctionCall.operators["dayTimeDuration-less-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['ge']	= function(oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-greater-than"](oLeft, oRight) || cFunctionCall.operators["numeric-equal"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "boolean") {
		if (typeof oRight == "boolean")
			return !cFunctionCall.operators["boolean-less-than"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "string") {
		if (typeof oRight == "string")
			return cFunctionCall.operators["numeric-greater-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)).items[0], -1);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return !cFunctionCall.operators["date-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return !cFunctionCall.operators["time-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return !cFunctionCall.operators["dateTime-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return !cFunctionCall.operators["yearMonthDuration-less-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return !cFunctionCall.operators["dayTimeDuration-less-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['le']	= function(oLeft, oRight) {
	if (typeof oLeft == "number") {
		if (typeof oRight == "number")
			return cFunctionCall.operators["numeric-less-than"](oLeft, oRight) || cFunctionCall.operators["numeric-equal"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "boolean") {
		if (typeof oRight == "boolean")
			return !cFunctionCall.operators["boolean-greater-than"](oLeft, oRight);
	}
	else
	if (typeof oLeft == "string") {
		if (typeof oRight == "string")
			return cFunctionCall.operators["numeric-less-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)).items[0], 1);
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			return !cFunctionCall.operators["date-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			return !cFunctionCall.operators["time-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			return !cFunctionCall.operators["dateTime-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			return !cFunctionCall.operators["yearMonthDuration-greater-than"](oLeft, oRight);
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			return !cFunctionCall.operators["dayTimeDuration-greater-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004");	// Cannot compare {type1} to {type2}
};

// Node comparison
cComparisonExpr.NodeComp	= function(oExpr, oContext) {
	var oLeft	= oExpr.left.evaluate(oContext);
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())		// Must be singleton
		throw new cXPath2Error("XPTY0004");
	if (!cXPath2.DOMAdapter.isNode(oLeft.items[0]))
		throw new cXPath2Error("XPTY0004");

	var oRight	= oExpr.right.evaluate(oContext);
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton
		throw new cXPath2Error("XPTY0004");
	if (!cXPath2.DOMAdapter.isNode(oRight.items[0]))
		throw new cXPath2Error("XPTY0004");

	return cComparisonExpr.NodeComp.operators[oExpr.operator](oLeft.items[0], oRight.items[0]);
};

cComparisonExpr.NodeComp.operators	= {};
cComparisonExpr.NodeComp.operators['is']	= function(oLeft, oRight) {
	return cFunctionCall.operators["is-same-node"](oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['>>']	= function(oLeft, oRight) {
	return cFunctionCall.operators["node-after"](oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['<<']	= function(oLeft, oRight) {
	return cFunctionCall.operators["node-before"](oLeft, oRight);
};

// Operators
cComparisonExpr.operators	= {
	// GeneralComp
	'=':	cComparisonExpr.GeneralComp,
	'!=':	cComparisonExpr.GeneralComp,
	'<':	cComparisonExpr.GeneralComp,
	'<=':	cComparisonExpr.GeneralComp,
	'>':	cComparisonExpr.GeneralComp,
	'>=':	cComparisonExpr.GeneralComp,
	// ValueComp
	'eq':	cComparisonExpr.ValueComp,
	'ne':	cComparisonExpr.ValueComp,
	'lt':	cComparisonExpr.ValueComp,
	'le':	cComparisonExpr.ValueComp,
	'gt':	cComparisonExpr.ValueComp,
	'ge':	cComparisonExpr.ValueComp,
	// NodeComp
	'is':	cComparisonExpr.NodeComp,
	'>>':	cComparisonExpr.NodeComp,
	'<<':	cComparisonExpr.NodeComp
};